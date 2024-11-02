
# Web Scraping Service

Este sistema é um serviço de scraping que utiliza o Puppeteer para extrair informações de produtos de uma página da web. Ele também se integra a um microserviço de usuários para armazenar os dados. O serviço permite logar em diferentes usuários do site de demonstração e retorna informações sobre os produtos disponíveis.

## Tecnologias Utilizadas

- **Linguagens**: 
  - TypeScript
  - JavaScript

- **Frameworks**:
  - NestJS (para construção da API)
  - Puppeteer (para web scraping)
  - Axios (para requisições HTTP)

- **Banco de Dados**:
  - MongoDB (para armazenamento de dados de usuários)

## Arquitetura

O sistema é composto por duas partes principais:

1. **Serviço de Web Scraping**: Utiliza o Puppeteer para automatizar o processo de login em um site de demonstração e extrair informações sobre produtos, como nome e preço. O serviço também consegue lidar com diferentes tipos de usuários e gerenciar suas respectivas mensagens de erro.

2. **Microserviço de Usuários**: Um microserviço que lida com a criação e gerenciamento de usuários. Ele armazena informações sobre produtos e usuários no banco de dados MongoDB.

## Estrutura de Pastas

Abaixo está uma pré-visualização das pastas do projeto e suas respectivas funções:

```
/microserviço-webscraping-NestjS
├── /dist                # Diretório gerado após a compilação do TypeScript.
├── /node_modules        # Dependências do projeto instaladas pelo npm.
├── /src                 # Código-fonte da aplicação.
│   ├── /puppeteer       # Contém o serviço de scraping e controlador relacionados ao Puppeteer.
│   │   ├── puppeteer.controller.ts    # Controlador responsável por gerenciar as rotas de scraping.
│   │   └── puppeteer.service.ts       # Serviço que utiliza o Puppeteer para realizar o scraping.
│   ├── /user            # Contém o microserviço de gerenciamento de usuários.
│   │   ├── user.controller.ts          # Controlador que gerencia as rotas de usuários.
│   │   └── user.service.ts             # Serviço que contém a lógica para criação e gerenciamento de usuários.
├── /test                 # Testes automatizados da aplicação.
├── .eslintrc.js         # Configurações do ESLint para linting do código.
├── .gitignore           # Arquivo que especifica quais arquivos ou pastas devem ser ignorados pelo Git.
├── .prettierrc          # Configurações do Prettier para formatação de código.
├── nest-cli.json        # Configurações do Nest CLI.
├── package.json         # Informações do projeto e dependências.
├── package-lock.json    # Lockfile do npm que garante a instalação das dependências corretas.
└── tsconfig.json        # Configurações do TypeScript.
```

### Descrição das Pastas

- **`/dist`**: Este diretório é gerado após a compilação do código TypeScript e contém os arquivos JavaScript que podem ser executados.
- **`/node_modules`**: Contém todas as dependências e pacotes instalados através do npm.
- **`/src`**: A pasta principal onde reside o código-fonte do projeto, dividido em módulos para organização.
  - **`/puppeteer`**: Inclui o controlador e o serviço para realizar operações de scraping utilizando o Puppeteer.
  - **`/user`**: Contém o controlador e o serviço para o gerenciamento de usuários.
- **`/test`**: Contém os arquivos de teste automatizados que garantem a funcionalidade do serviço.
- **Arquivos de configuração**: Incluem configurações para linting, formatação, dependências e a CLI do Nest.

## Instruções de Deploy

1. **Clone o repositório**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA>
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configurar o MongoDB**: 
   Certifique-se de que o MongoDB está em execução e configure a conexão no arquivo `app.module.ts` com a URI correta.

4. **Iniciar a aplicação**:
   ```bash
   npm run start
   ```

5. **Executar os testes**:
   ```bash
   npm run test
   ```

## Requisições

### Rota de Scraping
- **GET** `/scrape/most-expensive-product`: Retorna o produto mais caro e o produto mais barato da página de produtos.

### Rota de Usuários
- **POST** `/users`: Cria um novo usuário.

### Exemplo de Uso

Para realizar o scraping e obter o produto mais caro, você pode fazer uma requisição GET para:

```
http://localhost:3000/scrape/most-expensive-product
```

E para criar um novo usuário, você pode enviar um objeto JSON com os dados do usuário para:

```
POST http://localhost:3000/users
```

```json
{
  "name": "Nome do Usuário",
  "price": 19.99
}
```

## Observações
- Para que o scraping funcione corretamente, o Puppeteer deve ter acesso ao navegador. Certifique-se de que as configurações do seu ambiente permitem isso.
- Este projeto está em desenvolvimento e pode haver mudanças em suas funcionalidades.
