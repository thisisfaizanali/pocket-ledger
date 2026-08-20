'use client'

import { useState } from "react"
import { useMediaQuery } from '@react-hook/media-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/shadcn/dialog"
import ExpenseForm from "@/components/ui/expense-form"
import { FiPlus } from "react-icons/fi";

type Props = {
    userId: string;
}

function AddExpenseButton({ userId }: Props) {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 630px)')
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="">
                <button className="rounded-full text-sm font-semibold tracking-wide ml-2 bg-primary text-primary-foreground py-2 px-4 max-[630px]:p-2 hover:opacity-90 transition-all ease-in-out duration-200 focus:outline-none focus-visible:!outline-ring transform active:scale-90">
                    {isMobile ? <FiPlus className="text-lg" /> : '+ Add expense'}
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-[450px] !rounded-3xl border border-border bg-card text-card-foreground shadow-[var(--shadow-card)]">
                <DialogHeader>
                    <DialogTitle className="max-[400px]:text-center tracking-wide text-foreground">Add New Expense</DialogTitle>
                </DialogHeader>
                
                <ExpenseForm 
                    userId={userId} 
                    handleSetOpen={setOpen}
                />
            </DialogContent>
        </Dialog>
    )
}

export default AddExpenseButton