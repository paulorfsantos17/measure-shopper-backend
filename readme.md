# Measure Shopper Backend 🔍

API backend para processamento de imagens de medidores (água, luz, gás, etc.), integração com o Gemini para leitura automática e retorno do valor da medição. Ideal para automação de coleta de consumo e uso em aplicações de monitoramento ou gestão.

---

## 🏷️ Badges

![Node.js](https://img.shields.io/badge/node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Status](https://img.shields.io/badge/status-Portfólio-blue?style=for-the-badge)

---

## 📸 Visão geral

Este backend recebe imagens de medidores (luz, água, gás, etc.), encaminha para o Gemini (IA) realizar a análise e retorna a leitura numérica já processada.  
Pode ser utilizado como base para:

- Aplicações web ou mobile de registro de consumo.
- Automação de leitura de medidores físicos.
- Projetos de estudo e portfólio focados em IA e processamento de imagens.

---

## ℹ️ Sobre o projeto

O **Measure Shopper Backend** foi desenvolvido como parte de um portfólio voltado a aplicações modernas que combinam:

- Processamento de imagens para leitura de medidores.
- Integração com modelos de IA (Gemini) para interpretação automática.
- Boas práticas de desenvolvimento backend com Node.js, Fastify e TypeScript.
- Persistência de dados via Prisma e banco relacional.

O foco é fornecer uma API organizada, escalável e pronta para ser integrada a frontends ou outros serviços, permitindo automatizar a leitura de medidores físicos sem necessidade de digitação manual.

---

## ✨ Funcionalidades

- ✅ Recebimento de imagens de medidores (água, luz, gás, etc.).
- ✅ Integração com o Gemini para análise da imagem.
- ✅ Extração e retorno do valor de leitura em formato estruturado.
- ✅ Gerenciamento de medições e métricas (conforme o domínio da aplicação).
- ✅ Estrutura pronta para testes automatizados.
- ✅ Suporte a execução via Docker Compose (banco + API).

*(Adapte e complemente esta lista conforme os endpoints/rotas atuais do projeto.)*

---

## 🛠️ Tecnologias utilizadas

- **Linguagem & Runtime**
  - Node.js
  - TypeScript

- **Framework**
  - Fastify

- **ORM / Banco de dados**
  - Prisma
  - Banco relacional (ex.: PostgreSQL) via Docker Compose

- **Testes**
  - Vitest

- **Ferramentas de desenvolvimento**
  - ESLint (padrão Rocketseat)
  - Faker.js (para geração de dados falsos em testes)
  - UUID (geração de identificadores únicos)
  - Tsup / TSX (build/execução de TypeScript)

- **Outros**
  - Docker / Docker Compose
  - Integração com **Gemini** (API de IA)

---

## ✅ Pré-requisitos

Para rodar o projeto localmente, você precisará de:

- **Node.js** (versão conforme seu ambiente; recomendado 18+)
- **pnpm** instalado globalmente:
  ```bash
  npm install -g pnpm
  ```
- **Docker** e **Docker Compose** instalados:
  - Docker Engine
  - Docker Compose (ou Docker Desktop com suporte a Compose)

---

## ⚙️ Configuração de ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias.  
Ajuste os nomes abaixo conforme o que você definiu no código:

```env
# Porta da API
PORT=3333

# Conexão com o banco de dados (exemplo para PostgreSQL)
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/measure_shopper?schema=public

# Chave de API do Gemini
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

**Descrição das variáveis:**

- `PORT`  
  Porta em que o servidor Fastify irá rodar localmente.

- `DATABASE_URL`  
  URL de conexão com o banco de dados utilizada pelo Prisma.  
  Ajuste usuário, senha, host e nome do banco conforme seu ambiente.

- `GEMINI_API_KEY`  
  Chave de acesso à API do Gemini para processamento de imagens e extração da leitura.

> Atenção: nunca commite o `.env` no repositório. Mantenha as chaves sempre em segurança.

---

## 📦 Instalação

Clone o repositório e instale as dependências:

```bash
# Clonar o repositório
git clone https://github.com/paulorfsantos17/measure-shopper-backend.git

# Entrar na pasta do projeto
cd measure-shopper-backend

# Instalar dependências
pnpm install
```

---

## 🚀 Como rodar o projeto

### 1. Subir serviços com Docker Compose (banco de dados)

Na raiz do projeto:

```bash
docker-compose up -d
```

Isso irá subir o banco de dados (e demais serviços configurados no `docker-compose.yml`).

### 2. Executar migrações do Prisma

Após o banco estar de pé, execute:

```bash
pnpm prisma migrate dev
```

*(Ajuste o comando conforme o script definido no `package.json`, se diferente.)*

### 3. Rodar a API em modo desenvolvimento

```bash
pnpm dev
```

A API deverá iniciar na porta configurada em `PORT` (por padrão, algo como `http://localhost:3333`).

---

## 📚 Como usar / Fluxo de uso

### Fluxo básico

1. **Envio da imagem**  
   - O cliente (frontend/app) envia uma requisição para o endpoint responsável pelo upload de imagem do medidor.
   - A imagem é recebida pelo backend.

2. **Processamento via Gemini**
   - O backend envia a imagem ao Gemini com um prompt adequado para leitura de medidores.
   - O Gemini retorna a leitura extraída (ex.: `123.45`).

3. **Resposta da API**
   - A API retorna um JSON com a leitura já interpretada, por exemplo:

```json
{
  "meterType": "energy",
  "value": 123.45,
  "unit": "kWh",
  "timestamp": "2024-06-09T22:05:00.000Z"
}
```

### Exemplo de requisição (ilustrativo)

```bash
curl -X POST http://localhost:3333/readings \
  -H "Content-Type: multipart/form-data" \
  -F "image=@/caminho/para/medidor.jpg"
```

*(Ajuste o endpoint e os campos conforme a sua implementação real.)*

---

## 🗂️ Estrutura de pastas

Estrutura real do repositório:

```text
measure-shopper-backend/
├─ prisma/               # Arquivos relacionados ao Prisma (schema, migrations, etc.)
├─ src/                  # Código-fonte principal da aplicação
├─ test/                 # Testes automatizados (Vitest)
├─ .eslintrc.json        # Configuração do ESLint
├─ .gitignore            # Arquivos/dirs ignorados pelo Git
├─ docker-compose.yml    # Configuração de serviços Docker (banco, etc.)
├─ package.json          # Scripts e dependências do projeto
├─ pnpm-lock.yaml        # Lockfile do pnpm
├─ readme.md             # Documentação do projeto
├─ tsconfig.json         # Configuração do TypeScript
└─ vitest.config.mts     # Configuração do Vitest
```

> Caso haja subpastas específicas dentro de `src/` (como `routes`, `services`, `controllers`, etc.), você pode detalhar mais esta árvore depois para facilitar a navegação de outros devs.

---

## 🧭 Roadmap (sugestões futuras)

- [ ] Documentar endpoints da API (rotas, payloads e respostas).
- [ ] Implementar autenticação e controle de acesso às medições.
- [ ] Suporte a múltiplos provedores de IA além do Gemini.
- [ ] Integração com frontend (dashboard de leituras).
- [ ] Logs e auditoria detalhada das leituras processadas.
- [ ] Melhorar tratamento de erros de upload e validação de entrada.

---

## 🤝 Contribuição

Sugestões e melhorias são bem-vindas!  
Se quiser contribuir:

1. Faça um **fork** do repositório.
2. Crie uma branch para sua feature/fix:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "feat: minha nova funcionalidade"
   ```
4. Envie a branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um **Pull Request** descrevendo claramente o que foi alterado.

---

## 👤 Autor

**Paulo Santos**

- GitHub: [paulorfsantos17](https://github.com/paulorfsantos17)
- LinkedIn: [linkedin.com/in/paulosantosdesenvolvedor](https://www.linkedin.com/in/paulosantosdesenvolvedor)
- Email: [paulorfsantos17@gmail.com](mailto:paulorfsantos17@gmail.com)
- Site: [devpaulo.com](https://devpaulo.com)

Se este projeto foi útil para você, considere deixar uma estrela ⭐ no repositório.
