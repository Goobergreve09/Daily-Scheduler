import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Games from './pages/Games.jsx';
import ForgotPassword from "./pages/ForgotPassword";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/games",
        element: <Games />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);