import React from "react";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Home />
      <Toaster
        position="top-center"
        containerStyle={{
          top: "50%",
          transform: "translateY(-85%)",
        }}
      />

    </>
  );
}

export default App;
