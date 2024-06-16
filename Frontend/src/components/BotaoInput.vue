<template>
  <div>
    <input
      :type="inputType"
      :placeholder="inputPlaceholder"
      class="rounded-input"
      v-model="inputValue"
      @input="$emit('update:modelValue', inputValue)"
    />
  </div>
</template>

<script>
export default {
  props: {
    inputPlaceholder: {
      type: String,
      default: 'Digite aqui'
    },
    modelValue: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      inputValue: this.modelValue
    };
  },
  watch: {
    modelValue(newValue) {
      this.inputValue = newValue;
    }
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
