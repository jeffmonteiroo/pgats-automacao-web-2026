"""Gera o ZIP para a plataforma somente após dez testes realmente aprovados."""
from pathlib import Path
import json
import zipfile

raiz = Path(__file__).resolve().parent.parent
relatorio = raiz / 'cypress/reports/html/relatorio.html'
dados = raiz / 'cypress/reports/html/.jsons/relatorio.json'
resultado = json.loads(dados.read_text())
stats = resultado['stats']
assert stats['tests'] == stats['passes'] == 10, 'A entrega requer dez casos aprovados.'
assert all(stats.get(chave, 0) == 0 for chave in ['failures', 'pending', 'skipped']), 'Há falha ou caso não executado.'
assert relatorio.is_file(), 'Relatório HTML não encontrado.'

destino = raiz / 'entrega/pgats-automacao-web.zip'
destino.parent.mkdir(exist_ok=True)
arquivos = [raiz / nome for nome in ['.gitignore', 'README.md', 'package.json', 'package-lock.json', 'cypress.config.js']]
for pasta in ['.github', 'cypress/e2e', 'cypress/fixtures', 'cypress/modules', 'cypress/support', 'scripts']:
    arquivos.extend(p for p in (raiz / pasta).rglob('*') if p.is_file() and '__pycache__' not in p.parts)

with zipfile.ZipFile(destino, 'w', compression=zipfile.ZIP_DEFLATED) as zipado:
    for arquivo in sorted(arquivos):
        zipado.write(arquivo, Path(raiz.name) / arquivo.relative_to(raiz))
    zipado.write(relatorio, Path(raiz.name) / 'evidencias/relatorio.html')
    zipado.write(dados, Path(raiz.name) / 'evidencias/resultado.json')

with zipfile.ZipFile(destino) as zipado:
    assert zipado.testzip() is None, 'Arquivo ZIP corrompido.'
    assert all('node_modules' not in Path(nome).parts and '.git' not in Path(nome).parts for nome in zipado.namelist())
assert destino.stat().st_size < 10_000_000, 'O ZIP excede o limite de 10 MB da plataforma.'
print(f'{destino}\n{destino.stat().st_size:,} bytes\n10 aprovados; 0 falhas; 0 pendentes; 0 ignorados.')
