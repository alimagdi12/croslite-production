import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Shop from "./Pages/Shop/Shop";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
// Assuming you have a Signup page
import { LoginProvider } from "./Context/Login/LoginContext"; // Import your LoginProvider
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"; // Import the ProtectedRoute
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Profile from "./Pages/Profile/Profile";
import About from "./Pages/About/About";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/shop"
            element={
              <Layout>
                <Shop />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <Signup />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <Layout>
                <ProductDetails />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Layout>
                  <Cart />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
