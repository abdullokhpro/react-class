import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";

function App() {
  return (
    <>
      <Navbar logo="class" />
      <Products />
    </>
  );
}

export default App;
