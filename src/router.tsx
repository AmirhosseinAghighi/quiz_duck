import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MiniApp from "./MiniApp";
import Loading from "./components/Loading/Loading";
import AppLayout from "./components/AppLayout";
import Lobby from "./components/Lobby/Lobby";

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
                <CreateGame />
              </Suspense>
            ),
          },
          {
            path: "/winner",
            element: (
              <Suspense fallback={<Loading />}>
                <CreateGame />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
