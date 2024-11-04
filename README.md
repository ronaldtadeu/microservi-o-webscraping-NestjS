
# Projeto de Microserviços com NestJS

Este projeto é uma API dividida em dois microserviços, projetada para gerenciar usuários e realizar scraping de dados de produtos. Utiliza o NestJS como framework principal e segue uma arquitetura baseada em microserviços para facilitar a escalabilidade e manutenção.

## Tecnologias Utilizadas

- **Node.js** e **NestJS** para construção dos microserviços
- **Puppeteer** para scraping de dados de produtos
- **Swagger** para documentação das APIs

## Arquitetura

A arquitetura escolhida foi a de **microserviços**, onde cada funcionalidade principal é gerenciada por um serviço isolado. Neste caso, temos:

1. **Microserviço de Usuários**: Gerencia o cadastro, leitura, atualização e exclusão de usuários.
2. **Microserviço de Scraping**: Realiza login automático e scraping de dados de produtos de um site específico.

Essa separação permite uma escalabilidade independente de cada serviço, além de facilitar o desenvolvimento e manutenção.

## Instruções de Deploy

1. Clone o repositório para o seu ambiente local.
2. Acesse a pasta de cada microserviço e instale as dependências:
   ```bash
   cd user-service
   npm install
   ```
   ```bash
   cd puppeteer-service
   npm install
   ```
3. Para iniciar cada microserviço, entre na pasta correspondente e execute o comando de inicialização:
   ```bash
   cd user-service
   npm run start
   ```
   ```bash
   cd puppeteer-service
   npm run start
   ```
4. A API estará disponível nas portas definidas em cada microserviço.

## Acessando o Swagger

Cada microserviço possui sua própria documentação Swagger.

- **User service**: Após iniciar o serviço, acesse `http://localhost:3000/api` para visualizar a documentação.
- **Scraping service**: Após iniciar o serviço, acesse `http://localhost:3001/api` para visualizar a documentação.

## Rotas das APIs

### Microserviço de Usuários

- **ENDPOINT**: `http://localhost:3000/`

- **Rota**: `POST /users`
  - **Descrição**: Cria um novo usuário.
  - **Entrada**:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
  - **Retorno**:
    ```json
    {
      "id": "1",
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
    ```

- **Rota**: `GET /users/:id`
  - **Descrição**: Retorna dados de um usuário pelo ID.
  - **Retorno**:
    ```json
    {
      "id": "1",
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
    ```

### Microserviço de Scraping

- **ENDPOINT**: `http://localhost:3001/`

- **Rota**: `POST /scrape/product`
  - **Descrição**: Realiza login e scraping de produtos.
  - **Entrada**:
    ```json
    {
      "username": "standard_user",
      "password": "secret_sauce"
    }
    ```
  - **Retorno**:
    ```json
    {
      "products": [
        {
          "name": "Produto 1",
          "price": 29.99
        },
        {
          "name": "Produto 2",
          "price": 49.99
        }
      ],
      "mostExpensiveProduct": {
        "name": "Produto 2",
        "price": 49.99
      },
      "cheapestProduct": {
        "name": "Produto 1",
        "price": 29.99
      }
    }
    ```

- **Rota**: `POST /scrape/auto-login-products`
  - **Descrição**: Realiza login automaticamente com múltiplos usuários e retorna o resultado.
  - **Retorno**:
    ```json
    {
      "results": [
        { "username": "standard_user", "success": true, "mostExpensiveProduct": { "name": "Produto X", "price": 49.99 } },
        { "username": "locked_out_user", "success": false, "error": "Este usuário está bloqueado." }
      ]
    }
    ```

## Testes Unitários

Para rodar os testes unitários, navegue até a pasta do microserviço e execute:
```bash
npm run test
```

