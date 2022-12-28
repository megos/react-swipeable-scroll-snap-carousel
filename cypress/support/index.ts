import './component'

declare global {
  namespace Cypress {
    interface Chainable {
      visible(title: number): void
      swipe(from: number, to: number): void
    }
  }
}
