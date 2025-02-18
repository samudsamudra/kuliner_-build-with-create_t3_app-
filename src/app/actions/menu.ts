"use server";

import { db as prisma } from "@/server/db";

export async function getMenus() {
  try {
    const menus = await prisma.menu.findMany();
    return menus ?? []; // If menus is undefined/null, return an empty array
  } catch (error) {
    console.error("Error fetching menus:", error);
    return [];
  }
}

export async function addMenu(name: string, price: number, category: "FOOD" | "DRINK") {
  try {
    return await prisma.menu.create({
      data: { name, price, category },
    });
  } catch (error) {
    console.error("Error adding menu:", error);
    throw new Error("Failed to add menu");
  }
}

export async function updateMenu(id: string, name: string, price: number, category: "FOOD" | "DRINK") {
  try {
    return await prisma.menu.update({
      where: { id },
      data: { name, price, category },
    });
  } catch (error) {
    console.error("Error updating menu:", error);
    throw new Error("Failed to update menu");
  }
}

export async function deleteMenu(id: string): Promise<{ success: boolean; message?: string }> {
  try {
    await prisma.menu.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
