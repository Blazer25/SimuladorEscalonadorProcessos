<template>
  <div class="container">
    <div class="logo">
      <h1 class="titulo-titulo-escalonador">O Escalonador de Processos :)</h1>
    </div>

    <div class="informacoes">
      <BotaoPadrao
        class="mb-05 altura-botao"
        :texto="'Escalonamento Circular'"
        @click="redirecionar('escalonamentoCircular')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",

  data() {
    return {};
  },

  methods: {
    redirecionar(pagina) {
      const rotas = {
        escalonamentoCircular: "/escalonamentoCircular",
      };

      const rotaDestino = rotas[pagina];

      if (rotaDestino) {
        this.$router.push(rotaDestino);
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
