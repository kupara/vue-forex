<template>
  <div id="app">
    <Header />
    <div class="container">
      <div class="form">
        <Form
          :symbols="symbols"
          :apiRates="apiRates"
          :date="date"
          :updateCurrencies="updateCurrencies"
          :updateRates="updateRates"
        />
      </div>
      <div class="history" v-if="Boolean(historicalData)">
        <h3>Data for the last month EUR vs USD</h3>
        <HistoryChart
          :historicalData="historicalData"
          :target="target"
          :options="{ responsive: true, maintainAspectRatio: false }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Form from "./components/Form.vue";
import Header from "./components/Header.vue";
import HistoryChart from "./components/Chart.vue";
import { fetchHistoricalData } from "./utils";
import BASE_URL from "./constants";

export default {
  name: "App",
  components: {
    Form,
    Header,
    HistoryChart
  },
  data() {
    return {
      apiRates: {},
      date: "",
      base: "EUR",
      target: "USD",
      historicalData: null
    };
  },
  computed: {
    symbols() {
      const { apiRates } = this;
      return apiRates ? ["EUR", ...Object.keys(apiRates)] : [];
    }
  },
  methods: {
    updateRates: async function(base) {
      const response = await fetch(`${BASE_URL}/latest?base=${base}`, {
        method: "GET"
      });
      const { date, rates } = await response.json();
      this.apiRates = rates;
      this.date = date;
      this.historicalData = await fetchHistoricalData(base, this.target);
    },
    updateCurrencies(base, target) {
      this.base = base;
      this.target = target;
    }
  },
  mounted: async function() {
    const { base, target } = this;
    const response = await axios.get(`${BASE_URL}/latest?base=EUR`);
    const { date, rates } = response.data;
    this.apiRates = rates;
    this.date = date;

    this.historicalData = await fetchHistoricalData(base, target);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(100px, auto);
  grid-template-areas:
    "form"
    "history";
  margin: 2rem auto;
  max-width: 768px;
}

.form {
  grid-area: form;
}

.history {
  grid-area: history;
}
</style>
