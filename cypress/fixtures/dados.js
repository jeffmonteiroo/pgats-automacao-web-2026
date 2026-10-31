function novoUsuario() {
  return {
    nome: 'Joao Teste',
    email: `pgats-${Date.now()}-${Math.random().toString(36).slice(2, 10)}@example.com`,
    senha: 'TestePgats123',
    primeiroNome: 'Joao',
    sobrenome: 'Teste',
    empresa: 'Empresa de Teste',
    endereco: '100 Test Street',
    complemento: 'Apartment 10',
    pais: 'Canada',
    estado: 'Ontario',
    cidade: 'Toronto',
    cep: 'M5V 1A1',
    telefone: '4165550100',
    dia: '10',
    mes: 'May',
    ano: '1990'
  }
}

// Dados fictícios, exclusivos da loja de treinamento. Não usar cartão real.
const pagamento = {
  nome: 'Joao Teste',
  numero: '4111111111111111',
  cvc: '123',
  mes: '12',
  ano: '2030'
}

module.exports = { novoUsuario, pagamento, termoBusca: 'Jeans' }
