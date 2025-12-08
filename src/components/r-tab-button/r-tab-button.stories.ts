import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RTabButton } from './r-tab-button';

const meta: Meta = {
  title: 'Components/r-tab-button',
  component: RTabButton,
  tags: ['autodocs'],
  argTypes: {
    tab: {
      control: 'text',
      description: 'The tab identifier this button corresponds to',
    },
    selected: {
      control: 'boolean',
      description: 'If true, the tab button is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the tab button is disabled',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The tab button color (Ionic color)',
    },
    mode: {
      control: 'select',
      options: ['ios', 'md'],
      description: 'The tab button mode (ios or md)',
    },
    layout: {
      control: 'select',
      options: ['icon-top', 'icon-start', 'icon-end', 'icon-bottom', 'icon-hide', 'label-hide'],
      description: 'The tab button layout',
    },
    badge: {
      control: 'text',
      description: 'The tab button badge',
    },
    badgeColor: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The tab button badge color',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Tab button component that wraps Ionic tab-button. Used inside r-tab-bar to create clickable tab buttons with icons and labels.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RTabButton>;

export const Basic: Story = {
  render: (props) => h('r-tabs', { style: { height: '400px', display: 'block' } }, [
    h('r-tab', { tab: props.tab || 'home' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Home Tab'),
        h('p', null, 'This is a basic tab button example.'),
      ]),
    ]),
    h('r-tab-bar', { position: 'bottom' }, [
      h('r-tab-button', props, [
        h('ion-icon', { name: 'home' }),
        h('ion-label', null, 'Home'),
      ]),
    ]),
  ]),
  args: {
    tab: 'home',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic tab button. Note that r-tab-button must be used inside r-tab-bar, which is inside r-tabs.',
      },
    },
  },
};

export const Selected: Story = {
  render: (props) => h('r-tabs', { style: { height: '400px', display: 'block' } }, [
    h('r-tab', { tab: props.tab || 'home' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Selected Tab'),
        h('p', null, 'This tab button is in the selected state.'),
      ]),
    ]),
    h('r-tab-bar', { position: 'bottom' }, [
      h('r-tab-button', props, [
        h('ion-icon', { name: 'home' }),
        h('ion-label', null, 'Home'),
      ]),
    ]),
  ]),
  args: {
    tab: 'home',
    selected: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab button in selected state.',
      },
    },
  },
};

export const Disabled: Story = {
  render: (props) => h('r-tabs', { style: { height: '400px', display: 'block' } }, [
    h('r-tab', { tab: 'enabled' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Enabled Tab'),
        h('p', null, 'The disabled tab button cannot be clicked.'),
      ]),
    ]),
    h('r-tab-bar', { position: 'bottom' }, [
      h('r-tab-button', { tab: 'enabled' }, [
        h('ion-icon', { name: 'checkmark' }),
        h('ion-label', null, 'Enabled'),
      ]),
      h('r-tab-button', props, [
        h('ion-icon', { name: 'close' }),
        h('ion-label', null, 'Disabled'),
      ]),
    ]),
  ]),
  args: {
    tab: 'disabled',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled tab button that cannot be clicked.',
      },
    },
  },
};

export const WithBadge: Story = {
  render: (props) => h('r-tabs', { style: { height: '400px', display: 'block' } }, [
    h('r-tab', { tab: props.tab || 'notifications' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Notifications'),
        h('p', null, 'This tab button has a badge showing notification count.'),
      ]),
    ]),
    h('r-tab-bar', { position: 'bottom' }, [
      h('r-tab-button', props, [
        h('ion-icon', { name: 'notifications' }),
        h('ion-label', null, 'Notifications'),
      ]),
    ]),
  ]),
  args: {
    tab: 'notifications',
    badge: '3',
    badgeColor: 'danger',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab button with badge to show notification count or other indicators.',
      },
    },
  },
};

export const LayoutVariants: Story = {
  render: () => h('r-tabs', { style: { height: '500px', display: 'block' } }, [
    h('r-tab', { tab: 'tab1' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Layout Variants'),
        h('p', null, 'Different layout options for tab buttons.'),
      ]),
    ]),
    h('r-tab', { tab: 'tab2' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Layout Variants'),
        h('p', null, 'Different layout options for tab buttons.'),
      ]),
    ]),
    h('r-tab', { tab: 'tab3' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Layout Variants'),
        h('p', null, 'Different layout options for tab buttons.'),
      ]),
    ]),
    h('r-tab-bar', { position: 'bottom' }, [
      h('r-tab-button', { tab: 'tab1', layout: 'icon-top' }, [
        h('ion-icon', { name: 'home' }),
        h('ion-label', null, 'Icon Top'),
      ]),
      h('r-tab-button', { tab: 'tab2', layout: 'icon-start' }, [
        h('ion-icon', { name: 'home' }),
        h('ion-label', null, 'Icon Start'),
      ]),
      h('r-tab-button', { tab: 'tab3', layout: 'icon-end' }, [
        h('ion-icon', { name: 'home' }),
        h('ion-label', null, 'Icon End'),
      ]),
    ]),
  ]),
  parameters: {
    docs: {
      description: {
        story: 'Different layout options for tab buttons.',
      },
    },
  },
};

export const WithColor: Story = {
  render: (props) => h('r-tabs', { style: { height: '400px', display: 'block' } }, [
    h('r-tab', { tab: props.tab || 'colored' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Colored Tab Button'),
        h('p', null, 'This tab button has a primary color applied.'),
      ]),
    ]),
    h('r-tab-bar', { position: 'bottom' }, [
      h('r-tab-button', props, [
        h('ion-icon', { name: 'color-palette' }),
        h('ion-label', null, 'Colored'),
      ]),
    ]),
  ]),
  args: {
    tab: 'colored',
    color: 'primary',
    selected: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab button with color applied.',
      },
    },
  },
};

