<template>
  <div id="app">
    <simple-header />
    <div class="container">
      <div class="form">
        <currency-form
          @currencyChange="updateCurrencies"
          :apiRates="apiRates"
          :base="base"
          :date="date"
          :symbols="symbols"
          :target="target"
          :updateRates="updateRates"
        />
      </div>
      <div class="history" v-if="Boolean(historicalData)">
        <h3>Data for the last month {{ base }} vs {{ target }}</h3>
        <history-chart
          v-if="loaded"
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
import CurrencyForm from "./components/Form.vue";
import SimpleHeader from "./components/Header.vue";
import HistoryChart from "./components/Chart.vue";
import { fetchHistoricalData } from "./utils";
import BASE_URL from "./constants";

export default {
  name: "App",
  components: {
    CurrencyForm,
    SimpleHeader,
    HistoryChart
  },
  data() {
    return {
      apiRates: {},
      date: "",
      base: "EUR",
      target: "USD",
      historicalData: null,
      loaded: false
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
      this.loaded = false;
      const response = await fetch(`${BASE_URL}/latest?base=${base}`, {
        method: "GET"
      });
      const { date, rates } = await response.json();
      this.apiRates = rates;
      this.date = date;
      this.historicalData = await fetchHistoricalData(base, this.target);
      this.loaded = true;
    },
    updateCurrencies({ base, target }) {
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
    this.loaded = true;
  },
  watch: {
    base() {
      const { updateRates, base } = this;
      updateRates(base);
    },
    target: async function() {
      const { target, base } = this;
      this.loaded = false;
      this.historicalData = await fetchHistoricalData(base, target);
      this.loaded = true;
    }
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
