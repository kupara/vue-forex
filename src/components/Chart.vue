<script>
import { Line, mixins } from "vue-chartjs";

export default {
  extends: Line,
  data() {
    const { rates } = this.historicalData;
    const labels = Object.keys(rates);
    labels.sort((a, b) => {
      a = a.split("/").join("");
      b = b.split("/").join("");
      return a > b ? 1 : a < b ? -1 : 0;
    });

    const data = labels.map(label => rates[label][this.target]);
    return {
      chartData: {
        labels,
        datasets: [
          {
            label: "Historical data",
            backgroundColor: "#2c3e50",
            data
          }
        ]
      }
    };
  },
  props: ["historicalData", "options", "target"],
  mixins: [mixins.reactiveData],
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
