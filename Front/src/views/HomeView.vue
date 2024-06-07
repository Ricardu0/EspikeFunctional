<template>
  <transition name="fade">
    <div class="home">
      <div flex="true" align="Center">
        <h1 class="text-3xl lg:text-4xl border-l-blue-500" active>Seja bem-vindo!</h1>
        <br>
        <br>
        <BotaoRedondo rotaBtn="/Cadastro">Cadastre-se</BotaoRedondo>
        <br>
        <br>
        <BotaoRedondo rotaBtn="/Login"> ‎ ‎ ‎ ‎ ‎ Login ‎ ‎ ‎ ‎  ‎  </BotaoRedondo>
        <br>
        <br>
        <BotaoRedondo rotaBtn="/Moderador">Cliente interno</BotaoRedondo>
        <br>
        <br>
      </div>
      <br>
      <footer>
        <h4>© 2024 - Todos os direitos reservados</h4>
      </footer>
    </div>
  </transition>
</template>

<script>
import BotaoRedondo from '@/components/BotaoRedondo.vue';
import CadastroView from './CadastroView.vue';
import LoginView from './LoginView.vue';
import ModeratorView from './ModeratorView.vue';

export default {
  name: 'HomeView',
  components: {
    BotaoRedondo,
    CadastroView,
    LoginView,
    ModeratorView,
  },
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  opacity: 0; /* Inicia com a div invisível */
  animation: fadeIn 0.5s ease-in forwards; /* Animação para tornar a div visível */
}

@keyframes fadeIn {
  to {
    opacity: 1; /* Faz a div se tornar completamente visível ao final da animação */
  }
}

.body {
  background-color: white;
}

.about h1 {
  color: #000000;
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
}
</style>
