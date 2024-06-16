<template>
  <transition name="fade">
    <div class="login">
      <div flex="true" align="Center">
        <div align="center">
          <br>
          <h1 class="istok-web-regular">Seja bem vindo de volta!</h1>
          <br>
          <BotaoInput v-model="email" inputPlaceholder="     Email"></BotaoInput>
          <br>
          <BotaoInput v-model="password" inputPlaceholder="     Senha" inputType="password"></BotaoInput>
          <br>
          <br>
          <BotaoRedondo @click="login"> ‎ Entrar ‎ </BotaoRedondo>
        </div>
        <br>
        <br>
        <back-button></back-button>
        <br>
        <footer>
          <h4>© 2024 - Todos os direitos reservados</h4>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import BotaoInput from '@/components/BotaoInput.vue';
import BotaoRedondo from '@/components/BotaoRedondo.vue';
import TextoNormal from '@/components/NormalText.vue';

export default {
  name: 'LoginView',
  components: {
    BackButton,
    TextoNormal,
    BotaoInput,
    BotaoRedondo,
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        this.$router.push('/Mapa');
      } else {
        alert('Login failed.');
      }
    }
  }
};
</script>

<style scoped>
.login {
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

.flex {
  display: flex;
  flex-direction: column; /* Alinhar verticalmente */
  justify-content: center; /* Centralizar na vertical */
  align-items: center; /* Centralizar na horizontal */
}
</style>
