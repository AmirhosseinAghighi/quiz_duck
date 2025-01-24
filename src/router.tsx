import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MiniApp from "./MiniApp";
import Loading from "./components/Loading/Loading";
import AppLayout from "./components/AppLayout";
import Lobby from "./components/Lobby/Lobby";
import Join from "./components/Join/Join";
import Game from "./components/Game/Game";
import Winner from "./components/Winner/Winner";

const Home = lazy(() => import("./components/Home/Home"));
const CreateGame = lazy(() => import("./components/CreateGame/CreateGame"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MiniApp />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<Loading />}>
                <Loading navigate />
              </Suspense>
            ),
          },
          {
            path: "/home",
            element: (
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "/create",
            element: (
              <Suspense fallback={<Loading />}>
                <CreateGame />
              </Suspense>
            ),
          },
          {
            path: "/lobby",
            element: (
              <Suspense fallback={<Loading />}>
                <Lobby />
              </Suspense>
            ),
          },
          {
            path: "/game",
            element: (
              <Suspense fallback={<Loading />}>
                <Game />
              </Suspense>
            ),
          },
          {
            path: "/winner",
            element: (
              <Suspense fallback={<Loading />}>
                <Winner />
              </Suspense>
            ),
          },
          {
            path: "/join",
            element: (
              <Suspense fallback={<Loading />}>
                <Join />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
