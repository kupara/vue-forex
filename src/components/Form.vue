<template>
  <div class="wrapper">
    <div class="input-group">
      <label for="source">Source amount:</label>
      <input
        id="source"
        type="number"
        placeholder="Enter amount"
        v-model="sourceValue"
      />
      <select v-model="base" id="sourceCurrency">
        <option
          v-for="(symbol, index) in symbols"
          :key="index"
          :value="symbol"
          :selected="symbol === base"
          >{{ symbol }}</option
        >
      </select>
    </div>
    <div class="input-group">
      <label for="target">Target amount:</label>
      <input id="target" type="number" v-model="targetValue" />
      <select v-model="target" id="targetCurrency">
        <option
          v-for="(symbol, index) in symbols"
          :value="symbol"
          :key="'target' + index"
          >{{ symbol }}</option
        >
      </select>
    </div>
    <span> Date of retrieval: {{ date }}</span>
  </div>
</template>

<script>
export default {
  name: "Form",
  props: {
    apiRates: Object,
    date: String,
    symbols: Array,
    updateRates: Function
  },
  computed: {
    targetValue() {
      const { target, apiRates } = this;

      return this.sourceValue * apiRates[target];
    }
  },
  data() {
    return {
      base: "EUR",
      sourceValue: 0,
      target: "USD",
      rate: ""
    };
  },
  watch: {
    base() {
      const { updateRates, base } = this;
      updateRates(base);
    }
  }
};
</script>

<style scoped>
.wrapper {
  text-align: right;
}

.input-group {
  display: flex;
  margin-bottom: 1rem;
}

input,
select {
  padding: 0.75rem;
  border-radius: 0.25rem;
  font-size: 1.25rem;
  margin-left: 0.5rem;
}

input {
  flex: 1;
}

label {
  padding: 0.75rem 0;
}
</style>
