import { useEffect, useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import SearchDiscovery from './components/SearchDiscovery';
import CategoryFilter from './components/CategoryFilter';
import "./App.css";
import { AuthProvider } from "./utils/authContext";
import LandingPage from "./pages/landing/landingPage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import PageNotImplemented from "./pages/pageEmpty";

import DashboardPage from "@/pages/dashboard";
import CommonHeader from "@/Components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import SearchF from './Components/Search';
const BlankLayout = () => {
  return (
    <>
      <CommonHeader />
      <main>
        <div className="bg-overlay"></div>
        <Outlet />
        <ToastContainer />
      </main>
    </>
  );
};

const App = () => {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <BlankLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/contact",
          element: <main>Contact Us</main>,
        },
        {
          path: "/services",
          element: <main>Services</main>,
        },
        {
          path: "/about",
          element: <main>About Us</main>,
        },
        {
          path: "*",
          element: <PageNotImplemented />,
        },
        // {
        //   path: "/sandeep",
        //   element: <Pandit />,
        // },
      ],
    },
  ]);

  return (
    <div>
      <div className="App">
        <h1>Fundraising Campaigns</h1>
        <CategoryFilter onCategoryChange={handleCategoryChange} />
        <SearchDiscovery selectedCategory={selectedCategory} searchQuery={searchQuery} />
      </div>
    {/* <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider> */}
    </div>
  );
};

export default App;
