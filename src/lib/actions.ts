'use server'

import { revalidatePath } from 'next/cache'
import { auth } from "@/lib/auth"
import { signOut, signIn } from '@/lib/auth'
import prisma from "../../prisma/client"
import { editProfileSchemaServer, newExpenseSchemaServer, budgetSchemaServer, deleteBudgetSchemaServer } from '@/utils/schemas'
import { EditProfile, UserExpense } from "@/utils/types"

/* Authentication Actions */
export async function signInGoogle() {
    await signIn("google", { redirectTo: "/dashboard" })
}

export async function signInGithub() {
    await signIn("github", { redirectTo: "/dashboard" })
} 

export async function signOutAction() {
    await signOut({ redirectTo: "/" })
}

/* Profile Management */
export async function editProfile({ id, username, currency }: EditProfile) {
    const session = await auth()
    if (!session) throw new Error("You must be logged in")

    // Validate input data
    if (!editProfileSchemaServer.safeParse({ id, username, currency }).success) {
        throw Error('Invalid Data/UserID')
    }

    try {
        await prisma.user.update({
            where: { user_id: id },
            data: { 
                currency,
                name: username 
            }
        })
        revalidatePath('/dashboard', 'layout')
    } catch (error) {
        return Error
    } 
}

/* Expense Management */
export async function newExpense(userId: string, data: UserExpense) {
    const session = await auth()
    if (!session) throw new Error("You must be logged in")

    // Validate expense data
    if (!newExpenseSchemaServer.safeParse({ 
        id: userId,
        description: data.description,
        amount: data.amount,
        date: data.date,
        category: data.category 
    }).success) {
        throw Error('Invalid Data/UserID')
    }

    try {
        await prisma.expense.create({
            data: {
                user_id: userId,
                name: data.description,
                category: data.category,
                date: data.date,
                amount: data.amount 
            },
        })

        revalidatePath('/', 'layout')
    } catch (error) {
        throw error
    }
}

export async function editExpense(expense_id: string, data: UserExpense) {
    const session = await auth()
    if (!session?.user?.email) throw new Error("You must be logged in")

    // Validate expense data
    if (!newExpenseSchemaServer.safeParse({
        id: expense_id,
        description: data.description,
        amount: data.amount,
        date: data.date,
        category: data.category
    }).success) {
        throw Error('Invalid Data/ExpenseID')
    }

    try {
        // Scoping by the session's email prevents editing another user's expense
        const { count } = await prisma.expense.updateMany({
            where: { expense_id, user: { email: session.user.email } },
            data: {
                name: data.description,
                amount: data.amount,
                date: data.date,
                category: data.category
            }
        })
        if (count === 0) throw new Error('Expense not found')

        revalidatePath('/', 'layout')
    } catch (error) {
        throw error
    }
}

export async function deleteExpense(expenseId: string) {
    const session = await auth()
    if (!session?.user?.email) throw new Error("You must be logged in")

    try {
        // Scoping by the session's email prevents deleting another user's expense
        const { count } = await prisma.expense.deleteMany({
            where: { expense_id: expenseId, user: { email: session.user.email } }
        })
        if (count === 0) throw new Error('Expense not found')

        revalidatePath('/', 'layout')
    } catch (error) {
        return error
    }
}

/* Budget Management */
export async function setBudget(userId: string, category: string, monthlyLimit: number) {
    const session = await auth()
    if (!session?.user?.email) throw new Error("You must be logged in")

    if (!budgetSchemaServer.safeParse({ id: userId, category, monthlyLimit }).success) {
        throw Error('Invalid Data/UserID')
    }

    try {
        // Prisma's upsert `where` can only target a unique key (no relational
        // filter like updateMany/deleteMany get), so ownership is verified as
        // a separate lookup before trusting the caller-supplied userId.
        const sessionUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { user_id: true }
        })
        if (sessionUser?.user_id !== userId) throw new Error('Not authorized')

        await prisma.budget.upsert({
            where: { user_id_category: { user_id: userId, category } },
            update: { monthlyLimit },
            create: { user_id: userId, category, monthlyLimit }
        })

        revalidatePath('/dashboard', 'layout')
    } catch (error) {
        throw error
    }
}

export async function deleteBudget(userId: string, category: string) {
    const session = await auth()
    if (!session?.user?.email) throw new Error("You must be logged in")

    if (!deleteBudgetSchemaServer.safeParse({ id: userId, category }).success) {
        throw Error('Invalid Data/UserID')
    }

    try {
        const sessionUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { user_id: true }
        })
        if (sessionUser?.user_id !== userId) throw new Error('Not authorized')

        await prisma.budget.deleteMany({
            where: { user_id: userId, category }
        })

        revalidatePath('/dashboard', 'layout')
    } catch (error) {
        throw error
    }
}

/* Account Management */
export async function deleteAccount(userId: string) {
    const session = await auth()
    if (!session?.user?.email) throw new Error("You must be logged in")

    // Verify the caller-supplied userId actually belongs to the signed-in session
    // before deleting anything, same pattern as setBudget/deleteBudget.
    const sessionUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { user_id: true }
    })
    if (sessionUser?.user_id !== userId) throw new Error('Not authorized')

    await prisma.$transaction([
        prisma.expense.deleteMany({ where: { user_id: userId } }),
        prisma.budget.deleteMany({ where: { user_id: userId } }),
        prisma.user.delete({ where: { user_id: userId } })
    ])

    await signOut({ redirectTo: "/" })
}

/* Pagination Management */
export async function updatePageNumber(userId: string, currentPage: number, updatedPage: number) {
    const session = await auth()
    if (!session) throw new Error("You must be logged in")

    try {
        await prisma.user.updateMany({
            where: { user_id: userId },
            data: { currentPage: updatedPage }
        })
    } catch (error) {
        throw error
    }
}