/**
 * Utilities for form field components (input, dropdown, datepicker)
 */

import { removeUndefinedProps } from './props';
import { IonicColor, FillStyle } from './types';

/**
 * Common props shared by form field components
 */
export interface BaseFormFieldProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  color?: IonicColor;
  fill?: FillStyle;
  shape?: 'round';
  error?: boolean;
  errorText?: string;
  helperText?: string;
}

/**
 * Helper to build form field props object for Ionic components
 * Removes undefined values and returns clean props
 */
export function buildFormFieldProps(props: Partial<BaseFormFieldProps>): any {
  return removeUndefinedProps({
    placeholder: props.placeholder,
    disabled: props.disabled,
    required: props.required,
    name: props.name,
    color: props.color,
    fill: props.fill,
    shape: props.shape,
  });
}

/**
 * Helper to determine label position based on fill style
 */
export function getLabelPosition(fill?: FillStyle, defaultPosition: 'stacked' | 'floating' = 'stacked'): 'stacked' | 'floating' {
  return fill === 'outline' ? 'stacked' : defaultPosition;
}

/**
 * Helper to determine item lines based on fill style
 */
export function getItemLines(fill?: FillStyle): 'none' | 'full' {
  return fill === 'outline' ? 'none' : 'full';
}

