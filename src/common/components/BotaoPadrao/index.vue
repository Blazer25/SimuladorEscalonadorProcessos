<template>
  <button
    :disabled="desabilitado"
    :class="[classesAplicar]"
    @click="lidarClick"
    class="botaoPadrao"
  >
    {{ texto }}
  </button>
</template>

<script>
export default {
  name: "BotaoPadrao",

  data() {
    return {};
  },

  props: {
    desabilitado: {
      type: Boolean,
      required: false,
      default: false,
    },

    texto: {
      type: String,
      required: true,
    },

    classesAplicar: {
      type: Array,
      required: false,
    },
  },

  methods: {
    lidarClick(event) {
      this.$emit("click:botaoPadrao", event);
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
