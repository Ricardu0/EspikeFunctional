<template>
  <transition name="fade">
    <div class="login">
      <div class="flex">
        <div class="login-container">
          <h1 class="istok-web-regular">Seja bem vindo de volta!</h1>
          <p> Coloque seu email e senha abaixo</p>
          <br>
          <form @submit.prevent="login">
            <BotaoInput
                v-model="email"
                inputPlaceholder="Email"
                :error="errors.email">
            </BotaoInput>

            <BotaoInput
                v-model="password"
                inputPlaceholder="Senha"
                inputType="password"
                :error="errors.password">
            </BotaoInput>

            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
            <BotaoRedondo
                type="submit"
                :disabled="isLoading">
              {{ isLoading ? 'Entrando...' : 'Entrar' }}
            </BotaoRedondo>
          </form>
          <br>
          <back-button></back-button>
        </div>
      </div>

      <footer>
        <h4>© 2024 - Todos os direitos reservados</h4>
      </footer>
    </div>
  </transition>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import BotaoInput from '@/components/BotaoInput.vue';
import BotaoRedondo from '@/components/BotaoRedondo.vue';
import {authService} from "@/services/ApiService.js";

export default {
  name: 'LoginView',
  components: {
    BackButton,
    BotaoInput,
    BotaoRedondo,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
      isLoading: false,
      errors: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    validateForm() {
      this.errors = {
        email: '',
        password: ''
      };

      if (!this.email) this.errors.email = 'E-mail é obrigatório';
      if (!this.password) this.errors.password = 'Senha é obrigatória';

      return !this.errors.email && !this.errors.password;
    },
    async login() {
      if (!this.validateForm()) return;

      this.isLoading = true;
      this.errorMessage = '';

      try {
        const response = await authService.login({
          email: this.email,
          password: this.password
        });

        const {token} = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', response.data.userId);
        console.log('Resposta do login:', response.data);

        // Redirecionar para a página do mapa
        this.$router.push('/Mapa');
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais. Erro definido: ' + error;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.login {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

.flex {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.error-message {
  color: red;
  margin: 10px 0;
  font-size: 14px;
}

h1 {
  color: #000000;
  font-size: 36px;
  margin-bottom: 20px;
  text-align: center;
}

footer {
  padding: 20px;
  text-align: center;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>