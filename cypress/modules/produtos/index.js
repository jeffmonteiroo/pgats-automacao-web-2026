const seletores = {
  titulo: '.features_items > h2', lista: '.features_items .product-image-wrapper',
  info: '.productinfo', nome: '.productinfo p', preco: '.productinfo h2',
  detalhes: 'a[href^="/product_details/"]', informacoes: '.product-information',
  nomeDetalhe: 'h2', precoDetalhe: 'span > span', campoDetalhe: 'p',
  busca: '#search_product', pesquisar: '#submit_search', adicionar: '.productinfo a.add-to-cart',
  modal: '#cartModal', continuar: '#cartModal .close-modal'
}

function validarCatalogo() {
  cy.location('pathname').should('eq', '/products')
  cy.get(seletores.titulo).should('be.visible').and('contain.text', 'All Products')
  cy.get(seletores.lista).should('have.length.greaterThan', 0)
  cy.get(seletores.lista).first().should('be.visible')
}

function abrirPrimeiroProduto() {
  cy.get(seletores.lista).first().within(() => {
    cy.get(seletores.nome).invoke('text').then(texto => cy.wrap(texto.trim()).as('nomeProduto'))
    cy.get(seletores.preco).invoke('text').then(texto => cy.wrap(texto.trim()).as('precoProduto'))
    cy.get(seletores.detalhes).click()
  })
}

function validarDetalhes() {
  cy.location('pathname').should('match', /^\/product_details\/\d+$/)
  cy.get(seletores.informacoes).should('be.visible').within(() => {
    cy.get('@nomeProduto').then(nome => cy.get(seletores.nomeDetalhe).should('be.visible').and('have.text', nome))
    cy.get('@precoProduto').then(preco => cy.get(seletores.precoDetalhe).should('be.visible').and('have.text', preco))
    for (const campo of ['Category:', 'Availability:', 'Condition:', 'Brand:']) {
      cy.contains(seletores.campoDetalhe, campo).should('be.visible').invoke('text').should('match', new RegExp(`${campo}\\s*\\S+`))
    }
  })
}

function buscar(termo) {
  cy.get(seletores.lista).find(seletores.nome).then(nomes => {
    const esperados = Array.from(nomes, no => no.textContent.trim()).filter(nome => nome.toLowerCase().includes(termo.toLowerCase()))
    cy.wrap(esperados).as('produtosEsperados')
  })
  cy.get(seletores.busca).type(termo)
  cy.get(seletores.pesquisar).click()
}

function validarBusca(termo) {
  cy.get(seletores.titulo).should('be.visible').and('contain.text', 'Searched Products')
  cy.get(seletores.lista).should('have.length.greaterThan', 0).each(produto => {
    cy.wrap(produto).find(seletores.nome).should('be.visible').invoke('text').should('match', new RegExp(termo, 'i'))
  })
  cy.get('@produtosEsperados').then(esperados => {
    cy.get(seletores.lista).find(seletores.nome).should(nomes => {
      expect(Array.from(nomes, no => no.textContent.trim()).sort()).to.deep.equal([...esperados].sort())
    })
  })
}

function adicionarDoisAoCarrinho() {
  cy.get(seletores.lista).should('have.length.at.least', 2)
  for (const indice of [0, 1]) {
    cy.get(seletores.lista).eq(indice).within(() => {
      cy.get(seletores.nome).invoke('text').then(texto => cy.wrap(texto.trim()).as(`nomeCarrinho${indice}`))
      cy.get(seletores.preco).invoke('text').then(texto => cy.wrap(texto.trim()).as(`precoCarrinho${indice}`))
      cy.get(seletores.adicionar).click()
    })
    cy.get(seletores.modal).should('be.visible')
    cy.get(seletores.continuar).click()
    cy.get(seletores.modal).should('not.be.visible')
  }
}

module.exports = { validarCatalogo, abrirPrimeiroProduto, validarDetalhes, buscar, validarBusca, adicionarDoisAoCarrinho }
