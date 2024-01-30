import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { NotFound } from "./components/NotFound/NotFound";
import { Photo } from "./components/Photo/Photo";
// import { Search } from "./components/Search/Search";
import { List } from "./components/List/List";
// import { Favorite } from "./components/Favorite/Favorite";
import { AuthSuccess } from "./components/AuthSuccess/AuthSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <main>
          <List />
        </main>
      </>
    ),
    children: [
      {
        path: "auth",
        element: (
          <>
            <main>
              <AuthSuccess />
            </main>
          </>
        ),
      },
    ],
  },

  {
    path: "/photo/:id",
    element: (
      <>
        <Header />
        <main>
          <Photo />
        </main>
      </>
    ),
  },
  {
    path: "/search",
    element: (
      <>
        <Header />
        <main>
          {/* <Search /> */}
          <List />
        </main>
      </>
    ),
  },
  {
    path: "/search/photo/:id",
    element: (
      <>
        <Header />
        <main>
          <Photo />
        </main>
      </>
    ),
  },
  {
    path: "/favorite",
    element: (
      <>
        <Header />
        <main>
          {/* <Favorite /> */}
          <List />
        </main>
      </>
    ),
  },
  {
    path: "/favorite/photo/:id",
    element: (
      <>
        <Header />
        <main>
          <Photo />
        </main>
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <Header />
        <main>
          <NotFound />
        </main>
      </>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
