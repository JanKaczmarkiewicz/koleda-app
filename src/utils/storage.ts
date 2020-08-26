import { AsyncStorage } from "react-native";

/**
 * Always use await
 * @example await storage.getItem("token")
 */
export const storage = !navigator.userAgent ? AsyncStorage : localStorage;
