import React, { useEffect } from "react";
import Data from "./components/Data";

import Aside from "./components/Aside";
import Main from "./components/Main";
import PopUp from "./components/PopUp";

import Script from "./components/Script";

export default function App() {
  useEffect(() => {
    Script();
  }, []);

  return (
    <React.Fragment>
      <Aside />
      <Main />
      <PopUp />
    </React.Fragment>
  );
}
