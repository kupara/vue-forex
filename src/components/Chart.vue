<script>
import { Line, mixins } from "vue-chartjs";

export default {
  extends: Line,
  props: ["chartData", "options"],
  mixins: [mixins.reactiveProp],
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
