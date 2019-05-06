<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                displayFormats: {
                  second: "HH:mm:ss"
                },
                minUnit: "second",
                tooltipFormat: "DD/MM/YYYY HH:mm:ss"
              }
            }
          ]
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style>
</style>
