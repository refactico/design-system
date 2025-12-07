import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RBadge } from './r-badge';

const meta: Meta = {
  title: 'Components/r-badge',
  component: RBadge,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The badge color (Ionic color)',
    },
    mode: {
      control: 'select',
      options: ['ios', 'md', undefined],
      description: 'The badge mode (ios or md)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Badge component that wraps Ionic badge. Used to display small pieces of information like notification counts, status indicators, or labels with design system styling.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RBadge>;

export const Basic: Story = {
  render: (props) => h('r-badge', props, '5'),
  args: {},
};

export const WithColor: Story = {
  render: (props) => h('r-badge', props, '12'),
  args: {
    color: 'primary',
  },
};

export const Secondary: Story = {
  render: (props) => h('r-badge', props, '3'),
  args: {
    color: 'secondary',
  },
};

export const Danger: Story = {
  render: (props) => h('r-badge', props, '99+'),
  args: {
    color: 'danger',
  },
};

export const Success: Story = {
  render: (props) => h('r-badge', props, 'New'),
  args: {
    color: 'success',
  },
};

export const Warning: Story = {
  render: (props) => h('r-badge', props, '!'),
  args: {
    color: 'warning',
  },
};

export const OnButton: Story = {
  render: (props) => {
    return h('ion-button', { color: 'primary' }, [
      h('ion-icon', { slot: 'icon-only', name: 'notifications-outline' }),
      h('r-badge', {
        ...props,
        color: props.color || 'danger',
      }, '5'),
    ]);
  },
  args: {
    color: 'danger',
  },
};

export const OnIcon: Story = {
  render: (props) => {
    return h('div', { style: { position: 'relative', display: 'inline-block', padding: '20px' } }, [
      h('ion-icon', { name: 'mail-outline', style: { fontSize: '32px' } }),
      h('r-badge', {
        ...props,
        color: props.color || 'primary',
        style: { position: 'absolute', top: '10px', right: '10px' },
      }, '3'),
    ]);
  },
  args: {
    color: 'primary',
  },
};

export const LargeNumber: Story = {
  render: (props) => h('r-badge', props, '999'),
  args: {
    color: 'primary',
  },
};

export const TextBadge: Story = {
  render: (props) => h('r-badge', props, 'New'),
  args: {
    color: 'success',
  },
};

export const IOSMode: Story = {
  render: (props) => h('r-badge', props, '5'),
  args: {
    color: 'primary',
    mode: 'ios',
  },
};

export const MDMode: Story = {
  render: (props) => h('r-badge', props, '5'),
  args: {
    color: 'primary',
    mode: 'md',
  },
};

