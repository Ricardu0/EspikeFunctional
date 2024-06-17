# Projeto E-Spike

## Seja bem-vindo à documentação do Projeto E-Spike!

Uma iniciativa de um projeto de aplicação Web, onde o foco é na segurança por navegação em mapas. Nesta primeira versão, temos o login com autenticação, atualização dos dados do usuário, a integração completa com a API do Google Maps, além de recursos como sistema de Alertas e Ocorrências.

## Como instalar a aplicação?

### Passo 1: Configurando o PostgreSQL no Docker

Primeiro, vamos configurar o Docker para o nosso banco de dados PostgreSQL.
Siga as instruções para instalar o Docker Desktop e o Docker Compose na sua máquina:

- [Docker Desktop](https://docs.docker.com/desktop/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker Compose Migrate](https://docs.docker.com/compose/migrate/)

Depois de instalado, clone o repositório do projeto na sua máquina utilizando o Git Bash no Windows ou o próprio command line no Linux (git deve estar instalado):

```
bash
git clone https://github.com/KelvynHesley/E-spike.git
```

Depois de clonado, navegue até a pasta do projeto:

```
bash
cd <caminho_da_sua_máquina>/E-spike-main/Docker/PostgreSQL
```

Dentro da pasta está o arquivo docker-compose.yml, utilize o comando:

```
bash
docker compose up -d
```

para compilar o docker-compose.yml e gerar o container no Docker. Digite o comando:
```
bash
docker container ls
```
para verificar o nome do container. Depois, abra o terminal do seu container utilizando o comando:
```
bash
docker exec -it <nome_do_container> /bin/bash
```
Ou abra o Docker Desktop, verifique o container rodando, clique nele e vá em "Exec".

No terminal do container, digite o seguinte comando para criar a pasta backup dentro do container:
```
bash
mkdir /backup
```
Depois, saia do terminal do container e copie o arquivo espike.sql dentro da pasta Docker/PostgreSQL para dentro do container com o comando:
```
bash
docker cp <caminho_da_sua_máquina>/E-spike-main/Docker/PostgreSQL/espike.sql <nome_do_container>:/backup
```
Feito isso, entre novamente no terminal do container e digite o seguinte comando para restaurar todas as tabelas e configurações do nosso banco de dados PostgreSQL:
```
bash
pg_restore -U postgres -d espike -v /backup/espike.sql
```
Feito isso, você tem o Banco de dados rodando no container do Docker na porta localhost:5432 e está pronto para o próximo passo.
### Passo 2: Configurando o Backend

Certifique-se de que o Java está instalado em seu sistema. Nossa aplicação utiliza o Java 21. Depois, abra a pasta da aplicação no terminal utilizando o comando:
```
bash
cd <caminho_da_sua_máquina>/E-spike-main/Backend/target
```
Depois, digite:
```
bash
java -jar espike-0.0.1-SNAPSHOT.jar
```
para iniciar a aplicação com o Java Spring direto do terminal.
Caso prefira, você também pode iniciar o Backend utilizando uma IDE e executando direto no código fonte dentro da pasta E-spike-main/Backend.

Feito isso, você terá o Backend rodando e poderá seguir para o próximo passo.

### Passo 3: Configurando o Frontend:

A nossa aplicação utiliza o Vue.js para o Frontend, por isso, você deve ter o Vue.js com npm instalado na sua máquina seguindo os passos do link abaixo:

[    Vue.js Quick Start Guide
](https://vuejs.org/guide/quick-start.html)

Depois, adquira uma chave de API do Google Maps no link abaixo:

[    Google Maps API](https://mapsplatform.google.com/maps-products/#maps-section)

com as seguintes extensões:

    Map Tiles
    Map Elevation
    Maps Embed
    Maps JavaScript
    Maps SDK for Android
    Maps SDK for iOS
    Maps Static
    Street View Publish
    Street View Static API
    Address Validation
    Geocoding
    Geolocation
    Places (new)
    Places
    Time Zone
    Directions
    Distance Matrix
    Roads

Quando gerar a sua chave API do Google Maps, navegue até a página do projeto E-spike-main/Frontend/src/views e abra o arquivo MapView.vue com um editor de texto. Na linha 120, substitua YOUR_API_KEY pela sua chave gerada:
```
javascript
googleMapsApiKey: "YOUR_API_KEY"
```

Depois disso, abra o terminal na pasta da aplicação utilizando:
```
bash
cd <caminho_da_sua_máquina>/E-spike-main/Frontend
```
Com o Vue.js e o npm já configurados em sua máquina, digite o comando:
```
bash
npm install
```
Caso ele não funcione, tente com:
```
bash
npm install --force
```
para instalar todas as dependências do projeto Vue. Se não funcionar, verifique se a pasta node_modules está presente dentro da pasta E-spike-main/Frontend, apague-a e tente novamente.

Feito isso, utilize:
```
bash
npm run dev
```
para rodar o Frontend na porta localhost:5173.

Para uma melhor experiência visual, redimensione a janela para o formato Mobile na vertical.

Se tudo estiver correto, você terá a aplicação completa rodando em seu sistema! Navegue entre as funções utilizando o Frontend.
