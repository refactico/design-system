import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { RFileUpload } from './r-file-upload';

const meta: Meta = {
  title: 'Components/r-file-upload',
  component: RFileUpload,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The file upload label',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types (e.g., ".pdf,.png")',
    },
    multiple: {
      control: 'boolean',
      description: 'If true, allows multiple file selection',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the file upload is disabled',
    },
    required: {
      control: 'boolean',
      description: 'If true, the file upload is required',
    },
    dragDrop: {
      control: 'boolean',
      description: 'If true, shows drag and drop area',
    },
    showPreview: {
      control: 'boolean',
      description: 'If true, shows file preview',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'warning', 'dark', 'medium', 'light'],
      description: 'The file upload color (Ionic color)',
    },
    error: {
      control: 'boolean',
      description: 'If true, the file upload has error state',
    },
    errorText: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'File upload component with drag and drop support, file preview, validation, and error handling.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<RFileUpload>;

export const Basic: Story = {
  render: (props) => h('r-file-upload', props),
  args: {
    label: 'Upload File',
  },
};

export const WithLabel: Story = {
  render: (props) => h('r-file-upload', props),
  args: {
    label: 'Upload Document',
    helperText: 'Select a file to upload',
  },
};

export const SingleFile: Story = {
  render: (props) => h('r-file-upload', props),
  args: {
    label: 'Upload Single File',
    accept: '.pdf',
    maxSize: 5242880, // 5MB
    helperText: 'PDF files only, max 5MB',
  },
};

export const MultipleFiles: Story = {
  render: (props) => h('r-file-upload', props),
  args: {
    label: 'Upload Multiple Files',
    multiple: true,
    accept: '.pdf,.png,.jpg',
    maxSize: 10485760, // 10MB
    helperText: 'You can upload multiple files',
  },
};

export const ImageOnly: Story = {
  render: (props) => h('r-file-upload', props),
  args: {
    label: 'Upload Image',
    accept: 'image/*',
    maxSize: 5242880, // 5MB
    helperText: 'Images only, max 5MB',
  },
};

export const WithMaxSize: Story = {
  render: (props) => h('r-file-upload', props),
  args: {
    label: 'Upload File',
    maxSize: 1048576, // 1MB
    helperText: 'Maximum file size: 1MB',
  },
};

export const Required: Story = {
  render: (props) => h('r-file-upload', props),
  args: {
    label: 'Required File',
    required: true,
    helperText: 'This field is required',
  },
};

export const WithError: Story = {
  render: (props) => h('r-file-upload', props),
  args: {
    label: 'Upload File',
    error: true,
    errorText: 'Please select a file',
  },
};

export const Disabled: Story = {
  render: (props) => h('r-file-upload', props),
  args: {
    label: 'Upload File',
    disabled: true,
    helperText: 'File upload is disabled',
  },
};

export const WithoutDragDrop: Story = {
  render: (props) => h('r-file-upload', props),
  args: {
    label: 'Upload File',
    dragDrop: false,
    helperText: 'Click button to select file',
  },
};

export const WithoutPreview: Story = {
  render: (props) => h('r-file-upload', props),
  args: {
    label: 'Upload File',
    showPreview: false,
    helperText: 'File preview is disabled',
  },
};

export const DocumentUpload: Story = {
  render: (props) => h('r-file-upload', props),
  args: {
    label: 'Upload Document',
    accept: '.pdf,.doc,.docx',
    maxSize: 10485760, // 10MB
    helperText: 'PDF, Word documents only, max 10MB',
  },
};

