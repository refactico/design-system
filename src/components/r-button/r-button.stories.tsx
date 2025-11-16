import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RButton } from './r-button';

const meta: Meta = {
  title: 'Components/r-button',
  component: RButton,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'],
      description: 'The button color (Ionic color)',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'The button size',
    },
    fill: {
      control: 'select',
      options: ['solid', 'outline', 'clear', 'default'],
      description: 'Button fill style',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the button is disabled',
    },
    expand: {
      control: 'select',
      options: ['full', 'block'],
      description: 'If set, the button takes full width',
    },
    icon: {
      control: 'text',
      description: 'Icon name (Ionic icon name)',
    },
    iconPosition: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Icon position',
    },
    iconOnly: {
      control: 'boolean',
      description: 'If true, shows only the icon',
    },
    shape: {
      control: 'select',
      options: ['round'],
      description: 'Button shape',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The button type',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Button component that wraps Ionic\'s button component. Perfect for mobile and web applications with native device features.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RButton>;

export const Primary: Story = {
  render: (props) => {
    const { children, ...rest } = props as any;
    return h('r-button', rest, 'Primary Button');
  },
  args: {
    color: 'primary',
    size: 'default',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary Button',
      },
    },
  },
};

export const Secondary: Story = {
  render: (props) => {
    const { children, ...rest } = props as any;
    return h('r-button', rest, 'Secondary Button');
  },
  args: {
    color: 'secondary',
    size: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary Button',
      },
    },
  },
};

export const Danger: Story = {
  render: (props) => {
    const { children, ...rest } = props as any;
    return h('r-button', rest, 'Danger Button');
  },
  args: {
    color: 'danger',
    size: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Danger Button',
      },
    },
  },
};

export const FillStyles: Story = {
  render: () => h('div', { style: { display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' } }, [
    h('r-button', { fill: 'solid', color: 'primary' }, 'Solid'),
    h('r-button', { fill: 'outline', color: 'primary' }, 'Outline'),
    h('r-button', { fill: 'clear', color: 'primary' }, 'Clear')
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Different fill styles: solid, outline, and clear.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => h('div', { style: { display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' } }, [
    h('r-button', { size: 'small', color: 'primary' }, 'Small'),
    h('r-button', { size: 'default', color: 'primary' }, 'Default'),
    h('r-button', { size: 'large', color: 'primary' }, 'Large')
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Button component supports three sizes: small, default, and large.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => h('div', { style: { display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' } }, [
    h('r-button', { icon: 'home', color: 'primary' }, 'Home'),
    h('r-button', { icon: 'heart', iconPosition: 'end', color: 'danger' }, 'Like'),
    h('r-button', { icon: 'star', color: 'warning' }, 'Favorite'),
    h('r-button', { icon: 'add-circle', iconOnly: true, color: 'primary' })
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons at start, end, or icon-only buttons.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => h('div', { style: { display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' } }, [
    h('r-button', { disabled: true, color: 'primary' }, 'Disabled'),
    h('r-button', { disabled: true, fill: 'outline', color: 'primary' }, 'Disabled Outline')
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons are non-interactive.',
      },
    },
  },
};

export const FullWidth: Story = {
  render: () => h('div', { style: { maxWidth: '400px' } }, [
    h('r-button', { expand: 'full', color: 'primary' }, 'Full Width'),
    h('r-button', { expand: 'block', color: 'secondary' }, 'Block')
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Full width buttons using expand="full" or expand="block".',
      },
    },
  },
};

export const AllColors: Story = {
  render: () => h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' } }, [
    h('r-button', { color: 'primary' }, 'Primary'),
    h('r-button', { color: 'secondary' }, 'Secondary'),
    h('r-button', { color: 'tertiary' }, 'Tertiary'),
    h('r-button', { color: 'success' }, 'Success'),
    h('r-button', { color: 'warning' }, 'Warning'),
    h('r-button', { color: 'danger' }, 'Danger')
  ]),
  parameters: {
    docs: {
      description: {
        story: 'All available button colors.',
      },
    },
  },
};

