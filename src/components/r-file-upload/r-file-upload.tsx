import { Component, Prop, Event, EventEmitter, State, h, Element } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor } from '../../utils';
import { getLabelPosition, getItemLines } from '../../utils/form-field-props';

@Component({
  tag: 'r-file-upload',
  styleUrl: 'r-file-upload.css',
  shadow: false,
})
export class RFileUpload {
  /**
   * Accepted file types (e.g., ".pdf,.png,.jpg")
   */
  @Prop() accept?: string;

  /**
   * If true, allows multiple file selection
   */
  @Prop() multiple: boolean = false;

  /**
   * Maximum file size in bytes
   */
  @Prop() maxSize?: number;

  /**
   * The file upload label
   */
  @Prop() label?: string;

  /**
   * If true, the file upload is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * If true, the file upload is required
   */
  @Prop() required: boolean = false;

  /**
   * The file upload name (for form submission)
   */
  @Prop() name?: string;

  /**
   * The file upload color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * The fill style
   */
  @Prop() fill?: 'outline' | 'solid';

  /**
   * If true, the file upload has error state
   */
  @Prop() error: boolean = false;

  /**
   * Error message to display
   */
  @Prop() errorText?: string;

  /**
   * Helper text to display
   */
  @Prop() helperText?: string;

  /**
   * If true, shows drag and drop area
   */
  @Prop() dragDrop: boolean = true;

  /**
   * If true, shows file preview
   */
  @Prop() showPreview: boolean = true;

  @Element() el!: HTMLElement;

  @State() selectedFiles: File[] = [];
  @State() isDragging: boolean = false;
  @State() uploadError: string | null = null;

  /**
   * Emitted when files are selected
   */
  @Event() rFileSelected: EventEmitter<CustomEvent<File[]>>;

  /**
   * Emitted when a file is removed
   */
  @Event() rFileRemoved: EventEmitter<CustomEvent<File>>;

  /**
   * Emitted when there's a file error
   */
  @Event() rFileError: EventEmitter<CustomEvent<string>>;

  private fileInputRef?: HTMLInputElement;

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  private validateFile(file: File): string | null {
    // Check file size
    if (this.maxSize && file.size > this.maxSize) {
      return `File "${file.name}" exceeds maximum size of ${this.formatFileSize(this.maxSize)}`;
    }

    // Check file type
    if (this.accept) {
      const acceptedTypes = this.accept.split(',').map(type => type.trim().toLowerCase());
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const fileType = file.type.toLowerCase();

      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type;
        } else if (type.includes('/*')) {
          const baseType = type.split('/')[0];
          return fileType.startsWith(baseType + '/');
        } else {
          return fileType === type;
        }
      });

      if (!isAccepted) {
        return `File "${file.name}" is not an accepted file type. Accepted: ${this.accept}`;
      }
    }

    return null;
  }

  private handleFileSelection = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const errors: string[] = [];
    const validFiles: File[] = [];

    fileArray.forEach(file => {
      const error = this.validateFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      this.uploadError = errors.join('; ');
      this.rFileError.emit(new CustomEvent('rFileError', { detail: errors.join('; ') }));
    } else {
      this.uploadError = null;
    }

    if (this.multiple) {
      this.selectedFiles = [...this.selectedFiles, ...validFiles];
    } else {
      this.selectedFiles = validFiles;
    }

    if (validFiles.length > 0) {
      this.rFileSelected.emit(new CustomEvent('rFileSelected', { detail: validFiles }));
    }
  };

  private handleInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.handleFileSelection(input.files);
    // Reset input value to allow selecting the same file again
    if (input) {
      input.value = '';
    }
  };

  private handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled) {
      this.isDragging = true;
    }
  };

  private handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  };

  private handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (this.disabled) return;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFileSelection(files);
    }
  };

  private handleRemoveFile = (index: number) => {
    const file = this.selectedFiles[index];
    this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);
    this.rFileRemoved.emit(new CustomEvent('rFileRemoved', { detail: file }));
  };

  private handleButtonClick = () => {
    if (!this.disabled && this.fileInputRef) {
      this.fileInputRef.click();
    }
  };

  render() {
    const hasError = this.error || !!this.uploadError;
    const errorMessage = this.errorText || this.uploadError;

    const inputProps = removeUndefinedProps({
      type: 'file',
      accept: this.accept,
      multiple: this.multiple,
      disabled: this.disabled,
      name: this.name,
      style: { display: 'none' },
      onChange: this.handleInputChange,
    });

    return (
      <ion-item class={{ 'item-has-error': hasError }} lines={getItemLines(this.fill)}>
        {this.label && (
          <ion-label position={getLabelPosition(this.fill, 'stacked')}>
            {this.label}
            {this.required && <span style={{ color: 'var(--r-color-danger)' }}> *</span>}
          </ion-label>
        )}
        <div
          class={{
            'file-upload-container': true,
            'drag-over': this.isDragging,
            'disabled': this.disabled,
          }}
          onDragOver={this.dragDrop ? this.handleDragOver : undefined}
          onDragLeave={this.dragDrop ? this.handleDragLeave : undefined}
          onDrop={this.dragDrop ? this.handleDrop : undefined}
        >
          <input
            {...inputProps}
            ref={(el) => (this.fileInputRef = el as HTMLInputElement)}
          />
          {this.dragDrop && (
            <div
              class="drag-drop-area"
              onClick={this.handleButtonClick}
            >
              <ion-icon name="cloud-upload-outline" class="upload-icon"></ion-icon>
              <p class="drag-drop-text">
                {this.isDragging ? 'Drop files here' : 'Drag and drop files here or click to browse'}
              </p>
              {this.accept && (
                <p class="file-types-hint">Accepted: {this.accept}</p>
              )}
              {this.maxSize && (
                <p class="file-size-hint">Max size: {this.formatFileSize(this.maxSize)}</p>
              )}
            </div>
          )}
          {!this.dragDrop && (
            <ion-button
              color={this.color || 'primary'}
              fill={this.fill || 'outline'}
              disabled={this.disabled}
              onClick={this.handleButtonClick}
            >
              <ion-icon name="attach-outline" slot="start"></ion-icon>
              Choose Files
            </ion-button>
          )}
        </div>
        {this.showPreview && this.selectedFiles.length > 0 && (
          <div class="file-preview-list">
            {this.selectedFiles.map((file, index) => (
              <div key={index} class="file-preview-item">
                <ion-icon name="document-outline" class="file-icon"></ion-icon>
                <div class="file-info">
                  <span class="file-name">{file.name}</span>
                  <span class="file-size">{this.formatFileSize(file.size)}</span>
                </div>
                {!this.disabled && (
                  <ion-button
                    fill="clear"
                    size="small"
                    color="danger"
                    onClick={() => this.handleRemoveFile(index)}
                  >
                    <ion-icon name="close-outline" slot="icon-only"></ion-icon>
                  </ion-button>
                )}
              </div>
            ))}
          </div>
        )}
        {hasError && errorMessage && (
          <ion-note slot="error" color="danger">
            {errorMessage}
          </ion-note>
        )}
        {!hasError && this.helperText && (
          <ion-note slot="helper">
            {this.helperText}
          </ion-note>
        )}
      </ion-item>
    );
  }
}

