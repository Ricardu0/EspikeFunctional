<template> 
    <div class="text-justified container mx-auto">
        <br> <br> <br> <br> <br>
        <TextButton class="text-left"> ‎ ‎ ‎ ‎ ‎ Termos de Usuario ‎ ‎ ‎ ‎ ‎</TextButton>
        <br>    <br>
      <div v-if="paginaAtual <= paginas.length">
        <p v-for="(paragrafo, idx) in paginas[paginaAtual - 1]" :key="idx">{{ paragrafo }}</p>
      </div>
      <br>
      <div class="paginacao">
        <button @click="paginaAnterior" :disabled="paginaAtual === 1">Anterior</button>
        <button v-for="pagina in totalPaginas" :key="pagina" @click="irParaPagina(pagina)" :class="{ ativo: pagina === paginaAtual }">{{ pagina }}</button>
        <button @click="proximaPagina" :disabled="paginaAtual === totalPaginas">Próxima</button>
      </div>
      <br>
      <BackButton></BackButton>
    </div>
  </template>
  
  <script>
  import BackButton from '@/components/BackButton.vue';
import TextButton from '@/components/TextButton.vue';
  
  export default {
    components: {
      BackButton,TextButton
    },
    data() {
      return {
        paginaAtual: 1,
        paginas: [
          [
            "Aceitação dos Termos: Ao acessar e usar este serviço, você confirma que leu, entendeu e concorda em estar vinculado por estes Termos de Uso.",
            "Alterações nos Termos: Reservamo-nos o direito de modificar estes termos a qualquer momento. Sua decisão de continuar a visitar e usar o serviço após tais alterações constitui sua aceitação das novas condições.",
            "Privacidade e Proteção de Dados Pessoais: Respeitamos a privacidade dos nossos usuários. Qualquer informação pessoal coletada é tratada em conformidade com a LGPD.",
            "Comunicações: Ao criar uma conta conosco, você concorda em receber comunicações eletrônicas de nossa parte, incluindo e-mails, mensagens de texto, chamadas e notificações push.",
            "Uso do Serviço: Você concorda em usar o serviço apenas para fins legais e de maneira que não infrinja os direitos de terceiros ou restrinja o uso do serviço por qualquer terceiro.",
            "",
          ],
          [
            "Conteúdo do Usuário: Você é responsável por todo o conteúdo que transmite ou carrega no serviço e afirma possuir todos os direitos necessários para tal conteúdo.",
            "Conduta do Usuário: Você concorda em não usar o serviço para enviar ou disponibilizar qualquer material que seja ilegal, prejudicial, ameaçador, abusivo, assediante, difamatório, vulgar, obsceno, invasivo da privacidade de outro ou de outra forma censurável.",
            "Direitos Autorais e Propriedade Intelectual: O serviço e seus conteúdos originais, características e funcionalidades são e permanecerão de propriedade exclusiva dos proprietários do serviço e seus licenciadores.",
            "Terminação: Reservamo-nos o direito de encerrar ou suspender seu acesso ao serviço, sem aviso prévio, por qualquer motivo, incluindo violação dos Termos."
          ],
          [
            "Isenção de Garantias: O serviço é fornecido 'como está' e 'conforme disponível' e não garantimos que o serviço será ininterrupto ou livre de erros.",
            "Limitação de Responsabilidade: Em nenhum caso, o serviço ou seus diretores, funcionários ou agentes serão responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais, consequenciais ou punitivos resultantes do seu uso ou incapacidade de usar o serviço.",
            "Lei Aplicável: Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar o conflito de disposições legais.",
            "Alterações: Reservamo-nos o direito de alterar ou substituir estes Termos a qualquer momento. Se uma revisão for material, forneceremos um aviso com pelo menos 30 dias de antecedência antes que os novos termos entrem em vigor.",
            "Contato: Para quaisquer questões ou dúvidas sobre estes Termos, entre em contato conosco, presencialmente."
          ]
        ]
      };
    },
    computed: {
      totalPaginas() {
        return this.paginas.length;
      },
    },
    methods: {
      irParaPagina(pagina) {
        this.paginaAtual = pagina;
      },
      paginaAnterior() {
        if (this.paginaAtual > 1) {
          this.paginaAtual--;
        }
      },
      proximaPagina() {
        if (this.paginaAtual < this.totalPaginas) {
          this.paginaAtual++;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .paginacao {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .paginacao button {
    margin: 0 5px;
    padding: 5px 10px;
  }
  
  .paginacao button.ativo {
    font-weight: bold;
    background-color: #007bff;
    color: white;
  }
  
  .paginacao button:disabled {
    background-color: #ddd;
    color: #aaa;
  }
  </style>
  