// i18n/useTranslation.ts
import { useLanguage } from './LanguageContext';

export function useTranslation() {
  const { language, t } = useLanguage();
  
  return { t, language };
}
