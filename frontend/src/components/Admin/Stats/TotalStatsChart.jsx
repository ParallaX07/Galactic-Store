import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TotalStatsChart = () => {
    const axiosSecure = useAxiosSecure();
    const [totalStats, setTotalStats] = useState({});

    // [
    //     {
    //     "totalProducts": 16,
    //     "totalUsers": 8,
    //     "totalOrders": 3,
    //     "totalRevenue": 19400
    //     }
    //     ]

    const chartRef = useRef(null);

    useEffect(() => {
        axiosSecure
            .get("/totalStats")
            .then((res) => {
                setTotalStats(res.data[0]);
                console.log(totalStats);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {
        const labels = ["Total Users", "Total Products", "Total Orders"];
        const data = {
            labels: labels,
            datasets: [
                {
                    label: "Total Stats",
                    data: [
                        totalStats?.totalUsers,
                        totalStats?.totalProducts,
                        totalStats?.totalOrders,
                    ],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 205, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(201, 203, 207, 0.2)",
                    ],
                    borderColor: [
                        "rgb(255, 99, 132)",
                        "rgb(255, 159, 64)",
                        "rgb(255, 205, 86)",
                        "rgb(75, 192, 192)",
                        "rgb(54, 162, 235)",
                        "rgb(153, 102, 255)",
                        "rgb(201, 203, 207)",
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const config = {
            type: "bar",
            data: data,
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        type: "linear",
                        beginAtZero: true,
                        grid: {
                            display: false, // Disable the grid lines
                        },
                        ticks: {
                            display: false, // Disable the ticks (x-axis)
                            fontSize: 20
                        }
                    },
                    y: {
                        grid: {
                            display: false, // Disable the grid lines
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            fontSize: 24
                        }
                    },
                }
            },
        };

        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy the previous chart
        }

        const ctx = document.getElementById("myChart").getContext("2d");
        chartRef.current = new Chart(ctx, config);
    }, [totalStats]);

    return <canvas id="myChart" className="max-w-6xl mx-3 text-xl"></canvas>;
};

export default TotalStatsChart;
