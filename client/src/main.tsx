import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@radix-ui/themes/styles.css";
import { ToastProvider } from "./components/Toast/ToastProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Theme>
    </QueryClientProvider>
  </StrictMode>
);
