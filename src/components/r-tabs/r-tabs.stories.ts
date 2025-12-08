import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RTabs } from './r-tabs';

const meta: Meta = {
  title: 'Components/r-tabs',
  component: RTabs,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The tabs color (Ionic color)',
    },
    mode: {
      control: 'select',
      options: ['ios', 'md'],
      description: 'The tabs mode (ios or md)',
    },
    translucent: {
      control: 'boolean',
      description: 'If true, the tabs are translucent',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Tabs navigation component that wraps Ionic tabs. Works together with r-tab, r-tab-bar, and r-tab-button to create complete tab-based navigation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RTabs>;

export const Basic: Story = {
  render: (props) => h('r-tabs', { ...props, style: { height: '400px', display: 'block', width: '100%' } }, [
    h('r-tab', { tab: 'home' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' } }, [
        h('h2', null, 'Home Tab'),
        h('p', null, 'This is the home tab content.'),
        h('p', { style: { color: '#666', fontSize: '14px', marginTop: '16px' } }, 
          'Click the Settings tab button to switch tabs. Note: Full tab switching requires routing setup in your application.'
        ),
      ]),
    ]),
    h('r-tab', { tab: 'settings' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' } }, [
        h('h2', null, 'Settings Tab'),
        h('p', null, 'This is the settings tab content.'),
        h('p', { style: { color: '#666', fontSize: '14px', marginTop: '16px' } }, 
          'Click the Home tab button to switch tabs. Note: Full tab switching requires routing setup in your application.'
        ),
      ]),
    ]),
    h('r-tab-bar', { position: 'bottom' }, [
      h('r-tab-button', { tab: 'home' }, [
        h('ion-icon', { name: 'home' }),
        h('ion-label', null, 'Home'),
      ]),
      h('r-tab-button', { tab: 'settings' }, [
        h('ion-icon', { name: 'settings' }),
        h('ion-label', null, 'Settings'),
      ]),
    ]),
  ]),
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Basic tabs example with two tabs. Tabs require routing setup to be fully functional.',
      },
    },
  },
};

export const WithThreeTabs: Story = {
  render: (props) => h('r-tabs', { ...props, style: { height: '400px', display: 'block', width: '100%' } }, [
    h('r-tab', { tab: 'home' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' } }, [
        h('h2', null, 'Home'),
        h('p', null, 'Home tab content'),
      ]),
    ]),
    h('r-tab', { tab: 'search' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' } }, [
        h('h2', null, 'Search'),
        h('p', null, 'Search tab content'),
      ]),
    ]),
    h('r-tab', { tab: 'profile' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' } }, [
        h('h2', null, 'Profile'),
        h('p', null, 'Profile tab content'),
      ]),
    ]),
    h('r-tab-bar', { position: 'bottom' }, [
      h('r-tab-button', { tab: 'home' }, [
        h('ion-icon', { name: 'home' }),
        h('ion-label', null, 'Home'),
      ]),
      h('r-tab-button', { tab: 'search' }, [
        h('ion-icon', { name: 'search' }),
        h('ion-label', null, 'Search'),
      ]),
      h('r-tab-button', { tab: 'profile' }, [
        h('ion-icon', { name: 'person' }),
        h('ion-label', null, 'Profile'),
      ]),
    ]),
  ]),
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Tabs example with three tabs.',
      },
    },
  },
};

export const WithBadge: Story = {
  render: (props) => h('div', { style: { width: '100%', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', background: '#fff' } }, [
    h('r-tabs', { ...props, style: { height: '400px', display: 'block', width: '100%' } }, [
      h('r-tab', { tab: 'notifications' }, [
        h('div', { style: { padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' } }, [
          h('h2', null, 'Notifications'),
          h('p', null, 'You have 3 new notifications'),
          h('p', { style: { color: '#666', fontSize: '14px', marginTop: '16px' } }, 
            'The badge should appear on the tab button below as a red indicator with "3".'
          ),
        ]),
      ]),
      h('r-tab-bar', { position: 'bottom' }, [
        h('r-tab-button', { tab: 'notifications', badge: '3', badgeColor: 'danger' }, [
          h('ion-icon', { name: 'notifications' }),
          h('ion-label', null, 'Notifications'),
        ]),
      ]),
    ]),
  ]),
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Tab button with badge to show notification count. The badge appears as a small red indicator with "3" on the tab button.',
      },
    },
  },
};

export const TopTabBar: Story = {
  render: (props) => h('r-tabs', { ...props, style: { height: '400px', display: 'block', width: '100%', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' } }, [
    h('r-tab-bar', { position: 'top' }, [
      h('r-tab-button', { tab: 'tab1' }, [
        h('ion-icon', { name: 'arrow-up' }),
        h('ion-label', null, 'Top Tab'),
      ]),
    ]),
    h('r-tab', { tab: 'tab1' }, [
      h('div', { style: { padding: '20px', height: 'calc(100% - 56px)', overflow: 'auto', boxSizing: 'border-box', marginTop: '56px' } }, [
        h('h2', null, 'Top Tab Bar'),
        h('p', null, 'Tab bar positioned at the top instead of bottom.'),
        h('p', { style: { color: '#666', fontSize: '14px', marginTop: '16px' } }, 
          'Notice the tab bar is at the top of the container.'
        ),
      ]),
    ]),
  ]),
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Tab bar positioned at the top of the tabs container.',
      },
    },
  },
};

export const WithColor: Story = {
  render: (props) => h('div', { style: { width: '100%', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', background: '#fff' } }, [
    h('r-tabs', { ...props, style: { height: '400px', display: 'block', width: '100%' } }, [
      h('r-tab', { tab: 'colored' }, [
        h('div', { style: { padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' } }, [
          h('h2', null, 'Colored Tabs'),
          h('p', null, 'Tabs with primary color applied.'),
          h('p', { style: { color: '#666', fontSize: '14px', marginTop: '16px' } }, 
            'The tab bar and button have the primary color applied.'
          ),
        ]),
      ]),
      h('r-tab-bar', { position: 'bottom', color: 'primary' }, [
        h('r-tab-button', { tab: 'colored', color: 'primary' }, [
          h('ion-icon', { name: 'color-palette' }),
          h('ion-label', null, 'Colored'),
        ]),
      ]),
    ]),
  ]),
  args: {
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with color applied. Both the tabs container and tab bar use the primary color.',
      },
    },
  },
};

export const DisabledTab: Story = {
  render: (props) => h('r-tabs', { ...props, style: { height: '400px', display: 'block', width: '100%' } }, [
    h('r-tab', { tab: 'enabled' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' } }, [
        h('h2', null, 'Enabled Tab'),
        h('p', null, 'This tab is enabled.'),
      ]),
    ]),
    h('r-tab', { tab: 'disabled' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto', boxSizing: 'border-box' } }, [
        h('h2', null, 'Disabled Tab'),
        h('p', null, 'This tab is disabled.'),
      ]),
    ]),
    h('r-tab-bar', { position: 'bottom' }, [
      h('r-tab-button', { tab: 'enabled' }, [
        h('ion-icon', { name: 'checkmark' }),
        h('ion-label', null, 'Enabled'),
      ]),
      h('r-tab-button', { tab: 'disabled', disabled: true }, [
        h('ion-icon', { name: 'close' }),
        h('ion-label', null, 'Disabled'),
      ]),
    ]),
  ]),
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Example showing a disabled tab button.',
      },
    },
  },
};

