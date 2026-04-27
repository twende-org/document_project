import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLng = i18n.language === 'en' ? 'sw' : 'en';
    i18n.changeLanguage(nextLng);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center px-3 py-1 text-sm font-semibold rounded-md border border-redMain text-redMain hover:bg-redMain hover:text-white transition-all duration-300 mr-2"
    >
      {i18n.language === 'en' ? 'SW' : 'EN'}
    </button>
  );
};

export default LanguageToggle;
