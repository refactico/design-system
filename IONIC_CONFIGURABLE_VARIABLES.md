# Ionic Configurable CSS Variables

This document lists all Ionic CSS variables that are **configurable** by users (not internal).

## Color System (Configurable)
- `--ion-color-primary` (+ `-rgb`, `-shade`, `-tint`, `-contrast`, `-contrast-rgb`)
- `--ion-color-secondary` (+ `-rgb`, `-shade`, `-tint`, `-contrast`, `-contrast-rgb`)
- `--ion-color-success` (+ `-rgb`, `-shade`, `-tint`)
- `--ion-color-warning` (+ `-rgb`, `-shade`, `-tint`)
- `--ion-color-danger` (+ `-rgb`, `-shade`, `-tint`)
- `--ion-color-dark` (+ `-rgb`, `-shade`, `-tint`, `-contrast`, `-contrast-rgb`)
- `--ion-color-light` (+ `-rgb`, `-shade`, `-tint`, `-contrast`, `-contrast-rgb`)
- `--ion-color-medium` (+ `-rgb`, `-shade`, `-tint`, `-contrast`, `-contrast-rgb`)

## Background (Configurable)
- `--ion-background-color`
- `--ion-background-color-rgb`

## Text Colors (Configurable)
- `--ion-text-color`
- `--ion-text-color-rgb`
- `--ion-text-color-step-50` through `--ion-text-color-step-950`

## Typography (Configurable)
- `--ion-font-family`
- `--ion-font-size-base`

## Spacing (Configurable)
- `--ion-padding`
- `--ion-margin`

## Borders (Configurable)
- `--ion-border-color`
- `--ion-border-width`
- `--ion-border-radius`
- `--ion-border-style`

## Internal Variables (NOT Configurable - Do NOT Map)
- `--ion-color-base` - Always uses `--ion-color-primary` internally
- `--ion-color-contrast` - Always uses the contrast of the current color internally
- `--ion-color-base-rgb` - Internal
- `--ion-color-contrast-rgb` - Internal

These internal variables are set by Ionic's `.ion-color-*` classes automatically.

