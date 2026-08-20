type Props = {
    value: string | number;
    className?: string;
}

/**
 * Renders a formatted number so thousands/decimal separators (`,` and `.`)
 * look right next to monospace digits. Geist Mono is truly fixed-width, so a
 * comma or period gets the exact same cell as a digit — the glyph itself
 * only needs a third of that width, leaving a visibly oversized gap around
 * separators at large sizes. Rendering just those characters in the
 * proportional sans font sizes their box to the glyph instead, with the
 * digits on either side staying tabular for alignment.
 *
 * The comma additionally gets a small manual kern toward the preceding
 * digit: unlike a period's centered dot, a comma's ink sits low/right in
 * its box, so identical geometric spacing still optically reads as more
 * gap before it than after.
 */
function Amount({ value, className }: Props) {
    const chars = String(value).split(/([.,])/)

    return (
        <span className={className}>
            {chars.map((chunk, i) => {
                if (chunk === ',') return <span key={i} className="font-sans -ml-[0.05em]">{chunk}</span>
                if (chunk === '.') return <span key={i} className="font-sans">{chunk}</span>
                return chunk
            })}
        </span>
    )
}

export default Amount
