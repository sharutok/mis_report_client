import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";
import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { convertStringToDate } from "../../Side/Misc";
import { ContextHelper } from "../HomePage";
ChartJS.register( ArcElement, Tooltip, Legend);

export default function ProductMixCurrentMonth() {
  const { date_time_string } = useParams();
  const { productMixCurrMon } = useContext(ContextHelper);
  const total = productMixCurrMon.slice(productMixCurrMon.length - 1);
  const dataSet = [
    ...[...productMixCurrMon.slice(0, -1)].map((x) => {
      return (x * 100) / total;
    }),
  ];
  console.log(dataSet);
  const data = {
    labels: ["Electrodes", "Eqpt. & SGP", "W&F"],
    datasets: [
      {
        data: [...dataSet].length === null ? 0 : [...dataSet],
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
        fontSize: 50,
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
            return data.raw
              ? `${data.label}-: ${String(data.raw.toFixed(2))} %`
              : "";
          },
        },
      },
      title: {
        display: true,
        text: `Product Mix - ${moment(
          convertStringToDate(date_time_string)
        ).format("MMMM")}*`,
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
