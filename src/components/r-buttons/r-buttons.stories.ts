import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RButtons } from './r-buttons';

const meta: Meta = {
  title: 'Components/r-buttons',
  component: RButtons,
  tags: ['autodocs'],
  argTypes: {
    slot: {
      control: 'select',
      options: ['start', 'end', 'primary', undefined],
      description: 'The slot where the buttons should be placed',
    },
    collapse: {
      control: 'boolean',
      description: 'If true, the buttons will collapse when the content scrolls',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Buttons container component that wraps Ionic buttons. Groups multiple buttons together, typically used in toolbars and headers with design system spacing.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RButtons>;

export const Basic: Story = {
  render: (props) => {
    return h('r-toolbar', { color: 'primary' }, [
      h('r-title', { text: 'R-Buttons Example' }),
      h('r-buttons', {
        ...props,
        slot: props.slot || 'end',
      }, [
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
    slot: 'end',
  },
};

export const WithMultipleButtons: Story = {
  render: (props) => {
    return h('r-toolbar', { color: 'primary' }, [
      h('r-buttons', {
        ...props,
        slot: 'start',
      }, [
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'arrow-back-outline' }),
        ]),
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'menu-outline' }),
        ]),
      ]),
      h('r-title', { text: 'Multiple R-Buttons' }),
      h('r-buttons', {
        slot: 'end',
      }, [
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'search-outline' }),
        ]),
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'notifications-outline' }),
        ]),
        h('ion-button', null, [
          h('ion-icon', { slot: 'icon-only', name: 'settings-outline' }),
        ]),
      ]),
    ]);
  },
  args: {},
};

export const WithTextButtons: Story = {
  render: (props) => {
    return h('r-toolbar', { color: 'primary' }, [
      h('r-title', { text: 'Text Buttons' }),
      h('r-buttons', {
        ...props,
        slot: props.slot || 'end',
      }, [
        h('ion-button', { fill: 'clear' }, 'Save'),
        h('ion-button', { fill: 'clear' }, 'Cancel'),
      ]),
    ]);
  },
  args: {
    slot: 'end',
  },
};

export const Collapsible: Story = {
  render: (props) => {
    return h('r-toolbar', { color: 'primary' }, [
      h('r-title', { text: 'Collapsible Buttons' }),
      h('r-buttons', {
        ...props,
        slot: props.slot || 'end',
        collapse: props.collapse !== undefined ? props.collapse : true,
      }, [
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
    slot: 'end',
    collapse: true,
  },
};

export const InHeader: Story = {
  render: (props) => {
    return h('r-header', { color: 'primary' }, [
      h('r-toolbar', { color: 'primary' }, [
        h('r-buttons', {
          slot: 'start',
        }, [
          h('ion-button', null, [
            h('ion-icon', { slot: 'icon-only', name: 'menu-outline' }),
          ]),
        ]),
        h('r-title', { text: 'Header with Buttons' }),
        h('r-buttons', {
          ...props,
          slot: props.slot || 'end',
        }, [
          h('ion-button', null, [
            h('ion-icon', { slot: 'icon-only', name: 'search-outline' }),
          ]),
          h('ion-button', null, [
            h('ion-icon', { slot: 'icon-only', name: 'more-outline' }),
          ]),
        ]),
      ]),
    ]);
  },
  args: {
    slot: 'end',
  },
};

