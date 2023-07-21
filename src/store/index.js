import { createStore } from 'vuex'

import accountServices from './modules/accountServices'

export default new createStore({
    modules: {
        accountServices,
    }
});
