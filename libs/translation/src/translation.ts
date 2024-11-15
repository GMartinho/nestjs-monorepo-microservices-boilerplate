import { TranslationLanguages, TRANSLATION_LANGUAGES } from "./translation.types";

export const translation = (lang: TranslationLanguages, value?: string) => {
    const translations = {
        [TRANSLATION_LANGUAGES.en_US]: {
            userNotFound: () => 'User not found.',
            
        }
    }
}