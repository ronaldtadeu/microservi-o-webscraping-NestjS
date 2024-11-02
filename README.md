
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
microserviço-webscraping-NestjS
├── puppeteer-service             # Serviço de scraping que utiliza o Puppeteer.
│   ├── .eslintrc.js              # Configurações do ESLint para linting do código.
│   ├── .gitignore                # Arquivo que especifica quais arquivos ou pastas devem ser ignorados pelo Git.
│   ├── .prettierrc               # Configurações do Prettier para formatação de código.
│   ├── nest-cli.json             # Configurações do Nest CLI.
│   ├── package.json              # Informações do projeto e dependências.
│   ├── package-lock.json         # Lockfile do npm que garante a instalação das dependências corretas.
│   ├── README.md                 # Documentação do serviço Puppeteer.
│   ├── tsconfig.build.json       # Configurações para build do TypeScript.
│   ├── tsconfig.json             # Configurações do TypeScript.
│   ├── dist                      # Diretório gerado após a compilação do TypeScript.
│   ├── node_modules              # Dependências do projeto instaladas pelo npm.
│   ├── src                       # Código-fonte do serviço.
│   └── test                      # Testes automatizados do serviço.
└── user-service                  # Microserviço para gerenciamento de usuários.
    ├── .eslintrc.js              # Configurações do ESLint para linting do código.
    ├── .gitignore                # Arquivo que especifica quais arquivos ou pastas devem ser ignorados pelo Git.
    ├── .prettierrc               # Configurações do Prettier para formatação de código.
    ├── nest-cli.json             # Configurações do Nest CLI.
    ├── package.json              # Informações do projeto e dependências.
    ├── package-lock.json         # Lockfile do npm que garante a instalação das dependências corretas.
    ├── README.md                 # Documentação do serviço de usuários.
    ├── tsconfig.build.json       # Configurações para build do TypeScript.
    ├── tsconfig.json             # Configurações do TypeScript.
    ├── dist                      # Diretório gerado após a compilação do TypeScript.
    ├── node_modules              # Dependências do projeto instaladas pelo npm.
    ├── src                       # Código-fonte do serviço de usuários.
    └── test                      # Testes automatizados do serviço de usuários.

microserviço-webscraping-NestjS\.gitattributes  # Arquivo que define atributos de controle de versão.
microserviço-webscraping-NestjS\README.md       # Documentação do projeto.
```

### Descrição das Pastas

- **`/puppeteer-service`**: Contém todos os arquivos e pastas relacionados ao serviço de scraping utilizando o Puppeteer.
  - **`/dist`**: Este diretório é gerado após a compilação do código TypeScript e contém os arquivos JavaScript que podem ser executados.
  - **`/node_modules`**: Contém todas as dependências e pacotes instalados através do npm.
  - **`/src`**: A pasta principal onde reside o código-fonte do serviço Puppeteer.
  - **`/test`**: Contém os arquivos de teste automatizados que garantem a funcionalidade do serviço.
  - **`.eslintrc.js`**: Configurações do ESLint para linting do código.
  - **`.gitignore`**: Arquivo que especifica quais arquivos ou pastas devem ser ignorados pelo Git.
  - **`.prettierrc`**: Configurações do Prettier para formatação de código.
  - **`nest-cli.json`**: Configurações do Nest CLI.
  - **`package.json`**: Informações do projeto e dependências.
  - **`package-lock.json`**: Lockfile do npm que garante a instalação das dependências corretas.
  - **`tsconfig.build.json`**: Configurações do TypeScript para a construção do projeto.
  - **`tsconfig.json`**: Configurações do TypeScript.

- **`/user-service`**: Contém todos os arquivos e pastas relacionados ao microserviço de gerenciamento de usuários.
  - **`/dist`**: Este diretório é gerado após a compilação do código TypeScript e contém os arquivos JavaScript que podem ser executados.
  - **`/node_modules`**: Contém todas as dependências e pacotes instalados através do npm.
  - **`/src`**: A pasta principal onde reside o código-fonte do serviço de usuários.
  - **`/test`**: Contém os arquivos de teste automatizados que garantem a funcionalidade do serviço.
  - **`.eslintrc.js`**: Configurações do ESLint para linting do código.
  - **`.gitignore`**: Arquivo que especifica quais arquivos ou pastas devem ser ignorados pelo Git.
  - **`.prettierrc`**: Configurações do Prettier para formatação de código.
  - **`nest-cli.json`**: Configurações do Nest CLI.
  - **`package.json`**: Informações do projeto e dependências.
  - **`package-lock.json`**: Lockfile do npm que garante a instalação das dependências corretas.
  - **`tsconfig.build.json`**: Configurações do TypeScript para a construção do projeto.
  - **`tsconfig.json`**: Configurações do TypeScript.


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
- **GET** `/scrape/product`: Retorna todos os produtos, o mais caro e o mais barato da página de produtos.

### Rota de Usuários
- **POST** `/users`: Cria um novo usuário.

    - **form-data**
```json
{
    "name": "teste",
    "password": "teste"
}
```
    - **response return**
```json
{
    "name": "teste",
    "password": "teste",
    "_id": "67269064413c64e3e64f54cb",
    "__v": 0
}
```

- **GET** `/users/`: Lista os usuários.
    - **form-data**
```json
null
```
    - **response return**
```json
[
    {
        "_id": "67255cb0b132b989883ef7d7",
        "name": "John Doe",
        "password": "securepassword",
        "__v": 0
    },
    {
        "_id": "67269064413c64e3e64f54cb",
        "name": "standard_user",
        "password": "secret_sauce",
        "__v": 0
    }
]
```
- **GET** `/users/:id`: Lista o usuário pelo id.
    - **form-data**
```json
null
```
- - **response return**
```json
    {
        "_id": "67255cb0b132b989883ef7d7",
        "name": "John Doe",
        "password": "securepassword"
    },
```
- **DELETE** `/users/:id`: Exclui o usuário pelo id.
- **PUT** `/users/:id`: Edita o usuário pelo id.
    - **form-data**
```json
{
    "name": "teste1",
    "password": "teste1",
    "__v": 0
}
```
    - **response return**
```json
{
    "name": "teste1",
    "password": "teste1",
    "_id": "67269064413c64e3e64f54cb",
    "__v": 0
}
```

## Observações
- Para que o scraping funcione corretamente, o Puppeteer deve ter acesso ao navegador. Certifique-se de que as configurações do seu ambiente permitem isso.
- Este projeto está em desenvolvimento e pode haver mudanças em suas funcionalidades.
