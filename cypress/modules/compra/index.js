const seletores = {
  linhas: '#cart_info tbody tr:has(.cart_description)', checkout: 'a.check_out',
  nomeProduto: '.cart_description h4', precoProduto: '.cart_price p',
  totalProduto: '.cart_total_price', quantidadeProduto: '.cart_quantity button',
  titulo: 'h2', mensagem: 'p',
  entrega: '#address_delivery', cobranca: '#address_invoice',
  comentario: 'textarea[name="message"]', pedido: 'a[href="/payment"]',
  titular: '[data-qa="name-on-card"]', numero: '[data-qa="card-number"]', cvc: '[data-qa="cvc"]',
  mes: '[data-qa="expiry-month"]', ano: '[data-qa="expiry-year"]', pagar: '[data-qa="pay-button"]',
  pedidoConcluido: '[data-qa="order-placed"]'
}

function validarCarrinho() {
  cy.location('pathname').should('eq', '/view_cart')
  validarProdutos()
}

function validarProdutos() {
  cy.get(seletores.linhas).should('have.length', 2)
  for (const indice of [0, 1]) {
    cy.get(seletores.linhas).eq(indice).within(() => {
      cy.get(`@nomeCarrinho${indice}`).then(nome => cy.get(seletores.nomeProduto).should('have.text', nome))
      cy.get(`@precoCarrinho${indice}`).then(preco => {
        cy.get(seletores.precoProduto).should('have.text', preco)
        cy.get(seletores.totalProduto).should('have.text', preco)
      })
      cy.get(seletores.quantidadeProduto).should('have.text', '1')
    })
  }
}

function iniciarCheckout() { cy.get(seletores.checkout).click() }

function validarCheckout(usuario) {
  cy.location('pathname').should('eq', '/checkout')
  cy.contains(seletores.titulo, 'Address Details').should('be.visible')
  cy.contains(seletores.titulo, 'Review Your Order').should('be.visible')
  for (const endereco of [seletores.entrega, seletores.cobranca]) {
    cy.get(endereco).should('be.visible')
      .and('contain.text', `${usuario.primeiroNome} ${usuario.sobrenome}`)
      .and('contain.text', usuario.empresa).and('contain.text', usuario.endereco)
      .and('contain.text', usuario.complemento).and('contain.text', usuario.cidade)
      .and('contain.text', usuario.estado).and('contain.text', usuario.cep)
      .and('contain.text', usuario.pais).and('contain.text', usuario.telefone)
  }
  validarProdutos()
}

function confirmarPedido(comentario) {
  cy.get(seletores.comentario).type(comentario)
  cy.get(seletores.pedido).click()
}

function pagar(cartao) {
  cy.get(seletores.titular).type(cartao.nome)
  cy.get(seletores.numero).type(cartao.numero, { log: false })
  cy.get(seletores.cvc).type(cartao.cvc, { log: false })
  cy.get(seletores.mes).type(cartao.mes)
  cy.get(seletores.ano).type(cartao.ano)
  cy.get(seletores.pagar).click()
}

function validarPedidoConcluido() {
  cy.get(seletores.pedidoConcluido).should('be.visible').and('contain.text', 'Order Placed!')
  cy.contains(seletores.mensagem, 'Congratulations! Your order has been confirmed!').should('be.visible')
}

module.exports = { validarCarrinho, iniciarCheckout, validarCheckout, confirmarPedido, pagar, validarPedidoConcluido }
