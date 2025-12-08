import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RTab } from './r-tab';

const meta: Meta = {
  title: 'Components/r-tab',
  component: RTab,
  tags: ['autodocs'],
  argTypes: {
    tab: {
      control: 'text',
      description: 'The tab identifier',
    },
    component: {
      control: 'text',
      description: 'The tab component to render',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The tab color (Ionic color)',
    },
    mode: {
      control: 'select',
      options: ['ios', 'md'],
      description: 'The tab mode (ios or md)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Individual tab component that wraps Ionic tab. Contains the content for a specific tab view. Used inside r-tabs container.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RTab>;

export const Basic: Story = {
  render: (props) => h('r-tabs', { style: { height: '400px', display: 'block' } }, [
    h('r-tab', props, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Tab Content'),
        h('p', null, 'This is the content for this tab.'),
        h('p', { style: { color: '#666', fontSize: '14px', marginTop: '16px' } }, 
          'Note: r-tab must be used inside r-tabs container. This example shows a single tab within a tabs container.'
        ),
      ]),
    ]),
    h('r-tab-bar', { position: 'bottom' }, [
      h('r-tab-button', { tab: props.tab || 'home' }, [
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
        story: 'Basic tab example. Note that r-tab must be used inside r-tabs container.',
      },
    },
  },
};

export const WithRichContent: Story = {
  render: (props) => h('r-tabs', { style: { height: '400px', display: 'block' } }, [
    h('r-tab', props, [
      h('div', { style: { padding: '20px', height: '100%', overflow: 'auto' } }, [
        h('h2', null, 'Rich Content Tab'),
        h('p', null, 'This tab contains rich content including:'),
        h('ul', null, [
          h('li', null, 'Lists'),
          h('li', null, 'Images'),
          h('li', null, 'Forms'),
          h('li', null, 'Any HTML content'),
        ]),
        h('div', { style: { marginTop: '20px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' } }, [
          h('h3', null, 'Example Section'),
          h('p', null, 'You can add any content structure inside a tab.'),
        ]),
      ]),
    ]),
    h('r-tab-bar', { position: 'bottom' }, [
      h('r-tab-button', { tab: props.tab || 'content' }, [
        h('ion-icon', { name: 'document' }),
        h('ion-label', null, 'Content'),
      ]),
    ]),
  ]),
  args: {
    tab: 'content',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab can contain any HTML content. This example shows rich content within a tab.',
      },
    },
  },
};

