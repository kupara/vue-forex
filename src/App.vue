<template>
  <div id="app">
    <Header />
    <div class="container">
      <div class="form">
        <Form
          :symbols="symbols"
          :apiRates="apiRates"
          :date="date"
          :updateRates="updateRates"
        />
      </div>
      <div class="history"><HistoryChart /></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Form from "./components/Form.vue";
import Header from "./components/Header.vue";
import HistoryChart from "./components/Chart.vue";

const BASE_URL = "https://api.exchangeratesapi.io/latest?";

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
      date: ""
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
      const response = await fetch(`${BASE_URL}base=${base}`, {
        method: "GET"
      });
      const { date, rates } = await response.json();
      this.apiRates = rates;
      this.date = date;
    }
  },
  mounted: async function() {
    const response = await axios.get(`${BASE_URL}base=EUR`);
    const { date, rates } = response.data;
    this.apiRates = rates;
    this.date = date;
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
  grid-template-rows: minmax(300px, auto);
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
