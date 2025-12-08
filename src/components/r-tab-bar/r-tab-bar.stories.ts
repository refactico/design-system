import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RTabBar } from './r-tab-bar';

const meta: Meta = {
  title: 'Components/r-tab-bar',
  component: RTabBar,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'The tab bar position (top or bottom)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The tab bar color (Ionic color)',
    },
    mode: {
      control: 'select',
      options: ['ios', 'md'],
      description: 'The tab bar mode (ios or md)',
    },
    translucent: {
      control: 'boolean',
      description: 'If true, the tab bar is translucent',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Tab bar container component that wraps Ionic tab-bar. Contains r-tab-button components and positions them at the top or bottom of the tabs container.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RTabBar>;

export const BottomPosition: Story = {
  render: (props) => h('r-tabs', { style: { height: '400px', display: 'block' } }, [
    h('r-tab', { tab: 'tab1' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Tab 1 Content'),
        h('p', null, 'This tab bar is positioned at the bottom.'),
      ]),
    ]),
    h('r-tab', { tab: 'tab2' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Tab 2 Content'),
        h('p', null, 'This tab bar is positioned at the bottom.'),
      ]),
    ]),
    h('r-tab-bar', props, [
      h('r-tab-button', { tab: 'tab1' }, [
        h('ion-icon', { name: 'home' }),
        h('ion-label', null, 'Home'),
      ]),
      h('r-tab-button', { tab: 'tab2' }, [
        h('ion-icon', { name: 'settings' }),
        h('ion-label', null, 'Settings'),
      ]),
    ]),
  ]),
  args: {
    position: 'bottom',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab bar positioned at the bottom (default). Note that r-tab-bar must be used inside r-tabs container.',
      },
    },
  },
};

export const TopPosition: Story = {
  render: (props) => h('r-tabs', { style: { height: '400px', display: 'block' } }, [
    h('r-tab-bar', props, [
      h('r-tab-button', { tab: 'tab1' }, [
        h('ion-icon', { name: 'arrow-up' }),
        h('ion-label', null, 'Top'),
      ]),
    ]),
    h('r-tab', { tab: 'tab1' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Top Tab Bar'),
        h('p', null, 'This tab bar is positioned at the top.'),
      ]),
    ]),
  ]),
  args: {
    position: 'top',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab bar positioned at the top. Note that r-tab-bar must be used inside r-tabs container.',
      },
    },
  },
};

export const WithColor: Story = {
  render: (props) => h('r-tabs', { style: { height: '400px', display: 'block' } }, [
    h('r-tab', { tab: 'tab1' }, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Colored Tab Bar'),
        h('p', null, 'This tab bar has a primary color applied.'),
      ]),
    ]),
    h('r-tab-bar', props, [
      h('r-tab-button', { tab: 'tab1', color: 'primary' }, [
        h('ion-icon', { name: 'color-palette' }),
        h('ion-label', null, 'Colored'),
      ]),
    ]),
  ]),
  args: {
    position: 'bottom',
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab bar with color applied. Note that r-tab-bar must be used inside r-tabs container.',
      },
    },
  },
};

