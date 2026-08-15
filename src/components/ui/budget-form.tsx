"use client"

import { useTransition } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/shadcn/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/shadcn/form"
import { Input } from "@/components/ui/shadcn/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select"
import { setBudget } from "@/lib/actions"
import { budgetSchemaClient } from '@/utils/schemas'
import { categories } from "@/utils/data"

const selectItemClasses = "text-popover-foreground rounded-md hover:bg-accent hover:text-accent-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"

type Props = {
    userId: string;
    onSaved: () => void;
}

function BudgetForm({ userId, onSaved }: Props) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof budgetSchemaClient>>({
        resolver: zodResolver(budgetSchemaClient),
        defaultValues: { category: categories[0] as z.infer<typeof budgetSchemaClient>['category'], monthlyLimit: '' },
    })

    function onSubmit(data: z.infer<typeof budgetSchemaClient>) {
        startTransition(async () => {
            await setBudget(userId, data.category, parseFloat(data.monthlyLimit))
            form.reset()
            onSaved()
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem className="grid gap-1.5">
                        <FormLabel className="font-bold tracking-wide text-foreground">Category</FormLabel>

                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                                <SelectTrigger className="rounded-lg bg-secondary border-border text-foreground py-1 px-3 transition-colors ease-in-out duration-200 flex gap-4 focus:outline-none">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                            </FormControl>

                            <SelectContent className="rounded-lg bg-popover text-popover-foreground border border-border">
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category} className={selectItemClasses}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="monthlyLimit" render={({ field }) => (
                    <FormItem className="grid gap-1.5">
                        <FormLabel className="font-bold tracking-wide text-foreground">Monthly limit</FormLabel>

                        <FormControl>
                            <Input placeholder="0.00" {...field} className="bg-secondary rounded-lg !outline-none" />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                )} />

                <div className="flex justify-end">
                    <Button type="submit" disabled={isPending} className="tracking-wide font-semibold mt-2 transform active:scale-90 transition-transform">
                        {isPending ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default BudgetForm;
