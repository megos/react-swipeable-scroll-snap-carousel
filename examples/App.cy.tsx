import React from 'react'
import App from './App'

describe('<App />', () => {
  it('buttons', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<App />)
    cy.visible(1)

    cy.contains('button', 2).click()
    cy.visible(2)

    cy.contains('button', 3).click()
    cy.visible(3)

    cy.contains('button', 4).click()
    cy.visible(4)

    cy.contains('button', 1).click()
    cy.visible(1)
  })
})
