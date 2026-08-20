'use client'

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/shadcn/dialog"
import { Button } from "@/components/ui/shadcn/button"
import { deleteExpense } from "@/lib/actions"

type Props = {
    expense_id: string;
}

function ExpenseDeleteButton({ expense_id }: Props) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    function handleCancelSubmit() {
        startTransition(async () => {
            await deleteExpense(expense_id);
            setOpen(false);
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="rounded text-xs text-muted-foreground transition-colors hover:text-destructive focus:outline-none focus-visible:outline-ring">Delete</button>
            </DialogTrigger>

            <DialogContent className="max-w-[450px] !rounded-3xl border border-border bg-card text-card-foreground shadow-[var(--shadow-card)]">
                <DialogHeader>
                    <DialogTitle className="mb-1 text-foreground">Are you absolutely sure?</DialogTitle>

                    <DialogDescription className="text-muted-foreground">
                        This action cannot be undone. This will permanently delete this
                        expense record from your account.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            disabled={isPending}
                            className="rounded-full border-border bg-transparent font-semibold tracking-wide text-foreground hover:bg-secondary"
                        >
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        onClick={handleCancelSubmit}
                        disabled={isPending}
                        className="rounded-full bg-destructive font-semibold tracking-wide text-destructive-foreground hover:opacity-90"
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ExpenseDeleteButton;
