export const BadMath = {
    round: (num: number, precision: number) => Math.round(num * 10 * precision) / (10 * precision)
}