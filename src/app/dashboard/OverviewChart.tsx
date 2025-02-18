"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getMenus } from "@/app/actions/menu";

export default function OverviewChart() {
  const [chartData, setChartData] = useState<{ name: string; total: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const menus = await getMenus();

        // Menghitung jumlah makanan & minuman
        const foodCount = menus.filter((menu) => menu.category === "FOOD").length;
        const drinkCount = menus.filter((menu) => menu.category === "DRINK").length;

        setChartData([
          { name: "Makanan", total: foodCount },
          { name: "Minuman", total: drinkCount },
        ]);
      } catch (err) {
        setError("Failed to fetch menu data");
        console.error(err);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
