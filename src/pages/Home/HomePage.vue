<template>
  <div>
    <Header class="sticky top-0" :class="logoutmodal ? `z-90` : `z-50`" @checkOpenModal="checkLogoutModal()" />
    <div class="p-5 relative">
      <div class="flex flex-col lg:flex-row space-y-5 lg:space-y-0 items-center justify-between py-10">
        <h1 class="font-semibold text-2xl">
          {{ symbols }}
          <span class="font-normal text-sm">
            provided by bytick.com
          </span>
        </h1>
        <div>
          Select
          <select @change="fetchTradingData()" name="" id="" class="border border-gray-400 rounded-lg text-gray-500 px-4" v-model="symbols">
            <option v-for="(sym, index) in exampleData.symbolsList" :key="index" :selected="symbols == sym.symbol" :value="sym.symbol"> {{ sym.symbol }}</option>
          </select>
        </div>
      </div>
      <div class="w-full">
        <div class="bg-white rounded-xl shadow-sm text-sm">
          <div class="overflow-auto">
            <table class="table-auto rounded-3xl w-full">
                <thead class="border-b-2 border-gray-400 text-gray-700 sticky top-0 rounded-3xl bg-white pt-5">
                  <tr>
                    <th class="pb-5 w-36 px-5 text-center border-r border-gray-300">Date</th>
                    <th class="pb-5 w-36 px-5 text-center border-r border-gray-300">Open</th>
                    <th class="pb-5 w-32 px-5 text-center border-r border-gray-300">High</th>
                    <th class="pb-5 w-24 px-5 text-center border-r border-gray-300">Low</th>
                    <th class="pb-5 w-24 px-5 text-center border-r border-gray-300">Close</th>
                    <th class="pb-5 w-28 px-5 text-center border-r border-gray-300">Volume</th>
                    <th class="pb-5 w-28 px-5 text-center border-r border-gray-300">Turn Over</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="tradingDatas == null || tradingDatas.length < 1" class="text-center border-gray-300">
                    <td colspan="12" class="py-5 h-25">
                      <span class="text-base">No Data</span>
                    </td>
                  </tr>
                  <tr v-else v-for="(list, index) in tradingDatas" :key="index" class="border border-gray-300 rounded-3xl text-xs">
                    <td :class="index == 0 ? setBackgroundColor(list[0]) : ``" class="py-5 px-5 text-center border border-gray-300">{{ list[0] ? moment(list[0]/1000).format("YYYY-MM-DD HH:mm:ss") : '-' }}</td>
                    <td :class="index == 0 ? setBackgroundColor(list[0]) : ``" class="py-5 px-5 text-center border border-gray-300">{{ list[1] ? list[1] : '-' }}</td>
                    <td :class="index == 0 ? setBackgroundColor(list[0]) : ``" class="py-5 px-5 text-center border border-gray-300">{{ list[2] ? list[2] : '-' }}</td>
                    <td :class="index == 0 ? setBackgroundColor(list[0]) : ``" class="py-5 px-5 text-center border border-gray-300">{{ list[3] ? list[3] : '-' }}</td>
                    <td :class="index == 0 ? setBackgroundColor(list[0]) : ``" class="py-5 px-5 text-center border border-gray-300">{{ list[4] ? list[4] : '-' }}</td>
                    <td :class="index == 0 ? setBackgroundColor(list[0]) : ``" class="py-5 px-5 text-center border border-gray-300">{{ list[5] ? list[5] : '-' }}</td>
                    <td :class="index == 0 ? setBackgroundColor(list[0]) : ``" class="py-5 px-5 text-center border border-gray-300">{{ list[6] ? list[6] : '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import exampleData from '../../assets/json/exampleData.json'
import Header from '../../components/Header/Header.vue';
export default {
  name: "HomePage",
  components: {
    Header,
  },
  data() {
    return {
      logoutmodal: false,
      symbols: 'BTCUSD',
      tradingDatas: null,
      exampleData,
      intervalId: null,
      tempFirstData: null,
    }
  },
  methods: {
    moment: function (date) {
      moment.locale("id");
      return moment.unix(date);
    },
    checkLogoutModal() {
      this.logoutmodal = !this.logoutmodal
    },
    getTwelveHoursAgo() {
      var ts = Math.round(new Date().getTime() / 1000);
      var tsTwelveAgo = ts - (2 * 3600);
      return tsTwelveAgo;
    },
    firstFetchTradingData() {
      this.$store.dispatch('fetchTradingData', {
        symbol: this.symbols,
        interval: 1,
        start: this.getTwelveHoursAgo(),
        end: Date.now()
      })
      .then((res) => {
        this.tradingDatas = res.result.list
        this.tempFirstData = res.result.list[0]
      })
      .catch((err) => {
        console.log(err)
      })
    },
    fetchTradingData() {
      this.$store.dispatch('fetchTradingData', {
        symbol: this.symbols,
        interval: 1,
        start: this.getTwelveHoursAgo(),
        end: Date.now()
      })
      .then((res) => {
        this.tradingDatas = res.result.list
      })
      .catch((err) => {
        console.log(err)
      })
    },
    startInterval() {
      const now = new Date();
      const nextMinute = new Date(now);
      nextMinute.setSeconds(0);
      nextMinute.setMinutes(nextMinute.getMinutes() + 1);
      nextMinute.setSeconds(1);

      const delay = nextMinute.getTime() - now.getTime();

      setTimeout(() => {
        this.firstFetchTradingData();
        this.intervalId = setInterval(this.fetchTradingData, 60 * 1000);
      }, delay);
    },
    stopInterval() {
      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
    setBackgroundColor(value) {
      if (value != this.tempFirstData[0]) {
        return `animate-bg`
      }
    },
  },
  computed: {
    ...mapGetters(['tradingData'])
  },
  mounted() {
    this.startInterval(this.firstFetchTradingData());
  },
  beforeUnmount() {
    this.stopInterval();
  },
}
</script>

<style scoped>
.animate-bg {
  -webkit-animation: bgcolorchange 60s infinite;
  animation: 60s infinite bgcolorchange;
}
@keyframes bgcolorchange {
  0% {
    background-color: green;
  }
  100% {
    background-color: white;
  }
}
 @-webkit-keyframes bgcolorchange {
      0%   {background: green;}
      100% {background: white;}
 }
 </style>
