import { Link } from "react-router-dom";
import { PiInstagramLogoThin } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-charcoal text-white py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <h2 className="text-2xl font-black tracking-tighter uppercase mb-6">
              Twende <span className="text-redMain border-l-2 border-redMain/20 pl-2 ml-2">Documents</span>
            </h2>
            <p className="text-white/40 text-sm font-medium max-w-sm leading-loose">
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-redMain mb-8">{t('footer.navigation')}</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/60">
              <li><Link to="/" className="hover:text-white transition-colors">{t('common.home')}</Link></li>
              <li><Link to="/documents" className="hover:text-white transition-colors">{t('common.documents')}</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">{t('common.pricing')}</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">{t('common.help')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-redMain mb-8">{t('footer.connect')}</h4>
            <div className="flex gap-6">
              {[<SlSocialFacebook />, <FaXTwitter />, <PiInstagramLogoThin />].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-xl hover:bg-redMain transition-all">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{t('footer.all_rights')}</p>
           <div className="flex gap-8 text-[8px] font-black uppercase tracking-widest text-white/20">
              <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
