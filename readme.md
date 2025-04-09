# 🛍️ Measure Shopper Backend

Backend da aplicação **Measure Shopper**, responsável por gerenciar medições e interações de usuários com métricas em um sistema escalável e performático.

## 🧾 Descrição

Esta API foi desenvolvida com foco em performance e manutenibilidade. Utiliza Fastify, Prisma e uma arquitetura moderna com testes automatizados para garantir confiabilidade e evolução do sistema.

## 🚀 Tecnologias utilizadas

- **Fastify** — Framework web rápido e leve para Node.js
- **TypeScript** — Superset de JavaScript com tipagem estática
- **Prisma** — ORM moderno e tipado
- **Vitest** — Testes unitários rápidos com suporte à cobertura
- **Tsup** — Bundler moderno para TypeScript
- **TSX** — Execução de arquivos TypeScript sem build prévio
- **UUID** — Geração de identificadores únicos
- **ESLint** — Linter com padrão Rocketseat
- **Faker.js** — Gerador de dados falsos para testes
- **Docker** (recomendado) — Para facilitar o ambiente de desenvolvimento

## 📦 Como instalar e rodar

### Pré-requisitos

- Node.js
- Docker e Docker Compose (opcional, mas recomendado)

### Passos

```bash
# Clone o repositório
git clone https://github.com/paulorfsantos17/measure-shopper-backend.git

# Acesse a pasta do projeto
cd measure-shopper-backend

# Instale as dependências
npm install

# Gere o banco de dados (ajuste conforme seu .env)
npx prisma migrate dev

# Rode o projeto em modo desenvolvimento
npm run dev

```
🧪 Testes
```bash
# Rodar testes unitários
npm run test

# Rodar em modo observador
npm run test:watch

# Ver cobertura de testes
npm run test:coverage
```

📸 Prints (em breve)
📌 Status
✅ Concluído (MVP funcional)

🏷️ Tags
typescript fastify prisma vitest backend tsup eslint faker uuid
