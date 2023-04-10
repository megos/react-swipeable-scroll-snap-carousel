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

  it('mouse swipe', () => {
    const width = 484
    const halfWidth = width / 2
    const margin = 10

    cy.mount(<App />)

    // short
    cy.contains('div', 1).swipe(margin + halfWidth - 1, margin)
    cy.visible(1)
    cy.contains('currentIndex: 1')

    // reverse
    cy.contains('div', 1).swipe(margin, margin + width)
    cy.visible(1)
    cy.contains('currentIndex: 1')

    // swipe 1 to 2
    cy.contains('div', 1).swipe(margin + halfWidth, margin)
    cy.visible(2)
    cy.contains('currentIndex: 2')

    // TODO: Not working in CI
    // intercept
    // cy.contains('button', 4).click()
    // cy.contains('div', 2).click()
    // cy.visible(2)
    // cy.contains('currentIndex: 2')

    cy.contains('button', 2).click()
    // swipe 2 to 1
    cy.contains('div', 2).swipe(margin, margin + width)
    cy.visible(1)
    cy.contains('currentIndex: 1')
  })
})
