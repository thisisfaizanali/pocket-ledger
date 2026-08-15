import { Dispatch, SetStateAction } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import AnalyticsCardHeader from "./analytics-card-header"
import CategoryIcon from "@/components/ui/category-icon"
import { categories } from "@/utils/data"
import { formatExpenseAmount, getCategoryColor } from "@/utils/functions"

type Props = {
    data: number[];
    handleCard: Dispatch<SetStateAction<number>>;
}

function ExpenseFrequencyPerCategory({ data, handleCard }: Props) {
    return (
        <Card className="bg-transparent border-0 shadow-none">
            <CardHeader className="p-0">
                <CardTitle>
                    <AnalyticsCardHeader
                        title="How Often You Spend"
                        onBack={() => handleCard((card) => card - 1)}
                        onNext={() => handleCard((card) => card + 1)}
                    />
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0 mt-6 max-[1400px]:mt-5 text-foreground font-semibold">
                <div className="grid grid-cols-2 max-[800px]:grid-cols-1 gap-2">
                    {categories.map((category, index) => (
                        <div key={category} className="flex items-center justify-between bg-card border border-border rounded-3xl p-4 max-[800px]:p-3 max-[500px]:p-2 pr-8 max-[800px]:pr-6 max-[500px]:pr-4">
                            <div className="flex items-center gap-3 max-[800px]:gap-2">
                                <div className="h-11 max-[800px]:h-10 max-[500px]:h-9 w-11 max-[800px]:w-10 max-[500px]:w-9 flex justify-center items-center rounded-xl" style={{ backgroundColor: getCategoryColor(category) }}>
                                    <CategoryIcon 
                                        category={category}
                                        classname="text-2xl max-[800px]:text-xl max-[500px]:text-lg" 
                                    />
                                </div>

                                <div className="max-[500px]:text-sm">{category}</div>
                            </div>
                            
                            <div className="max-[500px]:text-sm">
                                {formatExpenseAmount(data[index])}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ExpenseFrequencyPerCategory;