import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";

import MenuProvider from "./context/Menu";
import UserProvider from "./context/User";
import { ToastContainer } from "react-toastify";
import TypeProvider from "./context/Type";
import { CartProvider } from "./context/Cart";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import ConstantProvider from "./context/Constant";

function App() {
  return (
    <ConstantProvider>
      <UserProvider>
          <MenuProvider>
            <CartProvider>
              <TypeProvider>
                <Router>
                  <Navbar />
                  <Header />
                  <Content />
                  <Footer />
                </Router>
              </TypeProvider>
            </CartProvider>
          </MenuProvider>
        <ToastContainer />
      </UserProvider>
    </ConstantProvider>
  );
}

export default App;
