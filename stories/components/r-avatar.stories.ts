import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { fn } from 'storybook/test';

const meta: Meta = {
  title: 'Components/Avatar',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'default', 'small'],
      description: 'Avatar size',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Avatar shape',
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for image',
    },
    fit: {
      control: 'select',
      options: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      description: 'How the image fits its container',
    },
    icon: {
      control: 'text',
      description: 'Icon to display',
    },
  },
  args: {
    onError: fn(),
  },
};

export default meta;
type Story = StoryObj;

// Basic avatar with image
export const Default: Story = {
  render: () => html`
    <r-avatar
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      alt="User avatar"
    ></r-avatar>
  `,
};

// Different sizes
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <r-avatar
        size="large"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></r-avatar>
      <r-avatar
        size="default"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></r-avatar>
      <r-avatar
        size="small"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></r-avatar>
    </div>
  `,
};

// Custom numeric size
export const CustomSize: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <r-avatar
        .size=${24}
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></r-avatar>
      <r-avatar
        .size=${48}
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></r-avatar>
      <r-avatar
        .size=${72}
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></r-avatar>
      <r-avatar
        .size=${100}
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></r-avatar>
    </div>
  `,
};

// Different shapes
export const Shapes: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <r-avatar
        shape="circle"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></r-avatar>
      <r-avatar
        shape="square"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></r-avatar>
    </div>
  `,
};

// With initials (text content)
export const WithInitials: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <r-avatar size="large">JD</r-avatar>
      <r-avatar>AB</r-avatar>
      <r-avatar size="small">XY</r-avatar>
    </div>
  `,
};

// With icon
export const WithIcon: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <r-avatar icon="👤" size="large"></r-avatar>
      <r-avatar icon="🧑‍💻"></r-avatar>
      <r-avatar icon="👩‍🎨" size="small"></r-avatar>
    </div>
  `,
};

// Image fit options
export const ImageFit: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="text-align: center;">
        <r-avatar
          .size=${80}
          fit="fill"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ></r-avatar>
        <div style="margin-top: 8px; font-size: 12px;">fill</div>
      </div>
      <div style="text-align: center;">
        <r-avatar
          .size=${80}
          fit="contain"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ></r-avatar>
        <div style="margin-top: 8px; font-size: 12px;">contain</div>
      </div>
      <div style="text-align: center;">
        <r-avatar
          .size=${80}
          fit="cover"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ></r-avatar>
        <div style="margin-top: 8px; font-size: 12px;">cover</div>
      </div>
      <div style="text-align: center;">
        <r-avatar
          .size=${80}
          fit="none"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ></r-avatar>
        <div style="margin-top: 8px; font-size: 12px;">none</div>
      </div>
      <div style="text-align: center;">
        <r-avatar
          .size=${80}
          fit="scale-down"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ></r-avatar>
        <div style="margin-top: 8px; font-size: 12px;">scale-down</div>
      </div>
    </div>
  `,
};

// Error handling - fallback to initials
export const ErrorFallback: Story = {
  render: (args) => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <r-avatar
        src="https://invalid-url.com/broken-image.png"
        @error=${args.onError}
      >FB</r-avatar>
      <span style="color: var(--r-color-text-secondary); font-size: 14px;">
        ← Image failed to load, showing fallback initials
      </span>
    </div>
  `,
};

// All variants combined
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: var(--r-color-text-secondary);">Circle Avatars</h4>
        <div style="display: flex; align-items: center; gap: 16px;">
          <r-avatar size="large" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></r-avatar>
          <r-avatar size="large">JD</r-avatar>
          <r-avatar size="large" icon="👤"></r-avatar>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 12px 0; font-size: 14px; color: var(--r-color-text-secondary);">Square Avatars</h4>
        <div style="display: flex; align-items: center; gap: 16px;">
          <r-avatar size="large" shape="square" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></r-avatar>
          <r-avatar size="large" shape="square">JD</r-avatar>
          <r-avatar size="large" shape="square" icon="👤"></r-avatar>
        </div>
      </div>
    </div>
  `,
};
