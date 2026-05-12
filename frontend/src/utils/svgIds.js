/**
 * Sanitize React useId() (or any string) for use in SVG id / css url(#...).
 * Keeps only ASCII letters, digits, underscore, hyphen.
 */
export function sanitizeSvgIdFragment(value) {
  return String(value).replace(/[^a-zA-Z0-9_-]/g, '')
}
