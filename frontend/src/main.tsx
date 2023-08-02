import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import "./index.css";
import "@inovua/reactdatagrid-community/index.css";
// import * as serviceWorker from "./service-worker.ts";
import { AppProvider } from "./api/context.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
// import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AppProvider>
  </React.StrictMode>
);

// serviceWorker.register();
