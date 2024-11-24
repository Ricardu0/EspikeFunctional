<template>
  <div class="menu-container">
    <TextButton class="menu-item text-left">MENU</TextButton>

    <GrayTextButton class="menu-item text-left" rotaBtn="/About">Sobre Nós</GrayTextButton>

    <GrayTextButton class="menu-item text-left" rotaBtn="/Terms">Termos de <br> usuario</GrayTextButton>

    <GrayTextButton class="menu-item text-left" rotaBtn="/Features">Funcionalidades</GrayTextButton>

    <GrayTextButton class="menu-item text-left" rotaBtn="/Change">Alterar Dados</GrayTextButton>

    <back-button class="menu-item"></back-button>
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import BotaoRedondo from "@/components/BotaoRedondo.vue";
import GrayTextButton from "@/components/GrayTextButton.vue";
import NormalText from "@/components/NormalText.vue";
import TextButton from "@/components/TextButton.vue";

export default {
  components: {
    BackButton,
    TextButton,
    NormalText,
    BotaoRedondo,
    GrayTextButton,
  },
};
</script>

<style scoped>
.menu-container {
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

.menu-item {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 0.5rem;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>
