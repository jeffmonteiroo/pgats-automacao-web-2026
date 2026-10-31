# PGATS - Automação de Testes Web

Trabalho final da disciplina de Automação de Testes na Camada de Interface (Web), turma PGATS-2026-03. Implementa os casos **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16** do [Automation Exercise](https://automationexercise.com/test_cases).

## Executar

Requer Node.js 22 e acesso à internet. A primeira instalação baixa o aplicativo Cypress.

```sh
npm ci
npm test
```

Para acompanhar a execução na interface: `npm run test:open`. Para usar o Chrome instalado: `npm run test:chrome`.

O relatório é gerado em `cypress/reports/html/relatorio.html`, com recursos incorporados. Abra esse HTML no navegador após a execução. Capturas de falhas são incorporadas ao relatório. Os testes rodam sem repetição automática; uma falha não é ocultada por retries.

## Organização

| Caminho | Responsabilidade |
| --- | --- |
| `cypress/e2e/automation-exercise.cy.js` | Dez cenários, apenas orquestrando funções e dados |
| `cypress/modules/` | Contextos de navegação, cadastro, login, produtos, inscrição e compra |
| `cypress/fixtures/dados.js` | Identidades e cartão fictícios, termo de busca |
| `cypress/support/e2e.js` | Integração do relatório |
| `.github/workflows/e2e.yml` | Execução automatizada e artifact do relatório |

Cada módulo exporta funções com `module.exports`, centraliza seletores em `const seletores = {}` e contém suas validações. Usa `data-qa` onde a aplicação oferece esse atributo; nos demais elementos, atributos de domínio, identificadores e seletores limitados ao contexto. A posição do produto só é usada para o primeiro produto do caso 8 e para escolher dois itens na compra.

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

Cada cenário cria sua própria identidade com e-mail único em `example.com`. Os casos que precisam de usuário existente o cadastram na mesma execução, pela interface, e encerram a sessão antes do login avaliado. Não há dependência de conta deixada por outro teste. Os casos com cadastro excluem sua conta ao concluir; se uma falha interromper o fluxo, a conta sintética pode permanecer no ambiente de treinamento. A inscrição do caso 10 não possui cancelamento documentado.

A busca usa `Jeans`, termo conferido no catálogo. Compara os nomes retornados com os nomes correspondentes do catálogo lido imediatamente antes da busca, sem fixar quantidade. A busca do site também considera categorias; por isso o termo `top` não é usado como se fosse uma correspondência exclusiva pelo nome.

Os casos de compra usam exclusivamente dados fictícios da loja de treinamento. O sucesso é verificado na página final do pedido: `Order Placed!` e `Congratulations! Your order has been confirmed!`, mensagens atuais da aplicação.

O Cypress bloqueia hosts de publicidade (`doubleclick.net`, `googlesyndication.com` e `googleadservices.com`) para que anúncios externos não interrompam a navegação. As respostas da loja, os cadastros, os produtos, a busca e os pedidos são reais no ambiente fictício; não são substituídos por mocks. Exceções da aplicação continuam fazendo o teste falhar.

## GitHub Actions

O workflow executa em push, pull request e acionamento manual. Instala pelo lockfile, roda `npm test` e tenta publicar `relatorio-e2e` mesmo em caso de falha, com retenção de três dias. Na aba Actions, abra a execução e baixe o artifact para consultar o HTML. Publicar artifacts depende da cota de armazenamento disponível na conta GitHub.

## Entrega

Enviar à atividade da plataforma PGATS o ZIP do projeto e a URL do repositório. O ZIP deve conter fontes, configuração, lockfile, README, workflow e relatório verificado, sem `node_modules`. O formulário informa limite de **10 MB**.

Depois de uma execução com os dez casos aprovados, `python3 scripts/empacotar.py` gera `entrega/pgats-automacao-web.zip`. O script confere o JSON da execução, inclui o relatório HTML em `evidencias/`, verifica a integridade e o limite de tamanho e mantém dependências, cache e histórico Git fora do ZIP.

O enunciado define **31/10/2026 às 23:59:59**, sem informar fuso horário. O trabalho é individual. Não é necessário implantar um site.

## Referências

- [Casos oficiais do Automation Exercise](https://automationexercise.com/test_cases)
- [Configuração do Cypress](https://docs.cypress.io/app/references/configuration)
- [Integração do cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter)

Os fluxos iniciais de cadastro e autenticação foram adaptados do exercício anterior do próprio aluno, `automation-exercise-xpath/comparacao/automation-exercise-css.cy.js`, para a arquitetura modular deste trabalho.
