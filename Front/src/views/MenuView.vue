<template>
  <br>
  <br>
  <div>
    <TextButton class="text-left"> ‎ ‎ ‎ ‎ ‎ MENU ‎ ‎ ‎ ‎ ‎</TextButton>
    <P></P>
    <br>
    <br>
    <h1 class="istok-web-regular text-left"> Sobre nós</h1>
    <br><br>
    <h1 class="istok-web-regular text-left"> Informacoes do app</h1>
    <br><br>
    <h1 class="istok-web-regular text-left"> Termos de usuario</h1>
    <br><br>
    <h1 class="istok-web-regular text-left"> Funcionalidades</h1>
    <br><br>
    <back-button></back-button>
  </div>


</template>





<script>
import BotaoRedondo from "@/components/BotaoRedondo.vue";
import NormalText from "@/components/NormalText.vue";
import TextButton from "@/components/TextButton.vue";
import BackButton from "@/components/BackButton.vue";
export default {
  components: {BackButton, TextButton, NormalText, BotaoRedondo}
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