<template>
  <transition name="fade">
    <div class="about">
      <br>
      <h2 class="istok-web-regular">Insira os seus dados <br>
        nos campos abaixo:</h2>
      <br>
      <BotaoInput input-placeholder="    Nome"></BotaoInput>
      <br>
      <BotaoInput input-placeholder="    Sobrenome"></BotaoInput>
      <br>
      <BotaoInput input-placeholder="    Telefone"></BotaoInput>
      <br>
      <BotaoInput input-placeholder="     CPF"></BotaoInput>
      <br>
      <BotaoInput input-placeholder="     Senha"></BotaoInput>
      <br>
      <label for="termos-de-uso">
        <input type="checkbox" id="termos-de-uso" v-model="aceitouTermos">
        Aceito os termos de uso
      </label>
      <br>
      <BotaoRedondo :disabled="!aceitouTermos">Avançar</BotaoRedondo>
      <back-button></back-button>
      <footer>
        <h4>© 2024 - Todos os direitos reservados</h4>
      </footer>
    </div>
  </transition>
</template>

<script>
import BotaoInput from '@/components/BotaoInput.vue';
import BotaoRedondo from '@/components/BotaoRedondo.vue';
import BackButton from "@/components/BackButton.vue";

export default {
  name: 'Cadastro', // Nome da view (opcional, mas recomendado)
  components: {
    BackButton,
    BotaoRedondo,
    BotaoInput,
  },
  data() {
    return {
      aceitouTermos: false, // Inicialmente desmarcado
    };
  }
};
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  width: 100%;
  opacity: 0; /* Inicia com a div invisível */
  animation: fadeIn 0.5s ease-in forwards; /* Animação para tornar a div visível */
}

@keyframes fadeIn {
  to {
    opacity: 1; /* Faz a div se tornar completamente visível ao final da animação */
  }
}

.about h1 {
  color: #000000;
  font-size: 36px;
  margin-bottom: 16px;
  text-align: center;
  width: 100%;
}

.custom-button {
  margin-top: 20px;
  background-color: #ffffff; /* Cor do botão */
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-button:hover {
  background-color: #f8f8f8; /* Cor do botão ao passar o mouse */
}
</style>
