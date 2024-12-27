import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow flex">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MainLayout;
