import VueTheMask from "vue-the-mask";
import axios from "axios";

export default {
  install(app) {
    app.use(VueTheMask);
    // app.use(axios);

    app.config.globalProperties.$axios = axios;

  },
};
