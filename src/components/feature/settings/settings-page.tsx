'use client'

import { useState, useTransition } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/shadcn/alert-dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/shadcn/form"
import { Input } from "@/components/ui/shadcn/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select"
import ThemeToggle from "@/components/ui/theme-toggle"
import { deleteAccount, editProfile, signOutAction } from "@/lib/actions"
import { currencies } from "@/utils/data"
import { editProfileSchemaClient } from "@/utils/schemas"
import { User } from "@/utils/types"

type Props = {
    user: User;
    allExpenses: { name: string; category: string; date: Date; amount: number }[];
}

function escapeCsvField(value: string): string {
    return `"${value.replace(/"/g, '""')}"`
}

function initials(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return '?'
    const first = parts[0][0] ?? ''
    const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
    return (first + last).toUpperCase()
}

function SettingsPage({ user, allExpenses }: Props) {
    const [isPending, startTransition] = useTransition()
    const [isDeleting, startDeleteTransition] = useTransition()
    const [currency, setCurrency] = useState(user.currency)

    const form = useForm<z.infer<typeof editProfileSchemaClient>>({
        resolver: zodResolver(editProfileSchemaClient),
        defaultValues: { username: user.name, currency: user.currency, email: user.email },
    })

    function onSubmit(data: z.infer<typeof editProfileSchemaClient>) {
        startTransition(async () => {
            await editProfile({ id: user.user_id, username: data.username, currency: data.currency })
        })
    }

    function handleCurrencyChange(value: string) {
        setCurrency(value)
        form.setValue('currency', value)
        startTransition(async () => {
            await editProfile({ id: user.user_id, username: form.getValues('username'), currency: value })
        })
    }

    function handleExportCsv() {
        const header = ['Name', 'Category', 'Date', `Amount (${user.currency})`]
        const rows = allExpenses.map(expense => [
            expense.name,
            expense.category,
            new Date(expense.date).toLocaleDateString('en-US'),
            expense.amount.toString()
        ])

        const csv = [header, ...rows].map(row => row.map(escapeCsvField).join(',')).join('\r\n')
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `expenses-${new Date().toISOString().slice(0, 10)}.csv`
        link.click()
        URL.revokeObjectURL(url)
    }

    function handleDeleteAccount() {
        startDeleteTransition(() => {
            deleteAccount(user.user_id)
        })
    }

    return (
        <div className="flex flex-col gap-5 max-w-[640px] px-11 pb-14 pt-6 max-[1400px]:px-8 max-[1160px]:px-6">
            <h1 className="text-[30px] font-bold tracking-tight text-foreground max-[1400px]:text-2xl">Settings</h1>

            <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6">
                <span className="text-sm font-bold text-foreground">Profile</span>

                <div className="flex items-center gap-4">
                    <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-primary text-[17px] font-bold text-primary-foreground">
                        {initials(user.name)}
                    </span>

                    <Form {...form}>
                        <form onBlur={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col gap-2.5">
                            <FormField control={form.control} name="username" render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} placeholder="Name" className="rounded-full bg-secondary border-border text-foreground focus:!outline-none" />
                                    </FormControl>
                                    <FormMessage className="text-xs text-destructive" />
                                </FormItem>
                            )} />

                            <Input value={user.email} disabled className="rounded-full bg-secondary border-border font-mono text-muted-foreground" />
                        </form>
                    </Form>
                </div>

                {isPending && <span className="text-xs text-muted-foreground">Saving…</span>}
            </div>

            <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6">
                <span className="text-sm font-bold text-foreground">Preferences</span>

                <label className="flex flex-col gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Currency</span>

                    <Select value={currency} onValueChange={handleCurrencyChange}>
                        <SelectTrigger className="rounded-full bg-secondary border-border font-mono text-foreground">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            {Object.entries(currencies).map(([code, symbol]) => (
                                <SelectItem key={code} value={code}>{code} — {symbol}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </label>

                <div className="flex items-center justify-between">
                    <span className="text-[13.5px] text-foreground">Appearance</span>
                    <ThemeToggle />
                </div>
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6">
                <span className="text-sm font-bold text-foreground">Data</span>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={handleExportCsv}
                        disabled={allExpenses.length === 0}
                        className="rounded-full border border-border bg-secondary px-5 py-2.5 text-[13px] text-foreground transition-colors hover:bg-secondary/70 disabled:opacity-50"
                    >
                        Export CSV
                    </button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <button className="rounded-full border border-destructive px-5 py-2.5 text-[13px] text-destructive transition-colors hover:bg-destructive/10">
                                Delete account
                            </button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="rounded-3xl border border-border bg-card text-card-foreground shadow-[var(--shadow-card)]">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-foreground">Delete your account?</AlertDialogTitle>

                                <AlertDialogDescription className="text-muted-foreground">
                                    This permanently deletes your account and every expense and budget
                                    record attached to it. This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>

                                <AlertDialogAction
                                    onClick={handleDeleteAccount}
                                    disabled={isDeleting}
                                    className="rounded-full bg-destructive text-destructive-foreground hover:opacity-90"
                                >
                                    {isDeleting ? 'Deleting…' : 'Delete account'}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <form action={signOutAction}>
                <button type="submit" className="self-start p-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground">
                    Sign out
                </button>
            </form>
        </div>
    )
}

export default SettingsPage
