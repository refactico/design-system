// Example context type for components that need access to app-home methods
export interface ExampleContext {
  alertStates?: { [key: string]: boolean };
  openAlert?: (key: string) => void;
  closeAlert?: (key: string) => void;
}

// Export all component examples
export { renderButtonExamples } from './r-button-examples';
export { renderInputExamples } from './r-input-examples';
export { renderTextareaExamples } from './r-textarea-examples';
export { renderRangeExamples } from './r-range-examples';
export { renderFileUploadExamples } from './r-file-upload-examples';
export { renderDropdownExamples } from './r-dropdown-examples';
export { renderDatepickerExamples } from './r-datepicker-examples';
export { renderAlertExamples } from './r-alert-examples';
export { renderHeaderExamples } from './r-header-examples';
export { renderToolbarExamples } from './r-toolbar-examples';
export { renderTitleExamples } from './r-title-examples';
export { renderButtonsExamples } from './r-buttons-examples';
export { renderBadgeExamples } from './r-badge-examples';
export { renderCardExamples } from './r-card-examples';
export { renderCheckboxExamples } from './r-checkbox-examples';
export { renderRadioGroupExamples } from './r-radio-group-examples';
export { renderToggleExamples } from './r-toggle-examples';
export { renderTabsExamples } from './r-tabs-examples';
export { renderTabExamples } from './r-tab-examples';
export { renderTabBarExamples } from './r-tab-bar-examples';
export { renderTabButtonExamples } from './r-tab-button-examples';
export { renderHeadingExamples } from './r-heading-examples';

// Component example mapping
import { renderButtonExamples } from './r-button-examples';
import { renderInputExamples } from './r-input-examples';
import { renderTextareaExamples } from './r-textarea-examples';
import { renderRangeExamples } from './r-range-examples';
import { renderFileUploadExamples } from './r-file-upload-examples';
import { renderDropdownExamples } from './r-dropdown-examples';
import { renderDatepickerExamples } from './r-datepicker-examples';
import { renderAlertExamples } from './r-alert-examples';
import { renderHeaderExamples } from './r-header-examples';
import { renderToolbarExamples } from './r-toolbar-examples';
import { renderTitleExamples } from './r-title-examples';
import { renderButtonsExamples } from './r-buttons-examples';
import { renderBadgeExamples } from './r-badge-examples';
import { renderCardExamples } from './r-card-examples';
import { renderCheckboxExamples } from './r-checkbox-examples';
import { renderRadioGroupExamples } from './r-radio-group-examples';
import { renderToggleExamples } from './r-toggle-examples';
import { renderTabsExamples } from './r-tabs-examples';
import { renderTabExamples } from './r-tab-examples';
import { renderTabBarExamples } from './r-tab-bar-examples';
import { renderTabButtonExamples } from './r-tab-button-examples';
import { renderHeadingExamples } from './r-heading-examples';

export const componentExamples: Record<string, (context?: ExampleContext) => any> = {
  'r-button': renderButtonExamples,
  'r-input': renderInputExamples,
  'r-textarea': renderTextareaExamples,
  'r-range': renderRangeExamples,
  'r-file-upload': renderFileUploadExamples,
  'r-dropdown': renderDropdownExamples,
  'r-datepicker': renderDatepickerExamples,
  'r-alert': renderAlertExamples,
  'r-header': renderHeaderExamples,
  'r-toolbar': renderToolbarExamples,
  'r-title': renderTitleExamples,
  'r-buttons': renderButtonsExamples,
  'r-badge': renderBadgeExamples,
  'r-card': renderCardExamples,
  'r-checkbox': renderCheckboxExamples,
  'r-radio-group': renderRadioGroupExamples,
  'r-toggle': renderToggleExamples,
  'r-tabs': renderTabsExamples,
  'r-tab': renderTabExamples,
  'r-tab-bar': renderTabBarExamples,
  'r-tab-button': renderTabButtonExamples,
  'r-heading': renderHeadingExamples,
};

