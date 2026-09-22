/**
 * Chip numbers are page order, not content.
 *
 * The same section renders as 03 on the home page and 04 on a service page,
 * so the number cannot live in the JSON next to the label — only the label
 * does. Each page opens a counter and spends one number per numbered
 * section, in render order. Unnumbered strips (TrustedBy) simply never call
 * it, and a section that is conditionally dropped (RelatedWork, when nothing
 * matches) must not call it either, or it would leave a hole in the sequence.
 */
export function sectionNumbering(): () => string {
  let n = 0;
  return () => String(++n).padStart(2, "0");
}
