import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { RiUser3Line, RiLogoutBoxRLine, RiArrowDropDownLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

export const UserMenu = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsOpen(false);
      navigate("/");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all border border-white/10 group"
      >
        <div className="w-8 h-8 rounded-full bg-redMain flex items-center justify-center text-white text-xs font-black shadow-lg shadow-redMain/20 border-2 border-white/20">
          {user?.first_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-[10px] font-black uppercase tracking-widest text-white leading-none">
            {user?.first_name || t('common.account')}
          </p>
        </div>
        <RiArrowDropDownLine className={`text-xl text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-secondary border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-[1000]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-white hover:bg-white/5 transition-all border-t border-white/5"
          >
            <RiLogoutBoxRLine className="text-sm text-redMain" />
            {t('common.logout')}
          </button>
        </div>
      )}
    </div>
  );
};
