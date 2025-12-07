import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RHeader } from './r-header';

const meta: Meta = {
  title: 'Components/r-header',
  component: RHeader,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The header title text',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The header color (Ionic color)',
    },
    translucent: {
      control: 'boolean',
      description: 'If true, the header is translucent',
    },
    collapse: {
      control: 'select',
      options: ['condense', 'fade', undefined],
      description: 'If set, the header collapses on scroll',
    },
    mode: {
      control: 'select',
      options: ['ios', 'md', undefined],
      description: 'The header mode (ios or md)',
    },
    noBorder: {
      control: 'boolean',
      description: 'If true, the header has no border',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Header component that wraps Ionic header with toolbar and title support. Provides a consistent header structure for applications.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RHeader>;

export const Basic: Story = {
  render: (props) => h('r-header', props),
  args: {
    title: 'Header Title',
  },
};

export const WithColor: Story = {
  render: (props) => h('r-header', props),
  args: {
    title: 'Colored Header',
    color: 'primary',
  },
};

export const Translucent: Story = {
  render: (props) => {
    return h('div', { style: { background: 'linear-gradient(to bottom, #4facfe 0%, #00f2fe 100%)', padding: '20px', minHeight: '200px' } }, [
      h('r-header', {
        ...props,
        title: props.title || 'Translucent Header',
        translucent: props.translucent !== undefined ? props.translucent : true,
      }),
      h('div', { style: { padding: '20px', color: 'white' } }, 'Content below translucent header'),
    ]);
  },
  args: {
    title: 'Translucent Header',
    translucent: true,
  },
};

export const NoBorder: Story = {
  render: (props) => h('r-header', props),
  args: {
    title: 'Header Without Border',
    noBorder: true,
  },
};

export const WithButtons: Story = {
  render: (props) => {
    return h('r-header', {
      ...props,
      title: props.title || 'Header with Buttons',
    }, [
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
    title: 'Header with Buttons',
  },
};

export const LongTitle: Story = {
  render: (props) => h('r-header', props),
  args: {
    title: 'This is a Very Long Header Title That Should Wrap or Truncate',
  },
};

export const SecondaryColor: Story = {
  render: (props) => h('r-header', props),
  args: {
    title: 'Secondary Header',
    color: 'secondary',
  },
};

export const DangerColor: Story = {
  render: (props) => h('r-header', props),
  args: {
    title: 'Danger Header',
    color: 'danger',
  },
};

export const SuccessColor: Story = {
  render: (props) => h('r-header', props),
  args: {
    title: 'Success Header',
    color: 'success',
  },
};

