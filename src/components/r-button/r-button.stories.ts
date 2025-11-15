import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Design System/r-button',
  component: 'r-button',
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
type Story = StoryObj;

const createButton = (args: any) => {
  const button = document.createElement('r-button');
  if (args.color) button.setAttribute('color', args.color);
  if (args.size) button.setAttribute('size', args.size);
  if (args.fill) button.setAttribute('fill', args.fill);
  if (args.expand) button.setAttribute('expand', args.expand);
  if (args.icon) button.setAttribute('icon', args.icon);
  if (args.iconPosition) button.setAttribute('icon-position', args.iconPosition);
  if (args.shape) button.setAttribute('shape', args.shape);
  if (args.type) button.setAttribute('type', args.type);
  if (args.disabled) button.setAttribute('disabled', '');
  if (args.iconOnly) button.setAttribute('icon-only', '');
  button.textContent = args.children || 'Button';
  return button;
};

export const Primary: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.appendChild(createButton({ ...args, color: 'primary' }));
    return container;
  },
  args: {
    children: 'Primary Button',
    color: 'primary',
    size: 'default',
    disabled: false,
  },
};

export const Secondary: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.appendChild(createButton({ ...args, color: 'secondary' }));
    return container;
  },
  args: {
    children: 'Secondary Button',
    size: 'default',
  },
};

export const Danger: Story = {
  render: (args) => {
    const container = document.createElement('div');
    container.appendChild(createButton({ ...args, color: 'danger' }));
    return container;
  },
  args: {
    children: 'Danger Button',
    size: 'default',
  },
};

export const FillStyles: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';
    
    const solid = createButton({ fill: 'solid', color: 'primary', children: 'Solid' });
    const outline = createButton({ fill: 'outline', color: 'primary', children: 'Outline' });
    const clear = createButton({ fill: 'clear', color: 'primary', children: 'Clear' });
    
    container.appendChild(solid);
    container.appendChild(outline);
    container.appendChild(clear);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Different fill styles: solid, outline, and clear.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';
    
    const small = createButton({ size: 'small', color: 'primary', children: 'Small' });
    const defaultSize = createButton({ size: 'default', color: 'primary', children: 'Default' });
    const large = createButton({ size: 'large', color: 'primary', children: 'Large' });
    
    container.appendChild(small);
    container.appendChild(defaultSize);
    container.appendChild(large);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Button component supports three sizes: small, default, and large.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';
    
    const home = createButton({ icon: 'home', color: 'primary', children: 'Home' });
    const heart = createButton({ icon: 'heart', iconPosition: 'end', color: 'danger', children: 'Like' });
    const star = createButton({ icon: 'star', color: 'warning', children: 'Favorite' });
    const iconOnly = createButton({ icon: 'add-circle', iconOnly: true, color: 'primary', children: '' });
    
    container.appendChild(home);
    container.appendChild(heart);
    container.appendChild(star);
    container.appendChild(iconOnly);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons at start, end, or icon-only buttons.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';
    
    const disabled = createButton({ disabled: true, color: 'primary', children: 'Disabled' });
    const disabledOutline = createButton({ disabled: true, fill: 'outline', color: 'primary', children: 'Disabled Outline' });
    
    container.appendChild(disabled);
    container.appendChild(disabledOutline);
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons are non-interactive.',
      },
    },
  },
};

export const FullWidth: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'max-width: 400px; box-sizing: border-box; padding: 16px 0;';
    
    // First button - Full Width (primary/blue) - truly full width
    const full = createButton({ expand: 'full', color: 'primary', children: 'Full Width' });
    full.style.cssText = 'display: block; width: 100%; margin-bottom: 16px;';
    
    // Second button - Block (secondary/purple) - also full width
    const block = createButton({ expand: 'block', color: 'secondary', children: 'Block' });
    block.style.cssText = 'display: block; width: 100%;';
    
    container.appendChild(full);
    container.appendChild(block);
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'Full width buttons using expand="full" or expand="block".',
      },
    },
  },
};

export const AllColors: Story = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 16px; max-width: 300px;';
    
    const colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'];
    colors.forEach(color => {
      const button = createButton({ color, children: color.charAt(0).toUpperCase() + color.slice(1) });
      container.appendChild(button);
    });
    
    return container;
  },
  parameters: {
    docs: {
      description: {
        story: 'All available button colors.',
      },
    },
  },
};

