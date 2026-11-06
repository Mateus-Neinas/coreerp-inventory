# CoreERP Inventory

Módulo de domínio para saldo e movimentações de estoque em um ERP genérico.

## O que faz

- Valida recebimentos, saídas e ajustes.
- Bloqueia movimentações que deixariam o saldo negativo.
- Classifica saldo como zerado, baixo ou disponível.
- Usa milésimos como unidade interna para evitar erros de arredondamento em quantidades fracionadas.

## Executar

Requer Node.js 20 ou superior.

```bash
npm test
```

## Funções principais

- `applyMovement(currentMilli, movement)`: calcula o saldo resultante sem mutar o valor recebido.
- `classifyStock(currentMilli, reorderPointMilli)`: classifica o saldo comparando-o com o ponto de reposição.

As funções recebem quantidades inteiras em milésimos. Exemplo: `1250` representa `1,250` unidade. Esta é uma biblioteca de domínio demonstrativa; ainda não persiste nem consulta o PostgreSQL de `coreerp-database`.
