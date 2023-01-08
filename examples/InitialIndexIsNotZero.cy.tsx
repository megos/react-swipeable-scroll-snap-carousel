import React from 'react'
import InitialIndexIsNotZero from './InitialIndexIsNotZero'

describe('<InitialIndexIsNotZero />', () => {
  it('buttons', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<InitialIndexIsNotZero />)
    cy.visible(2)
    cy.contains('currentIndex: 2')

    cy.get('.wrapper').children().eq(0).its('hasClass').should('have.length', 1)
  })
})
