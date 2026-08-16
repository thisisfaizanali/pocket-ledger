'use client'

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaMoneyBillTransfer } from "react-icons/fa6"
import { FiPlus } from "react-icons/fi"
import { MdAnalytics } from "react-icons/md"
import { TbLayoutDashboardFilled, TbMoon, TbSun } from "react-icons/tb"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/shadcn/command"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog"
import ExpenseForm from "@/components/ui/expense-form"
import { applyTheme } from "@/components/ui/theme-toggle"

type Props = {
    userId: string;
}

function CommandPalette({ userId }: Props) {
    const [open, setOpen] = useState(false)
    const [addExpenseOpen, setAddExpenseOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen(o => !o)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    const runCommand = useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    return (
        <>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />

                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Navigate">
                        <CommandItem onSelect={() => runCommand(() => router.push('/dashboard'))}>
                            <TbLayoutDashboardFilled className="mr-2" />
                            Overview
                        </CommandItem>

                        <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/expenses'))}>
                            <FaMoneyBillTransfer className="mr-2" />
                            Expenses
                        </CommandItem>

                        <CommandItem onSelect={() => runCommand(() => router.push('/dashboard/analytics'))}>
                            <MdAnalytics className="mr-2" />
                            Analytics
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Actions">
                        <CommandItem onSelect={() => runCommand(() => setAddExpenseOpen(true))}>
                            <FiPlus className="mr-2" />
                            Add new expense
                        </CommandItem>

                        <CommandItem onSelect={() => runCommand(() => {
                            const isDark = document.documentElement.classList.contains('dark')
                            applyTheme(!isDark)
                        })}>
                            <TbMoon className="mr-2 dark:hidden" />
                            <TbSun className="mr-2 hidden dark:block" />
                            Toggle theme
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>

            <Dialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen}>
                <DialogContent className="max-w-[450px] !rounded-3xl bg-[#CDD5E0] border-0">
                    <DialogHeader>
                        <DialogTitle className="max-[400px]:text-center tracking-wide">Add New Expense</DialogTitle>
                    </DialogHeader>

                    <ExpenseForm
                        userId={userId}
                        handleSetOpen={setAddExpenseOpen}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CommandPalette
