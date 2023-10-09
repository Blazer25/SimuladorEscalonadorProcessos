<template>
  <div class="inputPadrao">
    <label :for="id" v-if="descricao" class="inputPadrao__descricao">
      {{ descricao }}
    </label>

    <input
      :id="id"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="atualizaInput"
      class="inputPadrao__input"
      :class="[
        inputClasses,
        { 'inputPadrao__input--error': error },
        { inputPadrao__disabled: disabled },
        { 'inputPadrao__input--info': info && !error },
      ]"
    />

    <span class="inputPadrao__error" v-if="error">{{ error }}</span>
    <span class="inputPadrao__info" v-if="info && !error">{{ info }}</span>
  </div>
</template>

<script>
export default {
  name: "inputPadrao",

  data() {
    return {};
  },

  props: {
    id: {
      type: String,
      required: false,
    },

    type: {
      type: String,
      required: false,
      default: "text",
    },

    value: {
      type: [String, Number],
      default: "",
    },

    placeholder: {
      type: String,
      required: false,
      default: "",
    },

    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },

    descricao: {
      type: String,
      required: false,
    },

    inputClasses: {
      type: Array,
      required: false,
    },

    error: {
      type: String,
      required: false,
      default: "",
    },

    info: {
      type: String,
      required: false,
      default: "",
    },
  },

  methods: {
    atualizaInput(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
