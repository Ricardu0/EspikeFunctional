Seja Bem-vindo ao Projeto E-spike!
Passo 1: Configurando o Banco de Dados
O projeto utiliza MongoDB, o que facilita a configuração inicial. Siga os passos abaixo:

Instale o MongoDB Compass através do link oficial:
MongoDB Compass

Após instalar, inicialize o MongoDB Compass.

Crie uma nova conexão com o endereço padrão:
mongodb://localhost:27017

Certifique-se de que a conexão foi criada com sucesso. Mantenha o MongoDB Compass aberto para verificações posteriores.

Passo 2: Configurando Dependências
Após baixar o projeto, acesse a pasta raiz do projeto utilizando o terminal:

bash
Copiar código
cd <caminho_da_sua_máquina>/E-spikeFunctional
Instale as dependências necessárias para o projeto:

bash
Copiar código
npm install
Nota: Caso enfrente problemas durante a instalação, utilize o comando com a flag --force:

bash
Copiar código
npm install --force
Passo 3: Inicializando o Backend
Acesse a pasta BackendJ no terminal:

bash
Copiar código
cd BackendJ
Inicie o backend utilizando o seguinte comando:

bash
Copiar código
node --watch app.js
Verifique o console. Se a mensagem indicar que o servidor está rodando na porta 5174, o backend foi configurado corretamente.

Dica para Solução de Erros
Abra o MongoDB Compass e confirme se a database "MeuBanco" foi criada.
Caso ela não tenha sido criada automaticamente, você pode criá-la manualmente no MongoDB Compass e testar novamente a aplicação.
Passo 4: Inicializando o Frontend
Abra um novo terminal e acesse a pasta Frontend:

bash
Copiar código
cd Frontend
Inicie o servidor de desenvolvimento do frontend com o comando:

bash
Copiar código
npm run dev
O frontend será iniciado na porta localhost:5173. Para uma melhor experiência, ajuste a janela para o formato Mobile (vertical) no navegador.

Pronto! 🚀
Se todos os passos forem seguidos corretamente, o sistema estará funcionando. Agora você pode explorar todas as funcionalidades do E-spike diretamente pelo navegador.
