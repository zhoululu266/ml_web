import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

import { useMain } from "./main";

const store = createPinia();
store.use(piniaPluginPersist);

export default store;

export { useMain };
