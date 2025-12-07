import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';
// Auto-initialize Ionic (lazy loads components on demand)
import '../../utils/ionic-init';
import { removeUndefinedProps, IonicColor } from '../../utils';

@Component({
  tag: 'r-alert',
  styleUrl: 'r-alert.css',
  shadow: false, // No shadow DOM to allow Ionic styles to work
})
export class RAlert {
  /**
   * If true, the alert is open
   */
  @Prop({ mutable: true }) isOpen: boolean = false;

  /**
   * The alert header text
   */
  @Prop() header?: string;

  /**
   * The alert subheader text
   */
  @Prop() subHeader?: string;

  /**
   * The alert message text
   */
  @Prop() message?: string;

  /**
   * The alert color (Ionic color)
   */
  @Prop() color?: IonicColor;

  /**
   * If true, the alert can be dismissed by clicking the backdrop
   */
  @Prop() backdropDismiss: boolean = true;

  /**
   * If true, the alert can be dismissed by pressing the escape key
   */
  @Prop() keyboardClose: boolean = true;

  /**
   * If true, the alert is translucent
   */
  @Prop() translucent: boolean = false;

  /**
   * If true, the alert is animated
   */
  @Prop() animated: boolean = true;

  /**
   * Alert buttons configuration
   * Can be a string (single button text) or an array of button objects
   * Example: "OK" or [{ text: "Cancel", role: "cancel" }, { text: "OK", role: "confirm" }]
   */
  @Prop() buttons?: string | Array<{ text: string; role?: string; handler?: () => void }>;

  /**
   * Emitted when the alert is dismissed
   */
  @Event() rDidDismiss: EventEmitter<CustomEvent>;

  /**
   * Emitted when the alert is presented
   */
  @Event() rDidPresent: EventEmitter<CustomEvent>;

  /**
   * Emitted when the alert will dismiss
   */
  @Event() rWillDismiss: EventEmitter<CustomEvent>;

  /**
   * Emitted when the alert will present
   */
  @Event() rWillPresent: EventEmitter<CustomEvent>;

  // For inline alerts, ion-alert handles isOpen prop automatically
  // No need to manually call present() or dismiss()

  private handleDidDismiss = (event: CustomEvent) => {
    this.isOpen = false;
    this.rDidDismiss.emit(event);
  };

  private handleDidPresent = (event: CustomEvent) => {
    this.rDidPresent.emit(event);
  };

  private handleWillDismiss = (event: CustomEvent) => {
    this.rWillDismiss.emit(event);
  };

  private handleWillPresent = (event: CustomEvent) => {
    this.rWillPresent.emit(event);
  };

  private normalizeButtons(): any[] {
    if (!this.buttons) {
      return [{ text: 'OK', role: 'confirm' }];
    }

    if (typeof this.buttons === 'string') {
      return [{ text: this.buttons, role: 'confirm' }];
    }

    return this.buttons.map(btn => {
      if (typeof btn === 'string') {
        return { text: btn, role: 'confirm' };
      }
      return btn;
    });
  }

  render() {
    const alertProps = removeUndefinedProps({
      isOpen: this.isOpen,
      header: this.header,
      subHeader: this.subHeader,
      message: this.message,
      color: this.color,
      backdropDismiss: this.backdropDismiss,
      keyboardClose: this.keyboardClose,
      translucent: this.translucent,
      animated: this.animated,
      buttons: this.normalizeButtons(),
      onIonAlertDidDismiss: this.handleDidDismiss,
      onIonAlertDidPresent: this.handleDidPresent,
      onIonAlertWillDismiss: this.handleWillDismiss,
      onIonAlertWillPresent: this.handleWillPresent,
    });

    return <ion-alert {...alertProps}></ion-alert>;
  }
}

