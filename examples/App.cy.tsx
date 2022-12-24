import React from 'react'
import App from './App'

describe('<App />', () => {
  it('buttons', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<App />)
    cy.contains('div', 1).should('be.visible')
    cy.contains('div', 2).should('not.contain')
    cy.contains('div', 3).should('not.contain')

    cy.contains('button', 2).click()
    cy.contains('div', 2).should('be.visible')
    cy.contains('div', 1).should('not.contain')
    cy.contains('div', 3).should('not.contain')

    cy.contains('button', 3).click()
    cy.contains('div', 3).should('be.visible')
    cy.contains('div', 1).should('not.contain')
    cy.contains('div', 2).should('not.contain')

    cy.contains('button', 1).click()
    cy.contains('div', 1).should('be.visible')
    cy.contains('div', 2).should('not.contain')
    cy.contains('div', 3).should('not.contain')
  })
})
