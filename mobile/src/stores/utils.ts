import { persist, StateStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Custom storage object
export const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, "has been retrieved")
    const jsonValue = await AsyncStorage.getItem(name)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, "with value", value, "has been saved")
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(name, jsonValue)
  },
}
