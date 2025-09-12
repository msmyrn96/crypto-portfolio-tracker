import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PortfolioProvider } from "./context/PortfolioContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
