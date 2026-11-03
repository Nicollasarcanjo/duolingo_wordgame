# Duolingo Wordgame

Jogo de navegador para praticar vocabulário e frases em inglês. O site usa HTML, CSS e JavaScript sem dependências de instalação; o progresso fica no armazenamento local do navegador.

## Executar localmente

Requer Node.js 18 ou mais recente. Na pasta do projeto, execute:

```sh
node scripts/serve.cjs
```

Abra <http://127.0.0.1:4173/> no navegador. Para encerrar, pressione `Ctrl+C` no terminal.

## Verificações

```sh
node --test scripts/test-learning.cjs
node scripts/audit-catalog.cjs
```

A auditoria automática encontra dados ausentes e possíveis itens que precisam de revisão contextual; ela não substitui uma revisão editorial.

## Conteúdo e atribuição

O catálogo e as adaptações têm fontes e licenças descritas em `dist/creditos.html`, `dist/NOTICE-LexiCore.md`, `dist/ATTRIBUTION-KOReader-en-pt.txt` e `ATTRIBUTION.md`. Consulte esses arquivos antes de redistribuir os dados.
