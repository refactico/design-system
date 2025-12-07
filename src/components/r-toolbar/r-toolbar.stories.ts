import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RToolbar } from './r-toolbar';

const meta: Meta = {
  title: 'Components/r-toolbar',
  component: RToolbar,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The toolbar color (Ionic color)',
    },
    translucent: {
      control: 'boolean',
      description: 'If true, the toolbar is translucent',
    },
    mode: {
      control: 'select',
      options: ['ios', 'md', undefined],
      description: 'The toolbar mode (ios or md)',
    },
    noBorder: {
      control: 'boolean',
      description: 'If true, the toolbar has no border',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Toolbar component that wraps Ionic toolbar. Provides a consistent toolbar structure for applications with support for buttons and content slots.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RToolbar>;

export const Basic: Story = {
  render: (props) => h('r-toolbar', props),
  args: {},
};

export const WithColor: Story = {
  render: (props) => h('r-toolbar', props),
  args: {
    color: 'primary',
  },
};

export const WithButtons: Story = {
  render: (props) => {
    return h('r-toolbar', {
      ...props,
      color: props.color || 'primary',
    }, [
      h('ion-title', null, 'Toolbar Title'),
      h('ion-buttons', { slot: 'start' }, [
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'menu-outline' }),
        ]),
      ]),
      h('ion-buttons', { slot: 'end' }, [
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'search-outline' }),
        ]),
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'more-outline' }),
        ]),
      ]),
    ]);
  },
  args: {
    color: 'primary',
  },
};

export const WithMultipleButtons: Story = {
  render: (props) => {
    return h('r-toolbar', {
      ...props,
      color: props.color || 'primary',
    }, [
      h('ion-title', null, 'Multiple Buttons'),
      h('ion-buttons', { slot: 'start' }, [
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'arrow-back-outline' }),
        ]),
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'menu-outline' }),
        ]),
      ]),
      h('ion-buttons', { slot: 'end' }, [
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'search-outline' }),
        ]),
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'notifications-outline' }),
        ]),
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'settings-outline' }),
        ]),
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'more-outline' }),
        ]),
      ]),
    ]);
  },
  args: {
    color: 'primary',
  },
};

export const Translucent: Story = {
  render: (props) => {
    return h('div', { style: { background: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)', padding: '20px', minHeight: '200px' } }, [
      h('r-toolbar', {
        ...props,
        translucent: props.translucent !== undefined ? props.translucent : true,
        color: props.color || 'primary',
      }, [
        h('ion-title', null, 'Translucent Toolbar'),
      ]),
      h('div', { style: { padding: '20px', color: 'white' } }, 'Content below translucent toolbar'),
    ]);
  },
  args: {
    translucent: true,
    color: 'primary',
  },
};

export const NoBorder: Story = {
  render: (props) => {
    return h('r-toolbar', {
      ...props,
      noBorder: props.noBorder !== undefined ? props.noBorder : true,
      color: props.color || 'primary',
    }, [
      h('ion-title', null, 'Toolbar Without Border'),
    ]);
  },
  args: {
    noBorder: true,
    color: 'primary',
  },
};

export const SecondaryColor: Story = {
  render: (props) => {
    return h('r-toolbar', {
      ...props,
      color: props.color || 'secondary',
    }, [
      h('ion-title', null, 'Secondary Toolbar'),
    ]);
  },
  args: {
    color: 'secondary',
  },
};

export const DangerColor: Story = {
  render: (props) => {
    return h('r-toolbar', {
      ...props,
      color: props.color || 'danger',
    }, [
      h('ion-title', null, 'Danger Toolbar'),
    ]);
  },
  args: {
    color: 'danger',
  },
};

export const SuccessColor: Story = {
  render: (props) => {
    return h('r-toolbar', {
      ...props,
      color: props.color || 'success',
    }, [
      h('ion-title', null, 'Success Toolbar'),
    ]);
  },
  args: {
    color: 'success',
  },
};

