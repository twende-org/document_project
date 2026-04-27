import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

interface DropdownItem {
  name: string;
  path: string;
  active?: boolean;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  onItemClick?: () => void;
}

export const DropdownMenu = ({ title, items, onItemClick }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timer.current = setTimeout(() => setOpen(false), 200);
  };

  const toggleDropdown = () => setOpen((prev) => !prev);

  const closeDropdown = () => {
    setOpen(false);
    if (onItemClick) onItemClick();
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="text-charcoal hover:text-redMain text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-1 group"
        onClick={toggleDropdown}
      >
        {title}
        <RiArrowDropDownLine className="text-xl group-hover:rotate-180 transition-transform" />
      </button>

      <div
        className={`absolute left-0 mt-4 bg-white shadow-2xl rounded-[1.5rem] z-[9999] w-56 transition-all duration-300 border border-slate-50 overflow-hidden ${
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
        }`}
      >
        <div className="p-2 space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={closeDropdown}
              className={({ isActive }) =>
                `block px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${
                  isActive
                    ? "bg-redMain text-white shadow-lg shadow-redMain/20"
                    : "text-charcoal hover:bg-slate-50 hover:text-redMain"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
