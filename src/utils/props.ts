/**
 * Utility functions for working with component props
 */

/**
 * Removes undefined properties from an object
 * Useful for cleaning props before passing to Ionic components
 * 
 * @param props - Object with potentially undefined values
 * @returns New object with only defined properties
 * 
 * @example
 * ```typescript
 * const cleaned = removeUndefinedProps({
 *   color: 'primary',
 *   size: undefined,
 *   disabled: false
 * });
 * // Returns: { color: 'primary', disabled: false }
 * ```
 */
export function removeUndefinedProps<T extends Record<string, any>>(props: T): Partial<T> {
  const cleaned: Partial<T> = {};
  Object.keys(props).forEach(key => {
    if (props[key] !== undefined) {
      cleaned[key as keyof T] = props[key];
    }
  });
  return cleaned;
}

