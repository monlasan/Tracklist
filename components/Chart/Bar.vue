<script setup>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = reactive({
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    { label: 'Daert', data: [4, 20, 12, 18], backgroundColor: '#3c56e8' },
  ],
});
const chartOptions = reactive({
  responsive: true,
});
</script>
<template>
  <Bar
    id="chart"
    style="height: 100%; width: 100%"
    :options="chartOptions"
    :data="chartData"
  />
</template>
<style>
p {
  color: #3c56e8;
}
</style>
