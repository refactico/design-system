import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Dialog',
  tags: ['autodocs'],
  argTypes: {
    visible: { control: 'boolean' },
    dialogTitle: { control: 'text' },
    width: { control: 'text' },
    fullscreen: { control: 'boolean' },
    showClose: { control: 'boolean' },
    center: { control: 'boolean' },
    alignCenter: { control: 'boolean' },
  },
  args: { onDialogOpen: fn(), onClose: fn() },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div>
      <r-button type="primary" onclick="document.querySelector('#dialog1').visible = true">
        Open Dialog
      </r-button>
      <r-dialog id="dialog1" dialog-title="Dialog Title">
        <p>This is the dialog content. You can put any content here.</p>
        <div slot="footer">
          <r-button onclick="document.querySelector('#dialog1').visible = false">Cancel</r-button>
          <r-button type="primary" onclick="document.querySelector('#dialog1').visible = false">Confirm</r-button>
        </div>
      </r-dialog>
    </div>
  `,
};

export const CustomWidth: Story = {
  render: () => html`
    <div>
      <r-button type="primary" onclick="document.querySelector('#dialog2').visible = true">
        Wide Dialog (800px)
      </r-button>
      <r-dialog id="dialog2" dialog-title="Wide Dialog" width="800px">
        <p>This dialog has a custom width of 800px.</p>
        <div slot="footer">
          <r-button onclick="document.querySelector('#dialog2').visible = false">Close</r-button>
        </div>
      </r-dialog>
    </div>
  `,
};

export const Centered: Story = {
  render: () => html`
    <div>
      <r-button type="primary" onclick="document.querySelector('#dialog3').visible = true">
        Centered Dialog
      </r-button>
      <r-dialog id="dialog3" dialog-title="Centered" center align-center>
        <p>This dialog is centered both vertically and horizontally.</p>
        <p>The content is also center-aligned.</p>
        <div slot="footer">
          <r-button onclick="document.querySelector('#dialog3').visible = false">Cancel</r-button>
          <r-button type="primary" onclick="document.querySelector('#dialog3').visible = false">OK</r-button>
        </div>
      </r-dialog>
    </div>
  `,
};

export const NoCloseButton: Story = {
  render: () => html`
    <div>
      <r-button type="primary" onclick="document.querySelector('#dialog4').visible = true">
        No Close Button
      </r-button>
      <r-dialog id="dialog4" dialog-title="Important" .showClose=${false} .closeOnClickOverlay=${false}>
        <p>This dialog can only be closed by clicking the button below.</p>
        <div slot="footer">
          <r-button type="primary" onclick="document.querySelector('#dialog4').visible = false">
            I understand
          </r-button>
        </div>
      </r-dialog>
    </div>
  `,
};

export const WithForm: Story = {
  render: () => html`
    <div>
      <r-button type="primary" onclick="document.querySelector('#dialog5').visible = true">
        Open Form Dialog
      </r-button>
      <r-dialog id="dialog5" dialog-title="Create User" width="500px">
        <r-form label-position="top">
          <r-form-item label="Username" required>
            <r-input placeholder="Enter username"></r-input>
          </r-form-item>
          <r-form-item label="Email" required>
            <r-input type="email" placeholder="Enter email"></r-input>
          </r-form-item>
          <r-form-item label="Role">
            <r-select placeholder="Select role">
              <r-option value="admin" label="Admin"></r-option>
              <r-option value="user" label="User"></r-option>
              <r-option value="guest" label="Guest"></r-option>
            </r-select>
          </r-form-item>
        </r-form>
        <div slot="footer">
          <r-button onclick="document.querySelector('#dialog5').visible = false">Cancel</r-button>
          <r-button type="primary" onclick="document.querySelector('#dialog5').visible = false">Create</r-button>
        </div>
      </r-dialog>
    </div>
  `,
};

export const ConfirmDialog: Story = {
  render: () => html`
    <div>
      <r-button type="danger" onclick="document.querySelector('#dialog6').visible = true">
        Delete Item
      </r-button>
      <r-dialog id="dialog6" dialog-title="Confirm Delete" width="400px" align-center>
        <div style="text-align: center;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--r-color-danger)" stroke-width="2" style="margin-bottom: 16px;">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          <p style="margin: 0; color: var(--r-color-text-regular);">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
        </div>
        <div slot="footer">
          <r-button onclick="document.querySelector('#dialog6').visible = false">Cancel</r-button>
          <r-button type="danger" onclick="document.querySelector('#dialog6').visible = false">Delete</r-button>
        </div>
      </r-dialog>
    </div>
  `,
};

export const Fullscreen: Story = {
  render: () => html`
    <div>
      <r-button type="primary" onclick="document.querySelector('#dialog7').visible = true">
        Fullscreen Dialog
      </r-button>
      <r-dialog id="dialog7" dialog-title="Fullscreen Dialog" fullscreen>
        <p>This dialog takes up the entire screen.</p>
        <p>Useful for complex forms or content that needs more space.</p>
        <div slot="footer">
          <r-button onclick="document.querySelector('#dialog7').visible = false">Close</r-button>
        </div>
      </r-dialog>
    </div>
  `,
};
