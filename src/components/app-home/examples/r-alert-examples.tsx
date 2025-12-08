import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderAlertExamples(context?: ExampleContext) {
  const alertStates = context?.alertStates || {};
  const openAlert = context?.openAlert || (() => {});
  const closeAlert = context?.closeAlert || (() => {});

  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic Alert</h3>
        <r-button onClick={() => openAlert('basic')}>Open Basic Alert</r-button>
        <r-alert
          isOpen={alertStates['basic'] || false}
          header="Alert"
          message="This is a basic alert message."
          buttons="OK"
          onRDidDismiss={() => closeAlert('basic')}
        ></r-alert>
      </div>
      <div class="example-group">
        <h3>Alert with SubHeader</h3>
        <r-button onClick={() => openAlert('subheader')}>Open Alert with SubHeader</r-button>
        <r-alert
          isOpen={alertStates['subheader'] || false}
          header="Alert Title"
          subHeader="Subheader"
          message="This alert has a subheader."
          buttons="OK"
          onRDidDismiss={() => closeAlert('subheader')}
        ></r-alert>
      </div>
      <div class="example-group">
        <h3>Alert with Multiple Buttons</h3>
        <r-button onClick={() => openAlert('multiple')}>Open Alert with Multiple Buttons</r-button>
        <r-alert
          isOpen={alertStates['multiple'] || false}
          header="Confirm"
          message="Are you sure you want to proceed?"
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            { text: 'OK', role: 'confirm' }
          ]}
          onRDidDismiss={() => closeAlert('multiple')}
        ></r-alert>
      </div>
      <div class="example-group">
        <h3>Destructive Alert</h3>
        <r-button color="danger" onClick={() => openAlert('destructive')}>Open Destructive Alert</r-button>
        <r-alert
          isOpen={alertStates['destructive'] || false}
          header="Delete Item"
          message="This action cannot be undone."
          color="danger"
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            { text: 'Delete', role: 'destructive' }
          ]}
          onRDidDismiss={() => closeAlert('destructive')}
        ></r-alert>
      </div>
      <div class="example-group">
        <h3>Success Alert</h3>
        <r-button color="success" onClick={() => openAlert('success')}>Open Success Alert</r-button>
        <r-alert
          isOpen={alertStates['success'] || false}
          header="Success!"
          message="Your action was completed successfully."
          color="success"
          buttons="OK"
          onRDidDismiss={() => closeAlert('success')}
        ></r-alert>
      </div>
    </div>
  );
}

