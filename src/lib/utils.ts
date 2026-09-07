/** Minimalny helper do łączenia klas — bez dodatkowych zależności. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}
