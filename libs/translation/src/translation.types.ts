export const TRANSLATION_LANGUAGES = {
    en_US: 'en_US',
    pt_BR: 'pt_BR'
} as const;

export type TranslationLanguages = typeof TRANSLATION_LANGUAGES[keyof typeof TRANSLATION_LANGUAGES];