import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGE_KEY = "@app_language";

export const saveLanguage = async (language: string) => {
  await AsyncStorage.setItem(LANGUAGE_KEY, language);
};

export const getLanguage = async () => {
  return await AsyncStorage.getItem(LANGUAGE_KEY);
};