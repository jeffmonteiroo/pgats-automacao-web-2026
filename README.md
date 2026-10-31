# PGATS - Automação de Testes Web

Trabalho da disciplina de Automação de Testes na Camada de Interface (Web), turma PGATS-2026-03. Automatiza os casos **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16** do [Automation Exercise](https://automationexercise.com/test_cases).

## Executar

Requer Node.js 22 e acesso à internet. A primeira instalação baixa o aplicativo Cypress.

```sh
npm ci
npm test
```

Para abrir o Cypress: `npm run test:open`. Para executar no Chrome: `npm run test:chrome`.

Abra `cypress/reports/html/relatorio.html` no navegador para consultar os resultados e as capturas de falha. Os testes rodam sem repetição automática (`retries: 0`).

## Organização

| Caminho | Responsabilidade |
| --- | --- |
| `cypress/e2e/automation-exercise.cy.js` | Dez cenários, apenas orquestrando funções e dados |
| `cypress/modules/` | Contextos de navegação, cadastro, login, produtos, inscrição e compra |
| `cypress/fixtures/dados.js` | Identidades e cartão fictícios, termo de busca |
| `cypress/support/e2e.js` | Integração do relatório |
| `.github/workflows/e2e.yml` | Execução automatizada e artifact do relatório |

Os módulos usam `module.exports`, seletores em `const seletores = {}` e validações com `should`. A spec chama essas funções e passa os dados. Os elementos usam `data-qa` quando disponível; os demais seletores ficam limitados à área da página em que são usados.

## Cobertura

| Caso | Comportamento verificado |
| --- | --- |
| 1 | Cadastro completo, confirmação, usuário autenticado e exclusão da conta |
| 5 | Rejeição de cadastro com e-mail existente |
| 3 | Rejeição de credenciais inválidas |
| 2 | Login válido e exclusão da própria conta |
| 4 | Logout e retorno à página de login |
| 8 | Catálogo e seis informações do primeiro produto |
| 9 | Busca não vazia, correspondência dos nomes e conjunto completo de resultados |
| 10 | Inscrição no rodapé da home |
| 15 | Cadastro antes do checkout, endereços, dois produtos, pagamento fictício e exclusão |
| 16 | Login antes do checkout, endereços, dois produtos, pagamento fictício e exclusão |

## Dados e decisões

- Cada teste gera um e-mail novo em `example.com`. Os cenários de login e cadastro duplicado criam sua própria conta pela interface antes de começar o fluxo avaliado.
- As contas são excluídas ao concluir cada caso. Se o teste falhar antes da exclusão, a conta fictícia pode permanecer no site. O caso 10 não tem cancelamento de inscrição documentado.
- A busca usa `Jeans`. Os resultados são comparados com os nomes correspondentes no catálogo lido antes da busca, sem fixar a quantidade. O site também pesquisa por categoria, por isso `top` retornava nomes que não continham essa palavra.
- Os casos 15 e 16 conferem os endereços de entrega e cobrança, os dois produtos, preços, quantidades e totais. Usam cartão fictício e validam `Order Placed!` e a confirmação na página final.
- Os hosts de publicidade são bloqueados para evitar anúncios sobre os botões. Os fluxos da loja usam as respostas reais do site de treinamento, sem mocks. Erros da aplicação fazem o teste falhar.

## GitHub Actions

O workflow roda em push, pull request e acionamento manual. Usa Node 22, instala com `npm ci`, executa `npm test` e salva o relatório no artifact `relatorio-e2e` por três dias. Na aba Actions, abra a execução e baixe o artifact para consultar o HTML.

## Entrega

Enviar o ZIP do projeto e a URL do repositório à atividade da plataforma PGATS. Limite do anexo: **10 MB**.

Após os dez casos passarem, `python3 scripts/empacotar.py` gera `entrega/pgats-automacao-web.zip` com fontes, configuração e relatório. O script confere os resultados, a integridade e o tamanho do ZIP. A pasta `node_modules` fica fora da entrega.

Prazo: **31/10/2026 às 23:59:59**, sem fuso informado no enunciado. Trabalho individual.

## Referências

- [Casos oficiais do Automation Exercise](https://automationexercise.com/test_cases)
- [Configuração do Cypress](https://docs.cypress.io/app/references/configuration)
- [Integração do cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter)
- [Entrega pública consultada para comparar a estrutura](https://github.com/vhafgp/pgats-automacao-web-2026/tree/318c367dad09d724bc239afe97364b8509315842)

Os fluxos iniciais de cadastro e autenticação foram adaptados do exercício anterior do próprio aluno, `automation-exercise-xpath/comparacao/automation-exercise-css.cy.js`, para a arquitetura modular deste trabalho.
