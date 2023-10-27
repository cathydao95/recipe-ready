import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  DashboardLayout,
  Landing,
  Register,
  Login,
  ErrorNotFound,
  Results,
  SearchByIngredients,
  Recipe,
  Bookmarked,
  Create,
  UserSettings,
} from "./pages";
import SearchByName from "./pages/Search/SearchByName";
import UserRecipes from "./pages/UserRecipes/UserRecipes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorNotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Results /> },
          { path: "search-ingredients", element: <SearchByIngredients /> },
          { path: "search-name", element: <SearchByName /> },
          { path: "results", element: <Results /> },
          { path: ":id", element: <Recipe /> },
          { path: "bookmarked", element: <Bookmarked /> },
          { path: "create", element: <Create /> },
          { path: "my-recipes", element: <UserRecipes /> },
          { path: "settings", element: <UserSettings /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
