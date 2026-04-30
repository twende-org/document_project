import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiMenuLine } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";
import { Logo } from "./Logo";
import { UserMenu } from "./UserMenu";
import { routes } from "../../routes/pageRouteConfig";
import type { RootState } from "../../store/store";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const NavBar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdminOrAgent = user?.role === "admin" || user?.role === "agent";
  const navLinks = ["Home", "Documents", "Agent Station", "Pricing", "Help"];
  if (isAdminOrAgent) {
    navLinks.push("Panel");
  }

  return (
    <div className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-secondary/95 backdrop-blur-md shadow-xl py-2" : "bg-secondary py-4"
    }`}>
      <nav className="hidden lg:flex container mx-auto px-6 justify-between items-center">
        <Link to="/" className="transition-transform hover:scale-105 active:scale-95">
          <Logo />
        </Link>
        
        <ul className="flex gap-6 items-center">
          {routes
            .filter((link) => navLinks.includes(link.name))
            .map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-[13px] font-black uppercase tracking-[0.2em] transition-all ${
                      isActive
                        ? "text-primary border-b-2 border-primary pb-1"
                        : "text-white/70 hover:text-white"
                    }`
                  }
                >
                  {t(`common.${link.name.toLowerCase().replace(' ', '_')}`)}
                </NavLink>
              </li>
            ))}
          
          <li className="ml-4">
            <LanguageSwitcher />
          </li>

          <li>
            <NavLink
              to="/create"
              className="px-6 py-2.5 bg-primary text-white rounded-xl text-[13px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 active:scale-95"
            >
              {t('common.create')}
            </NavLink>
          </li>
          <li>
            <UserMenu />
          </li>
        </ul>
      </nav>
      <MobileNavBar />
    </div>
  );
};

export const MobileNavBar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const location = useLocation();

  const user = useSelector((state: RootState) => state.auth.user);
  const isAdminOrAgent = user?.role === "admin" || user?.role === "agent";
  const navLinks = ["Home", "Documents", "Pricing", "Agent Station", "Help"];
  if (isAdminOrAgent) {
    navLinks.push("Panel");
  }

  return (
    <nav className="lg:hidden px-6 h-16 flex items-center justify-between">
      <Link to="/" onClick={closeMenu} className="relative z-[10000]">
        <Logo />
      </Link>
      
      <div className="flex items-center gap-4 relative z-[10000]">
        <LanguageSwitcher />
        <button
          onClick={handleToggle}
          className="text-white text-2xl focus:outline-none w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 active:scale-90 transition-all"
        >
          {isOpen ? <TfiClose /> : <RiMenuLine />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed inset-0 bg-secondary z-[9999] overflow-hidden pt-24 pb-12 px-8 flex flex-col"
          >
            <div className="flex flex-col gap-6 py-12">
              {routes
                .filter((link) => navLinks.includes(link.name))
                .sort((a, b) => navLinks.indexOf(a.name) - navLinks.indexOf(b.name))
                .map((link, idx) => (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    key={link.name}
                  >
                    <NavLink
                      to={link.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `text-2xl font-black uppercase tracking-tighter ${
                          isActive ? "text-primary" : "text-white"
                        }`
                      }
                    >
                      {t(`common.${link.name.toLowerCase().replace(' ', '_')}`)}
                    </NavLink>
                  </motion.div>
                ))}
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto flex flex-col gap-4"
            >
              <UserMenu />
              <Link
                to="/create"
                onClick={closeMenu}
                className="w-full h-14 bg-primary text-white rounded-2xl flex items-center justify-center text-sm font-black uppercase tracking-widest shadow-2xl shadow-red-900/40"
              >
                {t('common.create')}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
