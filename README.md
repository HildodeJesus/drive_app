# Drive

O objetivo deste app é bem simples, armazenar arquivos em um local externo. No
caso, usamos o S3 para armazenar estes arquivos que poderão ser lidos e baixados
pelo próprio usuário. Este app é bem útil para fixar o aprendizado sobre AWS.
Principalmente, S3 e AWS Lambda.

## Stack utilizada

**Front-end:** ejs

**Back-end:** Node20.11v, Express, MariaDB11.2.2v e AWS

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/HildodeJesus/drive_app.git
```

Entre no diretório do projeto e instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de
ambiente no seu .env

`SECRET_SESSION`

`DATABASE_USER`

`DATABASE_PASSWORD`

`DATABASE_HOST`

`DATABASE_PORT`

`DATABASE_NAME`

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

`S3_BUCKET`

## S3 setup

## Referência

- [Documentação AWS](https://docs.aws.amazon.com/index.html)
- [Trabalhar com URLs pré-assinados](https://docs.aws.amazon.com/pt_br/AmazonS3/latest/userguide/using-presigned-url.html)
- [Direct to S3 file uploads in Node.js](https://devcenter.heroku.com/articles/s3-upload-node)
- [Upload de arquivos para o AmazonS3 diretamente do browser](https://medium.com/@lricoy/upload-de-arquivos-para-o-amazons3-diretamente-do-browser-881d399c3b25)
