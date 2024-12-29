import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <NavBar />

      {/* Place for main content, so pages */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Footer />
    </div>
  );
}

export default MainLayout;
