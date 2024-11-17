import { useEffect } from "react";
import {
  ThemeProvider,
  useTheme,
} from "./context/ThemeProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import City from "./pages/City";
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([{
  element: <AppLayout />,
  children: [{
    path: '/',
    element:<Home/>
  },
    {
      path: '/city/:cityName',
      element:<City/>
  }]
}])

function App() {
  return (
    <QueryClientProvider client= {queryClient}>
      <ThemeProvider
        defaultTheme='dark'
        storageKey='vite-ui-theme'>
        <RouterProvider
          router={router}
        />
      </ThemeProvider>
      <ReactQueryDevtools
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
}

export default App;
