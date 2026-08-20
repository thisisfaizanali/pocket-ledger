'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog"
import ExpenseEditForm from "./expense-edit-form"
import { Expense } from "@/utils/types"

type Props = {
    expense: Expense;
}

function ExpenseEditButton({ expense }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="rounded text-xs text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:outline-ring">Edit</button>
            </DialogTrigger>

            <DialogContent className="max-w-[450px] !rounded-3xl border border-border bg-card text-card-foreground shadow-[var(--shadow-card)]">
                <DialogHeader>
                    <DialogTitle className="max-[400px]:text-center tracking-wide text-foreground">Edit expense</DialogTitle>
                </DialogHeader>

                <ExpenseEditForm
                    expense={expense}
                    handleSetOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}

export default ExpenseEditButton;
