
# Projeto de API com NestJS e Puppeteer

Este projeto é uma API desenvolvida com NestJS para realizar operações CRUD em recursos de usuários e, em um segundo microserviço, executar web scraping com Puppeteer para capturar informações de produtos do site [SauceDemo](https://www.saucedemo.com/).

## Tecnologias Utilizadas
- **NestJS**: Framework para construção de APIs Node.js.
- **Puppeteer**: Biblioteca para automação de navegação em páginas web.
- **Swagger**: Ferramenta para documentação de APIs.
- **Docker** (opcional para o deploy): Para gerenciar containers dos microserviços.

## Arquitetura do Projeto
Este projeto adota uma arquitetura baseada em microserviços, onde:
- **Microserviço 1**: Gerenciamento de usuários (CRUD).
- **Microserviço 2**: Web scraping de informações de produtos do site SauceDemo.

Cada microserviço possui uma API própria e pode ser escalado de forma independente.

## Instruções de Deploy
Para implantar os microserviços:
1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Execute cada microserviço:
   ```bash
   npm run start:microservice1  # Inicia o microserviço de usuários
   npm run start:microservice2  # Inicia o microserviço de scraping
   ```

Para deploy com Docker:
1. Certifique-se de que o Docker esteja instalado.
2. Construa as imagens para cada microserviço:
   ```bash
   docker build -t user-service -f ./UserService/Dockerfile .
   docker build -t scrape-service -f ./ScrapeService/Dockerfile .
   ```
3. Execute os containers:
   ```bash
   docker run -p 3000:3000 user-service
   docker run -p 3001:3001 scrape-service
   ```

## Acessando o Swagger
Para acessar a documentação do Swagger:
1. Certifique-se de que os microserviços estão em execução.
2. Acesse o Swagger de cada microserviço em:
   - **Microserviço 1 (User Service)**: `http://localhost:3000/api`
   - **Microserviço 2 (Scrape Service)**: `http://localhost:3001/api`

## Rotas das APIs e Exemplos

### Microserviço 1 - Gerenciamento de Usuários

1. **Criar Usuário**
   - **Rota**: `POST /users`
   - **Exemplo de Entrada**:
     ```json
     {
       "name": "João Silva",
       "age": 30
     }
     ```
   - **Exemplo de Saída**:
     ```json
     {
       "id": "1",
       "name": "João Silva",
       "age": 30
     }
     ```

2. **Listar Usuários**
   - **Rota**: `GET /users`
   - **Exemplo de Saída**:
     ```json
     [
       {
         "id": "1",
         "name": "João Silva",
         "age": 30
       }
     ]
     ```

3. **Buscar Usuário por ID**
   - **Rota**: `GET /users/{id}`
   - **Exemplo de Saída**:
     ```json
     {
       "id": "1",
       "name": "João Silva",
       "age": 30
     }
     ```

4. **Atualizar Usuário**
   - **Rota**: `PUT /users/{id}`
   - **Exemplo de Entrada**:
     ```json
     {
       "name": "João Almeida",
       "age": 31
     }
     ```
   - **Exemplo de Saída**:
     ```json
     {
       "id": "1",
       "name": "João Almeida",
       "age": 31
     }
     ```

5. **Excluir Usuário**
   - **Rota**: `DELETE /users/{id}`
   - **Exemplo de Saída**:
     ```json
     {
       "message": "User deleted successfully"
     }
     ```

### Microserviço 2 - Web Scraping com Puppeteer

1. **Scraping de Produto com Credenciais**
   - **Rota**: `POST /scrape/product`
   - **Exemplo de Entrada**:
     ```json
     {
       "username": "standard_user",
       "password": "secret_sauce"
     }
     ```
   - **Exemplo de Saída**:
     ```json
     {
       "products": [
         {
           "name": "Produto A",
           "price": 19.99
         },
         {
           "name": "Produto B",
           "price": 29.99
         }
       ],
       "mostExpensiveProduct": {
         "name": "Produto B",
         "price": 29.99
       },
       "cheapestProduct": {
         "name": "Produto A",
         "price": 19.99
       }
     }
     ```

2. **Login Automático com Diversos Usuários**
   - **Rota**: `POST /scrape/auto-login-products`
   - **Exemplo de Saída**:
     ```json
     {
       "results": [
         {
           "username": "standard_user",
           "success": true,
           "message": "Login successful for user standard_user.",
           "mostExpensiveProduct": {
             "name": "Produto C",
             "price": 39.99
           }
         },
         {
           "username": "locked_out_user",
           "success": false,
           "message": "Este usuário está bloqueado."
         }
       ]
     }
     ```

Para mais informações, consulte a documentação Swagger disponível para cada microserviço.
