import Header from "./components/layouts/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import "./App.css";
import { useEffect } from "react";
import Footer from "./components/layouts/Footer/Footer";
import Home from "./components/Home/Home";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
