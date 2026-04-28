import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { clearSelected } from "../../features/auth/authSlice";
import { type RootState } from "../../store/store";

const TopNav = () => {
  const dispatch = useAppDispatch();
  const { user, selectedUser } = useSelector((state: RootState) => state.auth);

  const token = localStorage.getItem("token");
  const isSignedIn = !!user && !!token;

  useEffect(() => {
    if (selectedUser) {
      dispatch(clearSelected());
    }
  }, [selectedUser, dispatch]);

  return (
    <div className="w-full bg-slate-50/50 backdrop-blur-sm border-b border-slate-100/50">
      <div className="container mx-auto">
        <div className="flex justify-end items-center h-8 px-6 text-[8px] font-black uppercase tracking-[0.4em] text-charcoal/30">
          Smart Document Solutions {isSignedIn ? `| Authenticated Session` : ""}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
