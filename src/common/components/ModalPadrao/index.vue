<template>
  <transition name="modal-fade">
    <div class="modal-overlay">
      <div class="modal">
        <slot />
      </div>
      <div class="fechar" @click="fecharModal" v-if="botaoFechar">
        <img
          class="close-img"
          src="../../../assets/images/icones/close-icon.svg"
          alt="Botão de fechar"
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalPadrao",

  data() {
    return {};
  },

  props: {
    botaoFechar: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  methods: {
    fecharModal() {
      this.$emit("fechar-modal");
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
