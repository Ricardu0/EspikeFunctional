<template>
  <transition name="fade">
    <div class="about">
      <br>
      <h2 class="istok-web-regular">Insira os seus dados <br>
        nos campos abaixo:</h2>
      <br>
      <BotaoInput v-model="user.name" inputPlaceholder="Nome"></BotaoInput>
      <br>
      <BotaoInput v-model="user.email" inputPlaceholder="Email"></BotaoInput>
      <br>
      <BotaoInput v-model="user.phone" inputPlaceholder="Telefone" v-mask="'(##) #####-####'"></BotaoInput>
      <br>
      <BotaoInput v-model="user.cpf" inputPlaceholder="CPF" v-mask="'###.###.###-##'"></BotaoInput>
      <br>
      <BotaoInput v-model="user.password" inputPlaceholder="Senha" inputType="password"></BotaoInput>
      <br>
      <BotaoInput v-model="confirmPassword" inputPlaceholder="Confirmar Senha" inputType="password"></BotaoInput>
      <br>
      <label for="user_type">Tipo de Usuário:</label>
      <br>
      <label>
        <input type="radio" v-model="user.user_type" value="user">
        Usuário
      </label>
      <label>
        <input type="radio" v-model="user.user_type" value="mod">
        Moderador
      </label>
      <br>
      <label for="termos-de-uso">
        <input type="checkbox" id="termos-de-uso" v-model="aceitouTermos">
        Aceito os termos de uso
      </label>
      <br>
      <router-link to="/Terms" class="text-blue-500 hover:text-blue-900 cursor-pointer">
        <h3>Clique aqui para ver os termos</h3>
      </router-link>
      <br>
      <BotaoRedondo :disabled="!aceitouTermos || loading" @click="register">Avançar</BotaoRedondo>
      <back-button></back-button>
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
import { mask } from 'vue-the-mask';

export default {
  name: 'Cadastro',
  components: {
    BackButton,
    BotaoRedondo,
    BotaoInput,
  },
  data() {
    return {
      aceitouTermos: false,
      user: {
        name: '',
        email: '',
        phone: '',
        cpf: '',
        password: '',
        user_type: 'user',
      },
      confirmPassword: '',
      loading: false,
    };
  },
  directives: { mask },
  methods: {
    async register() {
      if (this.loading) return;

      if (!this.user.name || !this.user.email || !this.user.phone || !this.user.cpf || !this.user.password || !this.confirmPassword) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      if (this.user.password !== this.confirmPassword) {
        alert('As senhas não coincidem.');
        return;
      }

      this.loading = true;

      try {
        const response = await fetch('http://localhost:8080/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user),
        });
        if (response.ok) {
          alert('User registered successfully!');
          this.$router.push('/login');
        } else {
          alert('Registration failed.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed.');
      } finally {
        this.loading = false;
      }
    }
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
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.about h2 {
  color: #000000;
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
}

.custom-button {
  margin-top: 20px;
  background-color: #ffffff;
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
  background-color: #f8f8f8;
}
</style>
