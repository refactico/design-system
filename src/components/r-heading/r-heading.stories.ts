import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RHeading } from './r-heading';

const meta: Meta = {
  title: 'Components/r-heading',
  component: RHeading,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The heading text',
    },
    level: {
      control: { type: 'number', min: 1, max: 6, step: 1 },
      description: 'The heading level (1-6)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'warning', 'dark', 'medium', 'light'],
      description: 'The heading color (Ionic color)',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Heading component for displaying headings with different levels and colors.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RHeading>;

export const Basic: Story = {
  render: (props) => h('r-heading', props),
  args: {
    text: 'Heading Text',
    level: 2,
  },
};

export const Level1: Story = {
  render: (props) => h('r-heading', props),
  args: {
    text: 'Heading Level 1',
    level: 1,
  },
};

export const Level2: Story = {
  render: (props) => h('r-heading', props),
  args: {
    text: 'Heading Level 2',
    level: 2,
  },
};

export const Level3: Story = {
  render: (props) => h('r-heading', props),
  args: {
    text: 'Heading Level 3',
    level: 3,
  },
};

export const Level4: Story = {
  render: (props) => h('r-heading', props),
  args: {
    text: 'Heading Level 4',
    level: 4,
  },
};

export const Level5: Story = {
  render: (props) => h('r-heading', props),
  args: {
    text: 'Heading Level 5',
    level: 5,
  },
};

export const Level6: Story = {
  render: (props) => h('r-heading', props),
  args: {
    text: 'Heading Level 6',
    level: 6,
  },
};

export const PrimaryColor: Story = {
  render: (props) => h('r-heading', props),
  args: {
    text: 'Primary Color Heading',
    level: 2,
    color: 'primary',
  },
};

export const DangerColor: Story = {
  render: (props) => h('r-heading', props),
  args: {
    text: 'Danger Color Heading',
    level: 2,
    color: 'danger',
  },
};

export const SuccessColor: Story = {
  render: (props) => h('r-heading', props),
  args: {
    text: 'Success Color Heading',
    level: 2,
    color: 'success',
  },
};

export const AllLevels: Story = {
  render: () => {
    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px' } }, [
      h('r-heading', { text: 'Heading Level 1', level: 1 }),
      h('r-heading', { text: 'Heading Level 2', level: 2 }),
      h('r-heading', { text: 'Heading Level 3', level: 3 }),
      h('r-heading', { text: 'Heading Level 4', level: 4 }),
      h('r-heading', { text: 'Heading Level 5', level: 5 }),
      h('r-heading', { text: 'Heading Level 6', level: 6 }),
    ]);
  },
};

export const AllColors: Story = {
  render: () => {
    const colors = ['primary', 'secondary', 'danger', 'success', 'warning', 'dark', 'medium'];
    return h('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', padding: '20px' } }, [
      ...colors.map((color) => h('r-heading', { text: `${color.charAt(0).toUpperCase() + color.slice(1)} Color`, level: 2, color })),
    ]);
  },
};

export const WithSlot: Story = {
  render: () => {
    return h('r-heading', { level: 2 }, [
      h('span', { style: { color: 'blue' } }, 'Custom '),
      h('strong', null, 'Styled'),
      h('span', null, ' Heading'),
    ]);
  },
};

