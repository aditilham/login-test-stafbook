import { createStore } from 'vuex'

import accountServices from './modules/accountServices'
import tradingService from './modules/tradingService';

export default new createStore({
    modules: {
        accountServices,
        tradingService,
    }
});
