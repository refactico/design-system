/**
 * Utility to get button class names based on variant and block prop
 * @param {'solid'|'outline'} variant
 * @param {boolean} block
 * @returns {string}
 */
export function getButtonClass(variant, block) {
  let cls = '';
  if (variant === 'outline') {
    cls += 'outline ';
  }
  if (block) {
    cls += 'block';
  }
  return cls.trim();
}
