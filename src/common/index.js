import components from "./components";
import functions from "./functions";
import plugins from "./plugins";

export default {
  install(app) {
    app.use(components);
    app.use(functions);
    app.use(plugins);
  },
};
