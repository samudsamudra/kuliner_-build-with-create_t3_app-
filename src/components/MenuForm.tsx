"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MenuFormProps {
  onAddMenuAction: (menu: { name: string; price: number; category: "FOOD" | "DRINK" }) => Promise<void>;
}

export default function MenuForm({ onAddMenuAction }: MenuFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("FOOD");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddMenuAction({ name, price: parseFloat(price), category: category as "FOOD" | "DRINK" });
    alert("Menu berhasil ditambahkan!");
    setName("");
    setPrice("");
    setCategory("FOOD");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">Tambah Menu</h2>
      <Input type="text" placeholder="Nama Menu" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="number" placeholder="Harga" value={price} onChange={(e) => setPrice(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded-md">
        <option value="FOOD">Makanan</option>
        <option value="DRINK">Minuman</option>
      </select>
      <Button type="submit" className="w-full mt-2">Tambah</Button>
    </form>
  );
}
