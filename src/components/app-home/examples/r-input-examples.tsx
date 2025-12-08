import { h } from '@stencil/core';
import { ExampleContext } from './index';

export function renderInputExamples(context?: ExampleContext) {
  return (
    <div class="preview-examples">
      <h2>Examples</h2>
      <div class="example-group">
        <h3>Basic Input</h3>
        <r-input label="Name" placeholder="Enter your name"></r-input>
      </div>
      <div class="example-group">
        <h3>Email Input</h3>
        <r-input type="email" label="Email" placeholder="Enter your email"></r-input>
      </div>
      <div class="example-group">
        <h3>Password Input with Toggle</h3>
        <r-input type="password" label="Password" placeholder="Enter your password" show-password-toggle></r-input>
      </div>
      <div class="example-group">
        <h3>Input with Error</h3>
        <r-input type="email" label="Email" value="invalid-email" error error-text="Please enter a valid email address"></r-input>
      </div>
      <div class="example-group">
        <h3>Input with Helper Text</h3>
        <r-input label="Username" placeholder="Enter username" helper-text="Username must be at least 3 characters"></r-input>
      </div>
      <div class="example-group">
        <h3>Outline Style</h3>
        <r-input label="Outline Input" placeholder="Enter text" fill="outline"></r-input>
      </div>
    </div>
  );
}

