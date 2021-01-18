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
        />
      </div>
      <div class="history">
        <h3>Data for the last month {{ base }} vs {{ target }}</h3>
        <history-chart
          :chartData="chartData"
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
      historicalData: null
    };
  },
  computed: {
    symbols() {
      const { apiRates, base } = this;
      const rateKeys = [...Object.keys(apiRates)];
      if (rateKeys.includes(base)) {
        rateKeys.splice(rateKeys.indexOf(base), 1);
        return [this.base, ...rateKeys.sort()];
      }
      return [base, ...rateKeys.sort()];
    },
    chartData() {
      const { target, historicalData } = this;
      if (historicalData) {
        const { rates } = this.historicalData;
        const labels = [...Object.keys(rates)];

        labels.sort((a, b) => {
          a = a.split("-").join("");
          b = b.split("-").join("");
          return a.localeCompare(b);
        });

        const data = labels.map(label => rates[label][target] || 1);
        return {
          labels,
          datasets: [
            {
              label: "Historical data",
              backgroundColor: "#2c3e50",
              data
            }
          ]
        };
      }
      return null;
    }
  },
  methods: {
    updateRates: async function(base) {
      const response = await axios.get(`${BASE_URL}/latest?base=${base}`);
      const { date, rates } = response.data;
      this.apiRates = rates;
      this.date = date;
      this.historicalData = await fetchHistoricalData(base, this.target);
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
  },
  watch: {
    base() {
      const { updateRates, base } = this;
      updateRates(base);
    },
    target: async function() {
      const { base, target } = this;
      this.historicalData = await fetchHistoricalData(base, target);
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
