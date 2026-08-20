import { getCategoryColor } from "@/utils/functions";

type Props = {
    category: string;
}

function CategoryLabel({ category }: Props) {
    return (
        <span className="flex items-center gap-2 min-w-0 text-muted-foreground">
            <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: getCategoryColor(category) }}
            />

            <span className="truncate">{category}</span>
        </span>
    )
}

export default CategoryLabel;
