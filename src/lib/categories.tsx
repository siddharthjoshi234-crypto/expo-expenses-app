import { createAsyncStorage } from "@react-native-async-storage/async-storage";

// create a storage instance
const storage = createAsyncStorage("appDB");

export async function AddCategory(category: string) {

    const categories = []
    categories.push(category);
    await storage.setItem("categories", JSON.stringify(categories));

}
export async function GetCategory() {
    
    const token = await storage.getItem("categories");
    console.log("Stored categories:", token);
    return token ? JSON.parse(token) : [];

}
export async function RemoveCategory(category: string) {
    const categories = await storage.getItem("categories");
    if (categories) {
        const categoryList = JSON.parse(categories);
        const updatedCategories = categoryList.filter((cat: string) => cat !== category);
        await storage.setItem("categories", JSON.stringify(updatedCategories));
    }
}