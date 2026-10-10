const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-06" -> "Jun 2026" */
export function monthYear(value: string): string {
  const [year, month] = value.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/** ("2026-06", "2026-08") -> "Jun to Aug 2026"; ("2026-09", "present") -> "Sep 2026 to now" */
export function dateRange(start: string, end: string | null): string {
  if (!end || end === 'present') return `${monthYear(start)} to now`;
  if (start.slice(0, 4) === end.slice(0, 4)) {
    return `${MONTHS[Number(start.slice(5, 7)) - 1]} to ${monthYear(end)}`;
  }
  return `${monthYear(start)} to ${monthYear(end)}`;
}
