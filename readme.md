# Como Rodar a aplicação
   ## Antes de rodar a aplicação rode os seguintes comandos:
    - docker compose up -d (que criar o banco de dados com docker)

    - npm prisma migrate dev (para criar as tabelas no banco de dados)

  ## Agora os scripts da aplicação: 
      "dev" : roda a aplicação em modo desenvolvedor
      "test":  
      "test:watch": rodas os teste unitários  em modo watch
      "test:coverage": gera o coverage dos test unitários

