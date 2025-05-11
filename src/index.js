import React from "react";
import ReactDOM from "react-dom/client";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter as Router} from "react-router-dom";
import {WalletProvider} from "./services/walletContext";
import theme from "./theme";
import App from "./App";
import "./index.css";
import "./parallax.css";
import "./glassmorphism.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <Router>
                <WalletProvider>
                    <App />
                </WalletProvider>
            </Router>
        </ChakraProvider>
    </React.StrictMode>
);
