'use client'

import { Dispatch, SetStateAction, useTransition } from 'react'
import { format } from "date-fns"
import dayjs from 'dayjs'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/shadcn/button"
import { Calendar } from "@/components/ui/shadcn/calendar"
import CategoryChipPicker from "@/components/ui/category-chip-picker"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/shadcn/form"
import { Input } from "@/components/ui/shadcn/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover"
import { editExpense } from "@/lib/actions"
import { cn } from "@/lib/utils"
import { categories } from "@/utils/data"
import { newExpenseSchemaClient } from "@/utils/schemas"
import { Expense } from "@/utils/types"
import '../../../styles/CustomNumberInput.css'

type Props = {
    expense: Expense;
    handleSetOpen: Dispatch<SetStateAction<boolean>>
}

const userTimeZone = dayjs.tz.guess()

function ExpenseEditForm({ expense, handleSetOpen }: Props) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof newExpenseSchemaClient>>({
        resolver: zodResolver(newExpenseSchemaClient),
        defaultValues: {
            description: expense.name,
            amount: expense.amount.toString(),
            date: expense.date,
            category: expense.category
        },
      })

    function onSubmit(data: z.infer<typeof newExpenseSchemaClient>) {
        startTransition(async () => {
            const formattedData = {...data, amount: parseFloat(data.amount)};
            await editExpense(expense.expense_id, formattedData)
            handleSetOpen(false);
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 py-2">
                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem className="flex flex-col gap-1.5">
                        <FormLabel className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Description</FormLabel>

                        <FormControl>
                            <Input placeholder="What was it for?" {...field} className="rounded-full bg-secondary border-border text-foreground focus:!outline-none" />
                        </FormControl>

                        <FormMessage className="text-xs text-destructive" />
                    </FormItem>
                )}/>

                <div className="grid grid-cols-2 gap-3">
                    <FormField control={form.control} name="amount" render={({ field }) => (
                        <FormItem className="flex flex-col gap-1.5">
                            <FormLabel className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Amount</FormLabel>

                            <FormControl>
                                <Input type="number" placeholder="0.00" {...field} className="custom-number-input rounded-full bg-secondary border-border font-mono text-foreground focus:!outline-none" />
                            </FormControl>

                            <FormMessage className="text-xs text-destructive" />
                        </FormItem>
                    )}/>

                    <FormField control={form.control} name="date" render={({ field }) => (
                        <FormItem className="flex flex-col gap-1.5">
                            <FormLabel className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Date</FormLabel>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant="outline" className={cn("w-full rounded-full bg-secondary border-border font-mono font-normal justify-start", !field.value && "text-muted-foreground")}>
                                            {field.value ? (format(field.value, "MMM d, yyyy")) : (<span>Pick a date</span>)}

                                            <CalendarIcon className="ml-auto h-4 w-4" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="w-auto p-0 rounded-lg bg-popover border border-border" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={dayjs.utc(field.value).tz(userTimeZone).toDate()}
                                        onSelect={field.onChange}
                                        disabled={(date) => date > new Date()}
                                        initialFocus
                                        className="rounded-lg bg-popover"
                                    />
                                </PopoverContent>
                            </Popover>

                            <FormMessage className="text-xs text-destructive" />
                        </FormItem>
                    )}/>
                </div>

                <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem className="flex flex-col gap-1.5">
                        <FormLabel className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">Category</FormLabel>

                        <FormControl>
                            <CategoryChipPicker value={field.value} onChange={field.onChange} categories={categories} />
                        </FormControl>

                        <FormMessage className="text-xs text-destructive" />
                    </FormItem>
                )}/>

                <div className="flex justify-end gap-2 mt-1">
                    <Button type="button" variant="outline" onClick={() => handleSetOpen(false)} className="rounded-full font-semibold tracking-wide">
                        Cancel
                    </Button>

                    <Button type="submit" disabled={isPending} className="rounded-full font-semibold tracking-wide bg-primary text-primary-foreground hover:opacity-90 transform active:scale-90 transition-transform">
                        {isPending ? 'Updating...' : 'Save'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default ExpenseEditForm;
