import { createPinia } from "pinia";

import auth from './auth'

const pinia = createPinia();

pinia.use(auth)

export default pinia;