const seletores = { rodape: '#footer', titulo: '#footer h2', email: '#susbscribe_email', enviar: '#subscribe', sucesso: '#success-subscribe' }

function inscrever(email) {
  cy.get(seletores.rodape).scrollIntoView()
  cy.contains(seletores.titulo, 'Subscription').should('be.visible')
  cy.get(seletores.email).type(email)
  cy.get(seletores.enviar).click()
}
function validarSucesso() {
  cy.get(seletores.sucesso).should('be.visible').and('contain.text', 'You have been successfully subscribed!')
}

module.exports = { inscrever, validarSucesso }
