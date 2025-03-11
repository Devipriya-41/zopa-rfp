import "./bootstrap";
import React from "react";
import Index from "./component/index";
import ReactDom from "react-dom/client";

const root = ReactDom.createRoot(document.getElementById("app"));
root.render(<Index />);
