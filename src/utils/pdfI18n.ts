import en from '../locales/en.json';
import sw from '../locales/sw.json';

const translations: Record<string, any> = {
  en,
  sw
};

/**
 * A lightweight translation helper for PDF templates.
 * Since react-pdf renders in a separate context, we avoid using hooks.
 * 
 * @param key - The translation key (e.g., 'affidavit.legal_instrument')
 * @param lang - The language code ('en' or 'sw')
 * @returns The translated string or the key if not found.
 */
export const t = (key: string, lang: string = 'en'): string => {
  // Handle cases like 'sw-TZ' or 'en-US'
  const baseLang = lang.split('-')[0];
  const keys = key.split('.');
  let result = translations[baseLang] || translations['en'];

  for (const k of keys) {
    if (result && result[k]) {
      result = result[k];
    } else {
      // Fallback to English if Swahili is missing a key
      if (lang === 'sw') {
        return t(key, 'en');
      }
      return key;
    }
  }

  return typeof result === 'string' ? result : key;
};
