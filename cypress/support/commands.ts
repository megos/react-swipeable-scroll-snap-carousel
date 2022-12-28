Cypress.Commands.add('visible', (title: number) => {
  const width = 484 // 500px - 8px * 2 (body margin)
  cy.get('div[class^=Carousel_container__]').should(
    'have.prop',
    'scrollLeft',
    (title - 1) * width,
  )
})

Cypress.Commands.add(
  'swipe',
  { prevSubject: 'element' },
  (subject: Element, from: number, to: number) => {
    const y = 10
    cy.wrap(subject)
      .trigger('mousedown', { button: 1, x: from, y, force: true })
      .trigger('mousemove', { button: 1, x: to, y, force: true })
      .trigger('mouseup', { force: true })
  },
)

export {}
