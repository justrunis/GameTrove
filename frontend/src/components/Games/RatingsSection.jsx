import React from "react";
import { Pie } from "react-chartjs-2";
import Button from "../UI/Button";
import { makeFirstLetterUpperCase } from "../../utils/formating";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register the necessary chart components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function RatingsSection({ ratings }) {
  // Prepare data for the pie chart
  const data = {
    labels: ratings.map((rating) => makeFirstLetterUpperCase(rating.title)),
    datasets: [
      {
        label: "Ratings",
        data: ratings.map((rating) => rating.percent),
        backgroundColor: ratings.map(
          (_, index) => `hsl(${(index * 360) / ratings.length}, 70%, 50%)`
        ),
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="mt-4">
      {ratings.length === 0 ? (
        <p className="text-lg text-base-content">No Ratings Available</p>
      ) : (
        <div className="flex w-auto h-auto mx-auto">
          <Pie data={data} options={options} />
        </div>
      )}
    </div>
  );
}
