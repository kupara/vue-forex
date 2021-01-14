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
      <select
        :value="base"
        id="sourceCurrency"
        @change="selectCurrency({ base: $event.target.value, target })"
      >
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
      <input id="target" type="number" v-model="targetValue" :readonly="true" />
      <select
        :value="target"
        id="targetCurrency"
        @change="selectCurrency({ base, target: $event.target.value })"
      >
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
  name: "CurrencyForm",
  props: {
    apiRates: Object,
    base: String,
    date: String,
    symbols: Array,
    target: String
  },
  computed: {
    targetValue() {
      const { target, apiRates, base, sourceValue } = this;
      if (target === base) return sourceValue;

      return sourceValue * apiRates[target];
    }
  },
  data() {
    return {
      sourceValue: 0
    };
  },
  methods: {
    selectCurrency(value) {
      this.$emit("currencyChange", value);
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
