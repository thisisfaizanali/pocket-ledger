import { getCategoryColor } from "@/utils/functions"

type Props = {
    value: string;
    onChange: (category: string) => void;
    categories: readonly string[];
}

function CategoryChipPicker({ value, onChange, categories }: Props) {
    return (
        <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => {
                const selected = value === category
                const color = getCategoryColor(category)

                return (
                    <button
                        key={category}
                        type="button"
                        onClick={() => onChange(category)}
                        aria-pressed={selected}
                        style={selected ? { backgroundColor: color, borderColor: color } : undefined}
                        className={`whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[11.5px] font-medium transition-colors focus:outline-none focus-visible:outline-ring ${
                            selected
                                ? 'text-white'
                                : 'border-border bg-card text-muted-foreground hover:bg-secondary'
                        }`}
                    >
                        {category}
                    </button>
                )
            })}
        </div>
    )
}

export default CategoryChipPicker
