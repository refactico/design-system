import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RCard } from './r-card';

const meta: Meta = {
  title: 'Components/r-card',
  component: RCard,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'],
      description: 'The card color (Ionic color)',
    },
    mode: {
      control: 'select',
      options: ['ios', 'md'],
      description: 'The card mode (ios or md)',
    },
    button: {
      control: 'boolean',
      description: 'If true, the card acts as a button and becomes clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the card is disabled',
    },
    href: {
      control: 'text',
      description: 'The URL to navigate to when the card is clicked',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Card component that wraps Ionic card with design system styling and additional props for interactivity.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RCard>;

export const Basic: Story = {
  render: (props) => h('r-card', props, [
    h('ion-card-header', null, [
      h('ion-card-title', null, 'Card Title'),
      h('ion-card-subtitle', null, 'Card Subtitle'),
    ]),
    h('ion-card-content', null, [
      h('p', null, 'This is the basic card content. You can add any content here.'),
    ]),
  ]),
  args: {},
};

export const WithColor: Story = {
  render: (props) => h('r-card', props, [
    h('ion-card-header', null, [
      h('ion-card-title', null, 'Colored Card'),
    ]),
    h('ion-card-content', null, [
      h('p', null, 'This card has a primary color applied.'),
    ]),
  ]),
  args: {
    color: 'primary',
  },
};

export const ButtonCard: Story = {
  render: (props) => h('r-card', props, [
    h('ion-card-header', null, [
      h('ion-card-title', null, 'Clickable Card'),
    ]),
    h('ion-card-content', null, [
      h('p', null, 'This card acts as a button and is clickable.'),
    ]),
  ]),
  args: {
    button: true,
  },
};

export const CardWithImage: Story = {
  render: (props) => h('r-card', props, [
    h('img', { src: 'https://via.placeholder.com/400x200', alt: 'Placeholder' }),
    h('ion-card-header', null, [
      h('ion-card-title', null, 'Card with Image'),
      h('ion-card-subtitle', null, 'Image Subtitle'),
    ]),
    h('ion-card-content', null, [
      h('p', null, 'This card includes an image at the top.'),
    ]),
  ]),
  args: {},
};

export const CardWithButtons: Story = {
  render: (props) => h('r-card', props, [
    h('ion-card-header', null, [
      h('ion-card-title', null, 'Card with Buttons'),
    ]),
    h('ion-card-content', null, [
      h('p', null, 'This card has action buttons at the bottom.'),
    ]),
    h('ion-card-footer', null, [
      h('ion-button', { fill: 'clear' }, 'Action 1'),
      h('ion-button', { fill: 'clear' }, 'Action 2'),
    ]),
  ]),
  args: {},
};

export const DisabledCard: Story = {
  render: (props) => h('r-card', props, [
    h('ion-card-header', null, [
      h('ion-card-title', null, 'Disabled Card'),
    ]),
    h('ion-card-content', null, [
      h('p', null, 'This card is disabled and cannot be interacted with.'),
    ]),
  ]),
  args: {
    disabled: true,
    button: true,
  },
};

