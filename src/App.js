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
    <Router>
    <ConstantProvider>
      <UserProvider>
          <MenuProvider>
            <CartProvider>
              <TypeProvider>
                
                  <Navbar />
                  <Header />
                  <Content />
                  <Footer />
                
              </TypeProvider>
            </CartProvider>
          </MenuProvider>
        <ToastContainer />
      </UserProvider>
    </ConstantProvider>
    </Router>
  );
}

export default App;
