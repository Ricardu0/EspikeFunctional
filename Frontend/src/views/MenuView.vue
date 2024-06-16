<template>
  <br>
  <br>
  <div>
    <TextButton class="text-left"> ‎ ‎ ‎ ‎ ‎ MENU ‎ ‎ ‎ ‎ ‎</TextButton>
    <P></P>
    <br>
    <br>
    <GrayTextButton class="text-left" rotaBtn="/About"> ‎ ‎ ‎ ‎ ‎ ‎ Sobre Nos ‎ ‎ ‎ ‎ ‎ ‎</GrayTextButton>
    <br><br>
    <GrayTextButton class="text-left" rotaBtn="/Terms"> Termos de Usuario </GrayTextButton>
    <br><br>
    <GrayTextButton class="text-left" rotaBtn="/Features"> ‎ Funcionalidades ‎ </GrayTextButton>
    <br><br>
    <GrayTextButton rotaBtn="/Change"> Alterar Dados </GrayTextButton>
    <br><br>
    <back-button></back-button>
  </div>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import BotaoRedondo from "@/components/BotaoRedondo.vue";
import GrayTextButton from "@/components/GrayTextButton.vue";
import NormalText from "@/components/NormalText.vue";
import TextButton from "@/components/TextButton.vue";
export default {
  components: {BackButton, TextButton, NormalText, BotaoRedondo, GrayTextButton}
}
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
