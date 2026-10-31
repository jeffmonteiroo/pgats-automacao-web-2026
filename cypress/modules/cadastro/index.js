const seletores = {
  tituloNovo: 'h2', tituloInformacoes: 'b',
  nomeInicial: '[data-qa="signup-name"]', emailInicial: '[data-qa="signup-email"]',
  cadastrar: '[data-qa="signup-button"]', titulo: '#id_gender1',
  nome: '[data-qa="name"]', email: '[data-qa="email"]', senha: '[data-qa="password"]',
  dia: '[data-qa="days"]', mes: '[data-qa="months"]', ano: '[data-qa="years"]',
  newsletter: '#newsletter', ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]', sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]', endereco: '[data-qa="address"]', complemento: '[data-qa="address2"]',
  pais: '[data-qa="country"]', estado: '[data-qa="state"]', cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]', telefone: '[data-qa="mobile_number"]',
  criarConta: '[data-qa="create-account"]', criada: '[data-qa="account-created"]',
  continuar: '[data-qa="continue-button"]', erro: 'form[action="/signup"] > p',
  excluir: 'header a[href="/delete_account"]', excluida: '[data-qa="account-deleted"]'
}

function validarNovoCadastro() { cy.contains(seletores.tituloNovo, 'New User Signup!').should('be.visible') }

function iniciar(usuario) {
  cy.get(seletores.nomeInicial).type(usuario.nome)
  cy.get(seletores.emailInicial).type(usuario.email)
  cy.get(seletores.cadastrar).click()
}

function validarInformacoes(usuario) {
  cy.contains(seletores.tituloInformacoes, 'Enter Account Information').should('be.visible')
  cy.get(seletores.nome).should('have.value', usuario.nome)
  cy.get(seletores.email).should('have.value', usuario.email)
}

function preencher(usuario) {
  cy.get(seletores.titulo).check()
  cy.get(seletores.senha).type(usuario.senha, { log: false })
  cy.get(seletores.dia).select(usuario.dia)
  cy.get(seletores.mes).select(usuario.mes)
  cy.get(seletores.ano).select(usuario.ano)
  cy.get(seletores.newsletter).check()
  cy.get(seletores.ofertas).check()
  for (const campo of ['primeiroNome', 'sobrenome', 'empresa', 'endereco', 'complemento', 'estado', 'cidade', 'cep', 'telefone']) {
    cy.get(seletores[campo]).type(usuario[campo])
  }
  cy.get(seletores.pais).select(usuario.pais)
  cy.get(seletores.criarConta).click()
}

function validarContaCriada() { cy.get(seletores.criada).should('be.visible').and('contain.text', 'Account Created!') }
function continuar() { cy.get(seletores.continuar).click() }

function cadastrar(usuario) {
  validarNovoCadastro()
  iniciar(usuario)
  validarInformacoes(usuario)
  preencher(usuario)
  validarContaCriada()
  continuar()
}

function validarEmailExistente() {
  cy.get(seletores.erro).should('be.visible').and('have.text', 'Email Address already exist!')
}

function excluirConta() {
  cy.get(seletores.excluir).click()
  cy.get(seletores.excluida).should('be.visible').and('contain.text', 'Account Deleted!')
  continuar()
}

module.exports = { validarNovoCadastro, iniciar, validarInformacoes, preencher, validarContaCriada, continuar, cadastrar, validarEmailExistente, excluirConta }
