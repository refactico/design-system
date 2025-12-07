import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RTitle } from './r-title';

const meta: Meta = {
  title: 'Components/r-title',
  component: RTitle,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The title text',
    },
    size: {
      control: 'select',
      options: ['large', 'small', undefined],
      description: 'The title size',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Title component that wraps Ionic title. Provides a consistent title structure for toolbars and headers.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RTitle>;

export const Basic: Story = {
  render: (props) => h('r-title', props),
  args: {
    text: 'Page Title',
  },
};

export const WithTextProp: Story = {
  render: (props) => h('r-title', props),
  args: {
    text: 'My Application Title',
  },
};

export const WithSlot: Story = {
  render: (props) => {
    return h('r-title', props, 'Title from Slot');
  },
  args: {},
};

export const Large: Story = {
  render: (props) => h('r-title', props),
  args: {
    text: 'Large Title',
    size: 'large',
  },
};

export const Small: Story = {
  render: (props) => h('r-title', props),
  args: {
    text: 'Small Title',
    size: 'small',
  },
};

export const InToolbar: Story = {
  render: (props) => {
    return h('r-toolbar', { color: 'primary' }, [
      h('r-title', {
        ...props,
        text: props.text || 'Toolbar Title',
      }),
      h('ion-buttons', { slot: 'start' }, [
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'menu-outline' }),
        ]),
      ]),
      h('ion-buttons', { slot: 'end' }, [
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'search-outline' }),
        ]),
      ]),
    ]);
  },
  args: {
    text: 'Toolbar Title',
  },
};

export const InHeader: Story = {
  render: (props) => {
    return h('r-header', { color: 'primary' }, [
      h('r-toolbar', { color: 'primary' }, [
        h('r-title', {
          ...props,
          text: props.text || 'Header Title',
        }),
        h('ion-buttons', { slot: 'end' }, [
          h('ion-button', null, [
            h('ion-icon', { slot: 'icon-only', name: 'more-outline' }),
          ]),
        ]),
      ]),
    ]);
  },
  args: {
    text: 'Header Title',
  },
};

export const LongTitle: Story = {
  render: (props) => h('r-title', props),
  args: {
    text: 'This is a Very Long Title That Should Wrap or Truncate Properly',
  },
};

export const WithSpecialCharacters: Story = {
  render: (props) => h('r-title', props),
  args: {
    text: 'Title with Special Chars: @#$%^&*()',
  },
};

