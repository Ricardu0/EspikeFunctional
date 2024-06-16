<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentação do Projeto E-Spike</title>
</head>
<body>
    <h1>Projeto E-Spike</h1>

    <h2>Seja bem-vindo à documentação do Projeto E-Spike!</h2>
    <p>Uma iniciativa de um projeto de aplicação Web, onde o foco é na segurança por navegação em mapas. Nesta primeira versão, temos o login com autenticação, atualização dos dados do usuário, a integração completa com a API do Google Maps, além de recursos como sistema de Alertas e Ocorrências.</p>

    <h2>Como instalar a aplicação?</h2>

    <h3>Passo 1: Configurando o PostgreSQL no Docker</h3>
    <p>Primeiro, vamos configurar o Docker para o nosso banco de dados PostgreSQL.</p>
    <p>Siga as instruções para instalar o Docker Desktop e o Docker Compose na sua máquina:</p>
    <ul>
        <li><a href="https://docs.docker.com/desktop/" target="_blank">Docker Desktop</a></li>
        <li><a href="https://docs.docker.com/compose/" target="_blank">Docker Compose</a></li>
        <li><a href="https://docs.docker.com/compose/migrate/" target="_blank">Docker Compose Migrate</a></li>
    </ul>

    <p>Depois de instalado, clone o repositório do projeto na sua máquina utilizando o Git Bash no Windows ou o próprio command line no Linux (git deve estar instalado):</p>
    <pre><code>git clone https://github.com/KelvynHesley/E-spike.git</code></pre>

    <p>Depois de clonado, navegue até a pasta do projeto:</p>
    <pre><code>cd &lt;caminho_da_sua_máquina&gt;/E-spike-main/Docker/PostgreSQL</code></pre>

    <p>Dentro da pasta está o arquivo <code>docker-compose.yml</code>, utilize o comando:</p>
    <pre><code>docker compose up -d</code></pre>

    <p>para compilar o <code>docker-compose.yml</code> e gerar o container no Docker. Digite o comando:</p>
    <pre><code>docker container ls</code></pre>

    <p>para verificar o nome do container. Depois, abra o terminal do seu container utilizando o comando:</p>
    <pre><code>docker exec -it &lt;nome_do_container&gt; /bin/bash</code></pre>

    <p>Ou abra o Docker Desktop, verifique o container rodando, clique nele e vá em "Exec".</p>

    <p>No terminal do container, digite o seguinte comando para criar a pasta backup dentro do container:</p>
    <pre><code>mkdir /backup</code></pre>

    <p>Depois, saia do terminal do container e copie o arquivo <code>espike.sql</code> dentro da pasta Docker/PostgreSQL para dentro do container com o comando:</p>
    <pre><code>docker cp &lt;caminho_da_sua_máquina&gt;/E-spike-main/Docker/PostgreSQL/espike.sql &lt;nome_do_container&gt;:/backup</code></pre>

    <p>Feito isso, entre novamente no terminal do container e digite o seguinte comando para restaurar todas as tabelas e configurações do nosso banco de dados PostgreSQL:</p>
    <pre><code>pg_restore -U postgres -d espike -v /backup/espike.sql</code></pre>

    <p>Feito isso, você tem o Banco de dados rodando no container do Docker na porta <code>localhost:5432</code> e está pronto para o próximo passo.</p>

    <h3>Passo 2: Configurando o Backend</h3>
    <p>Certifique-se de que o Java está instalado em seu sistema. Nossa aplicação utiliza o Java 21. Depois, abra a pasta da aplicação no terminal utilizando o comando:</p>
    <pre><code>cd &lt;caminho_da_sua_máquina&gt;/E-spike-main/Backend/target</code></pre>

    <p>Depois, digite:</p>
    <pre><code>java -jar espike-0.0.1-SNAPSHOT.jar</code></pre>

    <p>para iniciar a aplicação com o Java Spring direto do terminal.</p>

    <p>Caso prefira, você também pode iniciar o Backend utilizando uma IDE e executando direto no código fonte dentro da pasta <code>E-spike-main/Backend</code>.</p>

    <p>Feito isso, você terá o Backend rodando e poderá seguir para o próximo passo.</p>

    <h3>Passo 3: Configurando o Frontend</h3>
    <p>A nossa aplicação utiliza o Vue.js para o Frontend, por isso, você deve ter o Vue.js instalado na sua máquina seguindo os passos do link abaixo:</p>
    <ul>
        <li><a href="https://vuejs.org/guide/quick-start.html" target="_blank">Vue.js Quick Start Guide</a></li>
    </ul>

    <p>Depois, adquira uma chave de API do Google Maps no link abaixo:</p>
    <ul>
        <li><a href="https://mapsplatform.google.com/maps-products/#maps-section" target="_blank">Google Maps API</a></li>
    </ul>

    <p>com as seguintes extensões:</p>
    <ul>
        <li>Map Tiles</li>
        <li>Map Elevation</li>
        <li>Maps Embed</li>
        <li>Maps JavaScript</li>
        <li>Maps SDK for Android</li>
        <li>Maps SDK for iOS</li>
        <li>Maps Static</li>
        <li>Street View Publish</li>
        <li>Street View Static API</li>
        <li>Address Validation</li>
        <li>Geocoding</li>
        <li>Geolocation</li>
        <li>Places (new)</li>
        <li>Places</li>
        <li>Time Zone</li>
        <li>Directions</li>
        <li>Distance Matrix</li>
        <li>Roads</li>
    </ul>

    <p>Quando gerar a sua chave API do Google Maps, navegue até a página do projeto <code>E-spike-main/Frontend/src/views</code> e abra o arquivo <code>MapView.vue</code> com um editor de texto. Na linha 120, substitua <code>YOUR_API_KEY</code> pela sua chave gerada:</p>
    <pre><code>googleMapsApiKey: "YOUR_API_KEY"</code></pre>

    <p>Depois disso, abra o terminal na pasta da aplicação utilizando:</p>
    <pre><code>cd &lt;caminho_da_sua_máquina&gt;/E-spike-main/Frontend</code></pre>

    <p>Com o Vue.js e o npm já configurados em sua máquina, digite o comando:</p>
    <pre><code>npm install</code></pre>

    <p>Caso ele não funcione, tente com:</p>
    <pre><code>npm install --force</code></pre>

    <p>para instalar todas as dependências do projeto Vue. Se não funcionar, verifique se a pasta <code>node_modules</code> está presente dentro da pasta <code>E-spike-main/Frontend</code>, apague-a e tente novamente.</p>

    <p>Feito isso, utilize:</p>
    <pre><code>npm run dev</code></pre>

    <p>para rodar o Frontend na porta <code>localhost:5173</code>.</p>

    <p>Se tudo estiver correto, você terá a aplicação completa rodando em seu sistema! Navegue entre as funções utilizando o Frontend.</p>
</body>
</html>

