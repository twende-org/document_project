import { Routes, Route, useLocation } from "react-router-dom";
import { MobileNavBar, NavBar } from "./components/navigation/Navbar";
import Footer from "./components/sections/Footer";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import "./index.css";

import { routes, documentRoutes, myDocumentsRoutes, type pageRouteConfig } from "./routes/pageRouteConfig";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";
import OfflineWrapper from "./components/Offline/OfflineWrapper";
import { refreshAccessToken } from "./api/refreshToken";
import { fetchUserProfile, restoreSession } from "./features/auth/authSlice";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import { RiArrowDropDownFill } from "react-icons/ri";
import TopNav from "./components/navigation/TopNav";
import { SignInModal } from "./components/auth/SignInModal";
import { openSignInModal } from "./store/uiSlice";


const Head = ({ title, description }: { title: string; description?: string }) => {
  useEffect(() => {
    document.title = title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
      else {
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = description;
        document.head.appendChild(newMeta);
      }
    }
  }, [title, description]);
  return null;
};

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FactoryLoader from "./components/documents/FactoryLoader";

function App() {

  const allRoutes: pageRouteConfig[] = [...routes, ...documentRoutes, ...myDocumentsRoutes];
  const theme = useSelector((state: RootState) => state.ui.theme);
  const factoryLoading = useSelector((state: RootState) => state.ui.factoryLoading);
  const [initialLoad, setInitialLoad] = useState(true);

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.is_staff || user?.is_superuser;

  const filteredRoutes = allRoutes.filter((route) => {
    if (route.path === "/panel") return isAdmin;
    return true;
  });
  // Show global loader while app initializes

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "professional");
    root.classList.add(theme);
  }, [theme]);

  const [topNavOpen, setTopNavOpen] = useState(false);

useEffect(() => {
  (async () => {
    try {
      // 1. Restore local session to Redux
      dispatch(restoreSession());

      const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup" || location.pathname === "/verify-email";

      const newToken = await refreshAccessToken();
      if (!newToken && !isAuthPage) {
        dispatch(openSignInModal());
      } else if (newToken) {
        // 2. Refresh tokens & restore profile
        dispatch(restoreSession()); // Re-sync after refresh
        dispatch(fetchUserProfile());
      }
    } catch (err) {
      console.error("Token refresh failed", err);
    } finally {
      setInitialLoad(false);
    }
  })();
}, [dispatch]);


  if (initialLoad) return <Loader message="Loading SmartDocs..." />;

  return (
    <div className="flex flex-col min-h-screen">
      {/* NAVBARS */}
      <div className="fixed top-0 z-50 w-full">
        {/* Desktop TopNav */}
        <div className="hidden md:flex">
          <TopNav />
        </div>

        {/* Floating small icon on top-left */}
        <div
          className="md:hidden fixed top-0 left-0 z-50 cursor-pointer"
          onClick={() => setTopNavOpen(!topNavOpen)}
        >
          <RiArrowDropDownFill
            size={24}
            className={`text-redMain transition-transform duration-300 mx-8 ${topNavOpen ? "rotate-180" : ""
              }`}
          />
        </div>

        {/* Mobile TopNav overlay */}
        <div
          className={`md:hidden fixed top-0 left-0 w-full bg-background/95 dark:bg-bg/95 backdrop-blur-md shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${topNavOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <TopNav />
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
          <NavBar />
        </div>
      </div>

      {/* PAGE CONTENT */}
      <main className="flex-1 w-full mt-20 transition-colors duration-300 bg-[var(--bg)] text-[var(--text)]">
        <OfflineWrapper>
          <Routes>
            {filteredRoutes.map((route) => {
              const Element = route.element;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <ProtectedRoute signedIn={route.signedIn}>
                      <>
                        {route.seo && <Head title={route.seo.title} description={route.seo.description} />}
                        <Element />
                      </>
                    </ProtectedRoute>
                  }
                />
              );
            })}
          </Routes>
        </OfflineWrapper>
      </main>

      {/* FOOTER */}
      {location.pathname !== "/create/cv" && <Footer />}

      {/* SignIn Modal */}
      <SignInModal />
      {/* Factory Loader Overlay */}
      <FactoryLoader isLoading={factoryLoading.isLoading} message={factoryLoading.message} />
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>


  );
}

export default App;
