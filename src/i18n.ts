import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
const resources = {
  en: {
    translation: {
      common: {
        home: 'Home',
        dashboard: 'Panel',
        help: 'Help',
        documents: 'Documents',
        templates: 'Templates',
        create: 'Create',
        pricing: 'Pricing',
        sign_in: 'Sign In',
        sign_up: 'Sign Up',
        profile: 'Profile',
        logout: 'Logout',
        loading: 'Loading Twende Documents...',
        back: 'Back',
        continue: 'Continue',
        generate: 'Generate',
        preview: 'Preview',
      },
      nav: {
        all_documents: 'All Documents',
        my_cvs: 'My CVs',
        my_cover_letters: 'My Cover Letters',
        my_portfolios: 'My Portfolios',
        my_certificates: 'My Certificates',
        cv_templates: 'CV Templates',
        risala_templates: 'Risala Templates',
        cover_letter_templates: 'Cover Letter Templates',
        portfolio_templates: 'Portfolio Templates',
        certificate_templates: 'Certificate Templates',
      },
      home: {
        title: 'Twende Documents',
        subtitle: 'Create, manage, and edit CVs, documents, and templates efficiently.',
        get_started: 'Get Started',
      },
      agent: {
        dashboard_title: 'Agent Dashboard',
        welcome_message: 'Welcome back',
        total_customers: 'Total Customers',
        credits_remaining: 'Credits Remaining',
        docs_generated_today: 'Docs Today',
        show_shop_qr: 'Show Shop QR',
        quick_create: 'Quick Create',
        quick_create_desc: 'Generate a document for a walk-in customer instantly.',
        recent_activity: 'Recent Activity',
        cv_generated_for: 'CV Generated for',
      },
      dashboard: {
        stats_title: 'Statistics Dashboard',
        total_users: 'Total Users',
        active_users: 'Active Users',
        staff_users: 'Staff Users',
        superuser: 'Superusers',
        distribution: 'User Distribution',
        loading: 'Loading users...',
      },
      home_hero: {
        welcome: 'Welcome to',
        subtitle: 'One professional platform for generating documents — effortlessly.',
        view_docs: 'View Document Categories',
      }
    }
  },
  sw: {
    translation: {
      common: {
        home: 'Nyumbani',
        dashboard: 'Paneli',
        help: 'Msaada',
        documents: 'Nyaraka',
        templates: 'Sampuli',
        create: 'Tengeneza',
        pricing: 'Gharama',
        sign_in: 'Ingia',
        sign_up: 'Jisajili',
        profile: 'Wasifu',
        logout: 'Ondoka',
        loading: 'Inapakia Twende Documents...',
        back: 'Rudi',
        continue: 'Endelea',
        generate: 'Tengeneza',
        preview: 'Hakiki',
        cv: 'CV',
        official_letter: 'Barua Rasmi',
        mins_ago: 'dakika zilizopita',
      },
      nav: {
        all_documents: 'Nyaraka Zote',
        my_cvs: 'CV Zangu',
        my_cover_letters: 'Barua Zangu za Maombi',
        my_portfolios: 'Kazi Zangu (Portfolio)',
        my_certificates: 'Vyeti Vyangu',
        cv_templates: 'Sampuli za CV',
        risala_templates: 'Sampuli za Risala',
        cover_letter_templates: 'Sampuli za Barua',
        portfolio_templates: 'Sampuli za Portfolio',
        certificate_templates: 'Sampuli za Vyeti',
        agent_dashboard: 'Paneli ya Wakala',
      },
      home: {
        title: 'Twende Documents',
        subtitle: 'Tengeneza, dhibiti, na hariri CV, nyaraka, na sampuli kwa ufanisi.',
        get_started: 'Anza Sasa',
      },
      agent: {
        dashboard_title: 'Paneli ya Wakala',
        welcome_message: 'Karibu tena',
        total_customers: 'Wateja Wote',
        credits_remaining: 'Salio la Credits',
        docs_generated_today: 'Nyaraka za Leo',
        show_shop_qr: 'Onyesha QR ya Duka',
        quick_create: 'Tengeneza Haraka',
        quick_create_desc: 'Tengeneza waraka kwa mteja anayekuja dukani sasa hivi.',
        recent_activity: 'Shughuli za Karibuni',
        cv_generated_for: 'CV Imetengenezwa kwa ajili ya',
      },
      dashboard: {
        stats_title: 'Paneli ya Takwimu',
        total_users: 'Watumiaji Wote',
        active_users: 'Watumiaji Amilifu',
        staff_users: 'Watumiaji wa Ndani',
        superuser: 'Wasimamizi Wakuu',
        distribution: 'Mgawanyo wa Watumiaji',
        loading: 'Inapakia watumiaji...',
      },
      home_hero: {
        welcome: 'Karibu kwenye',
        subtitle: 'Jukwaa moja la kitaalamu kwa ajili ya kutengeneza nyaraka — kwa urahisi.',
        view_docs: 'Angalia Aina za Nyaraka',
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
