<template>
  <div>
    <input
      id="my-input"
      type="text"
      :placeholder="inputPlaceholder"
      class="rounded-input"
      v-model="inputValue"
    />
  </div>
</template>

<script>
export default {
  props: {
    inputPlaceholder: {
      type: String,
      default: 'Digite aqui' // Texto padrão para o placeholder
    }
  },
  data() {
    return {
      inputValue: '' // Aqui você pode usar o valor recebido do HTML
    };
  }
};
</script>

<style scoped>
.rounded-input {
  background-color: rgb(228, 228, 228);
  width: 100%;
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 80px;
  font-size: 20px;
}
</style>
