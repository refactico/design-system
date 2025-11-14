# app-home



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [app-shell](../app-shell)

### Depends on

- ion-icon
- [r-button](../r-button)
- [r-input](../r-input)

### Graph
```mermaid
graph TD;
  app-home --> ion-icon
  app-home --> r-button
  app-home --> r-input
  r-button --> ion-button
  r-button --> ion-icon
  ion-button --> ion-ripple-effect
  r-input --> ion-item
  r-input --> ion-label
  r-input --> ion-input
  r-input --> ion-button
  r-input --> ion-icon
  r-input --> ion-note
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-input --> ion-icon
  app-shell --> app-home
  style app-home fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
