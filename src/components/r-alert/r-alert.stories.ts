import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RAlert } from './r-alert';

const meta: Meta = {
  title: 'Components/r-alert',
  component: RAlert,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'If true, the alert is open',
    },
    header: {
      control: 'text',
      description: 'The alert header text',
    },
    subHeader: {
      control: 'text',
      description: 'The alert subheader text',
    },
    message: {
      control: 'text',
      description: 'The alert message text',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The alert color (Ionic color)',
    },
    backdropDismiss: {
      control: 'boolean',
      description: 'If true, the alert can be dismissed by clicking the backdrop',
    },
    keyboardClose: {
      control: 'boolean',
      description: 'If true, the alert can be dismissed by pressing the escape key',
    },
    translucent: {
      control: 'boolean',
      description: 'If true, the alert is translucent',
    },
    animated: {
      control: 'boolean',
      description: 'If true, the alert is animated',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Alert component that wraps Ionic alert with inline usage support. Write the component directly in your template and control it with the isOpen prop.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RAlert>;

export const Basic: Story = {
  render: (props) => {
    return h('div', { style: { padding: '20px' } }, [
      h('r-button', {
        onClick: () => {
          const alert = document.querySelector('r-alert') as any;
          if (alert) {
            alert.isOpen = true;
          }
        },
      }, 'Open Alert'),
      h('r-alert', {
        ...props,
        header: props.header || 'Alert',
        message: props.message || 'This is a basic alert message.',
        buttons: props.buttons || 'OK',
      }),
    ]);
  },
  args: {
    isOpen: false,
    header: 'Alert',
    message: 'This is a basic alert message.',
    buttons: 'OK',
  },
};

export const WithSubHeader: Story = {
  render: (props) => {
    return h('div', { style: { padding: '20px' } }, [
      h('r-button', {
        onClick: () => {
          const alert = document.querySelector('r-alert[data-story="subheader"]') as any;
          if (alert) {
            alert.isOpen = true;
          }
        },
      }, 'Open Alert with SubHeader'),
      h('r-alert', {
        ...props,
        'data-story': 'subheader',
        header: props.header || 'Alert Title',
        subHeader: props.subHeader || 'Subheader',
        message: props.message || 'This alert has a subheader.',
        buttons: props.buttons || 'OK',
      }),
    ]);
  },
  args: {
    isOpen: false,
    header: 'Alert Title',
    subHeader: 'Subheader',
    message: 'This alert has a subheader.',
    buttons: 'OK',
  },
};

export const WithMultipleButtons: Story = {
  render: (props) => {
    return h('div', { style: { padding: '20px' } }, [
      h('r-button', {
        onClick: () => {
          const alert = document.querySelector('r-alert[data-story="multiple"]') as any;
          if (alert) {
            alert.isOpen = true;
          }
        },
      }, 'Open Alert with Multiple Buttons'),
      h('r-alert', {
        ...props,
        'data-story': 'multiple',
        header: props.header || 'Confirm',
        message: props.message || 'Are you sure you want to proceed?',
        buttons: props.buttons || [
          { text: 'Cancel', role: 'cancel' },
          { text: 'OK', role: 'confirm' },
        ],
      }),
    ]);
  },
  args: {
    isOpen: false,
    header: 'Confirm',
    message: 'Are you sure you want to proceed?',
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      { text: 'OK', role: 'confirm' },
    ],
  },
};

export const Destructive: Story = {
  render: (props) => {
    return h('div', { style: { padding: '20px' } }, [
      h('r-button', {
        color: 'danger',
        onClick: () => {
          const alert = document.querySelector('r-alert[data-story="destructive"]') as any;
          if (alert) {
            alert.isOpen = true;
          }
        },
      }, 'Open Destructive Alert'),
      h('r-alert', {
        ...props,
        'data-story': 'destructive',
        header: props.header || 'Delete Item',
        message: props.message || 'This action cannot be undone.',
        color: props.color || 'danger',
        buttons: props.buttons || [
          { text: 'Cancel', role: 'cancel' },
          { text: 'Delete', role: 'destructive' },
        ],
      }),
    ]);
  },
  args: {
    isOpen: false,
    header: 'Delete Item',
    message: 'This action cannot be undone.',
    color: 'danger',
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      { text: 'Delete', role: 'destructive' },
    ],
  },
};

export const Success: Story = {
  render: (props) => {
    return h('div', { style: { padding: '20px' } }, [
      h('r-button', {
        color: 'success',
        onClick: () => {
          const alert = document.querySelector('r-alert[data-story="success"]') as any;
          if (alert) {
            alert.isOpen = true;
          }
        },
      }, 'Open Success Alert'),
      h('r-alert', {
        ...props,
        'data-story': 'success',
        header: props.header || 'Success!',
        message: props.message || 'Your action was completed successfully.',
        color: props.color || 'success',
        buttons: props.buttons || 'OK',
      }),
    ]);
  },
  args: {
    isOpen: false,
    header: 'Success!',
    message: 'Your action was completed successfully.',
    color: 'success',
    buttons: 'OK',
  },
};

export const LongMessage: Story = {
  render: (props) => {
    return h('div', { style: { padding: '20px' } }, [
      h('r-button', {
        onClick: () => {
          const alert = document.querySelector('r-alert[data-story="long"]') as any;
          if (alert) {
            alert.isOpen = true;
          }
        },
      }, 'Open Alert with Long Message'),
      h('r-alert', {
        ...props,
        'data-story': 'long',
        header: props.header || 'Important Notice',
        message: props.message || 'This is a longer message that demonstrates how the alert component handles text that spans multiple lines. The alert will automatically adjust its height to accommodate the content.',
        buttons: props.buttons || 'OK',
      }),
    ]);
  },
  args: {
    isOpen: false,
    header: 'Important Notice',
    message: 'This is a longer message that demonstrates how the alert component handles text that spans multiple lines. The alert will automatically adjust its height to accommodate the content.',
    buttons: 'OK',
  },
};

export const Translucent: Story = {
  render: (props) => {
    return h('div', { style: { padding: '20px' } }, [
      h('r-button', {
        onClick: () => {
          const alert = document.querySelector('r-alert[data-story="translucent"]') as any;
          if (alert) {
            alert.isOpen = true;
          }
        },
      }, 'Open Translucent Alert'),
      h('r-alert', {
        ...props,
        'data-story': 'translucent',
        header: props.header || 'Translucent Alert',
        message: props.message || 'This alert has a translucent backdrop.',
        translucent: props.translucent !== undefined ? props.translucent : true,
        buttons: props.buttons || 'OK',
      }),
    ]);
  },
  args: {
    isOpen: false,
    header: 'Translucent Alert',
    message: 'This alert has a translucent backdrop.',
    translucent: true,
    buttons: 'OK',
  },
};

