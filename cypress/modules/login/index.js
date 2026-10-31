const seletores = {
  titulo: 'h2',
  email: '[data-qa="login-email"]', senha: '[data-qa="login-password"]', entrar: '[data-qa="login-button"]',
  usuario: 'header a', sair: 'header a[href="/logout"]', erro: 'form[action="/login"] > p'
}

function validarTela() { cy.contains(seletores.titulo, 'Login to your account').should('be.visible') }
function entrar(usuario) {
  cy.get(seletores.email).type(usuario.email)
  cy.get(seletores.senha).type(usuario.senha, { log: false })
  cy.get(seletores.entrar).click()
}
function validarUsuario(usuario) {
  cy.contains(seletores.usuario, 'Logged in as').should('be.visible').and('contain.text', usuario.nome)
}
function sair() { cy.get(seletores.sair).click() }
function validarSessaoEncerrada() {
  cy.location('pathname').should('eq', '/login')
  validarTela()
  cy.contains(seletores.usuario, 'Logged in as').should('not.exist')
}
function validarErro() {
  cy.get(seletores.erro).should('be.visible').and('have.text', 'Your email or password is incorrect!')
  cy.contains(seletores.usuario, 'Logged in as').should('not.exist')
}

module.exports = { validarTela, entrar, validarUsuario, sair, validarSessaoEncerrada, validarErro }
