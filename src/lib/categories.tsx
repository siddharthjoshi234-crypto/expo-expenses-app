import AsyncStorage from "@react-native-async-storage/async-storage";

// create a storage instance

export async function AddCategory(category: string) {

    const token = await AsyncStorage.getItem("categories");
    if (token !== null && JSON.parse(token).includes(category)) {  
        const categories = JSON.parse(token);
        categories.push(category);
        await AsyncStorage.setItem("categories", JSON.stringify(categories));
    }
    if (token === null) {
        const defaultCategories = ["Food", "Transport", "Entertainment"];
        await AsyncStorage.setItem("categories", JSON.stringify(defaultCategories));
        return;
    }
}

export async function GetCategory() {
    
    const token = await AsyncStorage.getItem("categories");
    console.log("Stored categories:", token);
    return token ? JSON.parse(token) : [];

}
export async function RemoveCategory(category: string) {
    const categories = await AsyncStorage.getItem("categories");
    if (categories) {
        const categoryList = JSON.parse(categories);
        const updatedCategories = categoryList.filter((cat: string) => cat !== category);
        await AsyncStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
}