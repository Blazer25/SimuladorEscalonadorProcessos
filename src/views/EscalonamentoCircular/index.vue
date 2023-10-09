<template>
  <div class="container">
    <div class="logo">
      <h1 class="titulo-titulo-escalonador">O Escalonador de Processos :)</h1>
    </div>

    <div class="informacoes">
      <div class="w-65">
        <div v-if="!trocarInputs">
          <div class="input-registrar">
            <label>Qual o valor do Quantum?</label>
            <input
              type="text"
              v-model="quantum"
              placeholder="Digite aqui o valor..."
            />
          </div>
          <div class="input-registrar">
            <label>Quantos processos gostaria de operar?</label>
            <input
              type="text"
              v-model="quantidadeProcessos"
              placeholder="Digite aqui o valor..."
            />
          </div>

          <BotaoPadrao
            class="botao"
            :texto="'Continuar'"
            @click:botaoPadrao="inserirDadosProcessos"
            :disabled="verificaSePodeInserirDadosIniciais"
          />
        </div>

        <div v-if="trocarInputs">
          <div class="input-registrar">
            <label>Nome do {{ alterarProcesso + 1 }}° processo</label>
            <input
              type="text"
              v-model="processos[alterarProcesso].nomeExibicao"
              placeholder="Digite aqui o nome..."
            />
          </div>
          <div class="input-registrar">
            <label>Seu tempo de execução:</label>
            <input
              type="text"
              v-model="processos[alterarProcesso].execucaoFixa"
              placeholder="Digite aqui o valor..."
            />
          </div>

          <div class="w-100 d-flex justify-content-around">
            <BotaoPadrao
              class="botao bg-cinza"
              :texto="'Voltar'"
              @click:botaoPadrao="processoAnterior"
            />
            <BotaoPadrao
              class="botao"
              :texto="
                quantidadeProcessos == 1
                  ? 'Executar Escalonamento'
                  : alterarProcesso + 1 == quantidadeProcessos
                  ? 'Executar Escalonamento'
                  : 'Próximo Processo'
              "
              @click:botaoPadrao="verificarEnviar"
              :disabled="verificaSePodeContinuarEscalonamento"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-if="modal.escalonamento">
      <ModalPadrao
        v-if="modal.escalonamento"
        @fechar-modal="encerrarProcessamento"
      >
        <p class="tituloProcessamento">PROCESSAMENTO</p>
        <br />

        <div>
          <ul>
            <li v-for="(mensagem, index) in mensagensExibir" :key="index">
              <p class="textoComum">{{ mensagem }}</p>
              <br />
            </li>

            <div v-if="mensagensFinais.tempoFinal">
              <br />
              <p class="subTitulo">Total de processamento:</p>
              <p class="textoComum">
                {{ mensagensFinais.tempoFinal }} segundo(s)
              </p>
              <br />
            </div>

            <div v-if="mensagensFinais.turnaround">
              <br />
              <p class="subTitulo">Total de Turnaround:</p>
              <p
                class="textoComum"
                v-for="(
                  mensagemTurnaround, index
                ) in mensagensFinais.turnaround"
                :key="index"
              >
                {{ mensagemTurnaround }}
              </p>
              <br />
            </div>

            <div v-if="mensagensFinais.TME">
              <p class="subTitulo">Tempo médio de espera:</p>
              <p class="textoComum">{{ mensagensFinais.TME }} segundo(s)</p>
              <br />
            </div>

            <div v-if="mensagensFinais.TMR">
              <br />
              <p class="subTitulo">Tempo médio de retorno:</p>
              <p class="textoComum">{{ mensagensFinais.TMR }} segundo(s)</p>
              <br />
            </div>

            <div v-if="mensagensFinais.tempoEsperaCadaProcesso">
              <br />
              <p class="subTitulo">Tempos de espera de cada processo:</p>
              <p
                class="textoComum"
                v-for="(
                  mensagemTempoEsperaCadaProcesso, index
                ) in mensagensFinais.tempoEsperaCadaProcesso"
                :key="index"
              >
                {{ mensagemTempoEsperaCadaProcesso }}
              </p>
              <br />
            </div>
          </ul>
        </div>

        <div class="mt-1">
          <BotaoPadrao
            class="mr-0p5 bg-cinza"
            :texto="'Encerrar processamento...'"
            @click="encerrarProcessamento"
          />
        </div>
      </ModalPadrao>
    </div>
  </div>
</template>

<script>
export default {
  name: "EscalonamentoCircular",

  data() {
    return {
      modal: {
        escalonamento: false,
      },

      tempos: {
        final: 0,
        TMR: 0,
        TME: 0,
      },

      quantum: null,
      processos: [],
      quantidadeProcessos: null,

      trocarInputs: false,
      alterarProcesso: 0,

      mensagensExibir: [],

      mensagensFinais: {
        turnaround: null,
        TME: null,
        tempoEsperaCadaProcesso: null,
        TMR: null,
        tempoFinal: null,
      },
    };
  },

  computed: {
    verificaSePodeContinuarEscalonamento() {
      const regex = /[^0-9]/;
      return (
        !this.processos[this.alterarProcesso].execucaoFixa ||
        this.processos[this.alterarProcesso].execucaoFixa <= 0 ||
        regex.test(this.processos[this.alterarProcesso].execucaoFixa) ||
        !this.processos[this.alterarProcesso].nomeExibicao
      );
    },

    verificaSePodeInserirDadosIniciais() {
      const regex = /[^0-9]/;
      return (
        !this.quantum ||
        this.quantum <= 0 ||
        regex.test(this.quantum) ||
        !this.quantidadeProcessos ||
        this.quantidadeProcessos <= 0 ||
        regex.test(this.quantidadeProcessos)
      );
    },
  },

  methods: {
    inserirDadosProcessos() {
      this.construirCapaProcessos();
      this.alterarProcesso = 0;
      this.trocarInputs = true;
    },

    verificarEnviar() {
      const quantidadeProcessos = Number(this.quantidadeProcessos);

      this.alterarProcesso === quantidadeProcessos - 1
        ? this.realizarProcessamento()
        : this.proximoProcesso();
    },

    proximoProcesso() {
      this.alterarProcesso++;
    },
    processoAnterior() {
      if (this.alterarProcesso === 0) {
        this.trocarInputs = false;
        return;
      }
      this.alterarProcesso--;
      this.trocarInputs = true;
    },

    serializarProcessamentos() {
      for (let processo = 0; processo < this.processos.length; processo++) {
        this.processos[
          processo
        ].nome = `${this.processos[processo].nome} - ${this.processos[processo].nomeExibicao}`;
        this.processos[processo].execucao = Number(
          this.processos[processo].execucaoFixa
        );
        this.processos[processo].execucaoFixa = Number(
          this.processos[processo].execucaoFixa
        );
      }
    },

    async realizarProcessamento() {
      this.serializarProcessamentos();
      this.modal.escalonamento = true;
      await this.escalonadorCircular();
      this.calcularTempos();
    },

    encerrarProcessamento() {
      window.location.reload();
    },

    construirCapaProcessos() {
      const quantidadeProcessos = Number(this.quantidadeProcessos);

      for (let i = 0; i < quantidadeProcessos; i++) {
        this.processos.push({
          nome: `P${i + 1}`,
          nomeExibicao: "",
          criacao: 0,
          final: 0,
          execucaoFixa: null,
          execucao: 0,
          turnaround: 0,
          TEP: 0,
          espera: 0,
        });
      }
    },

    async executarProcesso(processo) {
      return await new Promise((resolve) => {
        const tempoExecutado =
          processo.execucao <= this.quantum
            ? Number(processo.execucao)
            : Number(this.quantum);

        if (!tempoExecutado || tempoExecutado <= 0) {
          console.log("Tempo de execução não pode ser zero ou menor que zero!");
          return null;
        }

        processo.execucao -= tempoExecutado;
        this.tempos.final += tempoExecutado;
        processo.final = this.tempos.final;

        const segundo =
          tempoExecutado === 0 || tempoExecutado === 1 ? "segundo" : "segundos";

        this.mensagensExibir.push(
          `Executando ${processo.nome} por ${tempoExecutado.toFixed(
            2
          )} ${segundo}. Tempo atual: ${this.tempos.final.toFixed(2)}`
        );

        setTimeout(() => resolve(), tempoExecutado * 1000);
      });
    },

    manterUltimaOcorrencia(arr) {
      const indices = {};

      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        indices[item.nome] = i;
      }

      const resultados = Object.values(indices).map((index) => arr[index]);

      return resultados;
    },

    async escalonadorCircular() {
      for (const processo of this.processos) {
        await this.executarProcesso(processo);
        if (processo.execucao > 0) {
          this.processos.push(processo);
        }
      }

      const resultado = this.manterUltimaOcorrencia([...this.processos]);
      this.processos.length = 0;
      // this.processos = [{}];
      this.processos.push(...resultado);
    },

    calcularTempos() {
      const quantidadeProcessos = this.processos.length;
      for (const processo of this.processos) {
        processo.TEP =
          processo.final - processo.criacao - processo.execucaoFixa;
        processo.turnaround = processo.final - processo.criacao;
        processo.espera = processo.turnaround - processo.execucaoFixa;
      }
      const totalTurnaround = this.processos.reduce((acumulador, processo) => {
        return acumulador + processo.turnaround;
      }, 0);
      this.tempos.TMR = totalTurnaround / quantidadeProcessos;

      const totalTempoMediaEspera = this.processos.reduce(
        (acumulador, processo) => {
          return acumulador + processo.TEP;
        },
        0
      );
      this.tempos.TME = totalTempoMediaEspera / quantidadeProcessos;
      const tempoEsperaCadaProcesso = [];
      for (const processo of this.processos) {
        tempoEsperaCadaProcesso.push(
          `${processo.nome} - Tempo: ${processo.espera} segundo(s)`
        );
      }

      const tempoTurnaroundCadaProcesso = [];
      for (const processo of this.processos) {
        tempoTurnaroundCadaProcesso.push(
          `${processo.nome} - Tempo: ${processo.turnaround} segundo(s)`
        );
      }

      this.mensagensFinais.tempoEsperaCadaProcesso = tempoEsperaCadaProcesso;

      this.mensagensFinais.turnaround = tempoTurnaroundCadaProcesso;

      this.mensagensFinais.tempoFinal = `${this.tempos.final}`;
      this.mensagensFinais.TME = this.tempos.TME;
      this.mensagensFinais.TMR = this.tempos.TMR;
    },
  },

  watch: {},
};
</script>

<style lang="scss" scoped src="./styles.scss" />
