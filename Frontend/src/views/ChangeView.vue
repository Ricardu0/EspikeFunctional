<template>
  <div>
    <TextButton>Gostaria de trocar os dados?</TextButton><br> <br>
    <h1>Coloque suas informações atualizadas! :)</h1> <br>
    <BotaoInput v-model="user.name" input-placeholder="Nome"></BotaoInput> <br>
    <BotaoInput v-model="user.email" input-placeholder="Email" disabled></BotaoInput> <br>
    <BotaoInput v-model="user.phone" input-placeholder="Telefone" v-mask="'(##) #####-####'"></BotaoInput> <br>
    <BotaoInput v-model="user.password" input-placeholder="Senha" inputType="password"></BotaoInput> <br>
    <BotaoInput v-model="confirmPassword" input-placeholder="Confirmar Senha" inputType="password"></BotaoInput> <br>
    <br>
    <BotaoRedondo @click="updateUser">Trocar</BotaoRedondo>
    <br>
    <br>
    <BotaoRedondo @click="confirmDelete">Remover Conta</BotaoRedondo>
    <br>
    <br>
    <BackButton></BackButton>
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import BotaoInput from "@/components/BotaoInput.vue";
import BotaoRedondo from "@/components/BotaoRedondo.vue";
import TextButton from "@/components/TextButton.vue";
import axios from "axios";
import { mask } from 'vue-the-mask';

export default {
  components: { TextButton, BotaoInput, BotaoRedondo, BackButton },
  data() {
    return {
      user: {
        name: "",
        email: "",
        phone: "",
        password: ""
      },
      confirmPassword: ""
    };
  },
  directives: { mask },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.user = {
          ...response.data,
          password: ""
        };
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    async updateUser() {
      if (this.user.password !== this.confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }
      const token = localStorage.getItem("token");
      try {
        await axios.put("http://localhost:8080/api/users/me", this.user, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert("Dados atualizados com sucesso!");
      } catch (error) {
        console.error("Error updating user data:", error);
        alert("Erro ao atualizar os dados.");
      }
    },
    confirmDelete() {
      if (confirm("Tem certeza de que deseja remover sua conta?")) {
        this.deleteUser();
      }
    },
    async deleteUser() {
      const token = localStorage.getItem("token");
      try {
        await axios.delete("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert("Conta removida com sucesso!");
        localStorage.removeItem("token");
        this.$router.push("/login");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Erro ao remover a conta.");
      }
    }
  }
};
</script>

<style scoped>
div {
  opacity: 0; /* Inicia com a div invisível */
  animation: fadeIn 0.5s ease-in forwards; /* Animação para tornar a div visível */
}

@keyframes fadeIn {
  to {
    opacity: 1; /* Faz a div se tornar completamente visível ao final da animação */
  }
}
</style>
