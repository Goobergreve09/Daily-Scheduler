import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Games from "./pages/Games.jsx";
import ForgotPassword from "./pages/ForgotPassword";
import LuckyPick from "./pages/LuckyPick.jsx";
import MoneyBall from "./pages/MoneyBall.jsx";
import RegalRiches from "./pages/RegalRiches.jsx";
import RichLittlePiggies from "./pages/RichLittlePiggies.jsx";
import RocketRumble from "./pages/RocketRumble.jsx";
import Cats from "./pages/Cats.jsx";
import AscendingFortunes from "./pages/AscendingFortunes.jsx";

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
              {
        path: "/ascendingfortunes",
        element: <AscendingFortunes />,
      },
         {
        path: "/cats",
        element: <Cats />,
      },
      {
        path: "/lucky-pick",
        element: <LuckyPick />,
      },
      {
        path: "/moneyball",
        element: <MoneyBall />,
      },

      {
        path: "/regalriches",
        element: <RegalRiches />,
      },

      {
        path: "/richlittlepiggies",
        element: <RichLittlePiggies />,
      },
          {
        path: "/rocketrumble",
        element: <RocketRumble />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
