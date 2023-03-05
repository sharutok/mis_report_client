import React, { useContext } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ContextHelper } from "../HomePage";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function ProductMixYTD() {
  const { productMixYTD, productMixDiffMonth, setProductMixDiffMonth } =
    useContext(ContextHelper);
  const total = productMixYTD.reduce((a, b) => {
    return a + b;
  }, 0);
  const datas = [
    ...productMixYTD.map((x) => {
      return (x * 100) / total;
    }),
  ];
  const data = {
    labels: ["Electrodes", "Eqpt. & SGP", "W&F"],
    datasets: [
      {
        label: "# of Votes",
        data: datas,
        backgroundColor: ["#dd6e42", "#e8dab2", "#4f6d7a"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        borderRadius: 4,
        fontSize: 40,
        color: "#343a40",
        font: {
          weight: "bold",
          size: 20,
        },
        formatter: (val) => {
          return val ? `${String(val.toFixed(2))}%` : "";
        },
        padding: 6,
        rotation: "45",
      },
      legend: {
        position: "top",
      },
      tooltip: {
        titleFont: {
          size: 15,
        },
        bodyFont: {
          size: 15,
        },
        callbacks: {
          label: function (data) {
            return `${data.label}-: ${String(data.raw.toFixed(2))} %`;
          },
        },
      },
      title: {
        display: true,
        text: `Product Mix - YTD*`,
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
}
