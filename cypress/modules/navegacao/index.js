const seletores = {
  logo: 'img[alt="Website for automation practice"]',
  destaque: '#slider-carousel',
  login: 'header a[href="/login"]',
  produtos: 'header a[href="/products"]',
  carrinho: 'header a[href="/view_cart"]'
}

function validarHome() {
  cy.location('pathname').should('eq', '/')
  cy.get(seletores.logo).should('be.visible')
  cy.get(seletores.destaque).should('be.visible')
}

function abrirHome() {
  cy.visit('/')
  validarHome()
}

function abrirLogin() { cy.get(seletores.login).click() }
function abrirProdutos() { cy.get(seletores.produtos).click() }
function abrirCarrinho() { cy.get(seletores.carrinho).click() }

module.exports = { abrirHome, validarHome, abrirLogin, abrirProdutos, abrirCarrinho }
