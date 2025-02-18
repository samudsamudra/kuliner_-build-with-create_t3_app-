"use client";

import { useState, useEffect } from "react";
import { getMenus, deleteMenu, addMenu } from "@/app/actions/menu";
import Button from "@/components/ui/button";
import MenuForm from "@/components/MenuForm";
import OverviewChart from "./OverviewChart";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const [menus, setMenus] = useState<{ id: string; name: string; price: number }[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getMenus();
      setMenus(data);
    }
    fetchData();
  }, []);

  const handleAddMenuAction = async (menu: { name: string; price: number; category: "FOOD" | "DRINK" }) => {
    const response = await addMenu(menu.name, menu.price, menu.category);
    if (response) {
      setMenus((prevMenus) => [...prevMenus, response]);
    } else {
      alert("Failed to add menu");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus menu ini?");
    if (!confirmDelete) return;

    const response = await deleteMenu(id);
    if (response.success) {
      setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
    } else {
      alert(response.message);
    }
  };

  const filteredMenus = menus.filter((menu) =>
    menu.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <MenuForm onAddMenuAction={handleAddMenuAction} />
      <OverviewChart />
      <Input
        type="text"
        placeholder="Cari menu..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4"
      />
      <h2 className="text-xl font-semibold mt-4">Daftar Menu</h2>
      <ul className="mt-2">
        {filteredMenus.length > 0 ? (
          filteredMenus.map((menu) => (
            <li key={menu.id} className="border p-2 flex justify-between items-center">
              {menu.name} - Rp {menu.price}
              <Button onClick={() => handleDelete(menu.id)} className="bg-red-500">Hapus</Button>
            </li>
          ))
        ) : (
          <li className="p-2">Menu tidak ditemukan</li>
        )}
      </ul>
    </div>
  );
}
