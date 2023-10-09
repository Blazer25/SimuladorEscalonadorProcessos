import BotaoPadrao from "./BotaoPadrao/index.vue";
import ModalPadrao from "./ModalPadrao/index.vue";
import InputPadrao from "./InputPadrao/index.vue";

export default {
  install(app) {
    app.component("BotaoPadrao", BotaoPadrao);
    app.component("ModalPadrao", ModalPadrao);
    app.component("InputPadrao", InputPadrao);
  },
};
