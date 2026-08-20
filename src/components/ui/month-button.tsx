'use client'

import { Dispatch, SetStateAction } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select-2"

type Props = {
    month: string;
    handleSetMonth: Dispatch<SetStateAction<string>>;
    monthsRange: string[];
}

function MonthButton({ month, handleSetMonth, monthsRange }: Props) {

    return (
        <Select value={month} onValueChange={handleSetMonth}>
            <SelectTrigger className="font-semibold tracking-wide border w-[180px] max-[645px]:w-[150px] max-[1620px]:text-sm max-[645px]:text-xs rounded-full bg-primary hover:opacity-90 border-primary text-primary-foreground py-1 px-3 transition-colors ease-in-out duration-200 focus:outline-none focus-visible:outline-ring">
                <SelectValue />
            </SelectTrigger>

            <SelectContent className="rounded-lg bg-popover border border-border max-[1620px]:text-sm" onWheel={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
                <SelectGroup>
                    {monthsRange.map((month) => (
                        <SelectItem value={month} key={month}>{month}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default MonthButton;
