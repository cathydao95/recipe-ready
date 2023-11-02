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
import ProtectedRoute from "./pages/ProtectedRoute";
import SearchByName from "./pages/Search/SearchByName";
import UserRecipes from "./pages/UserRecipes/UserRecipes";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <ErrorNotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "recipes",
        // element: <DashboardLayout />,

        children: [
          { index: true, element: <SearchByName /> },
          { path: "search-ingredients", element: <SearchByIngredients /> },
          { path: "results", element: <Results /> },
          { path: ":id", element: <Recipe /> },

          {
            path: "bookmarked",
            element: (
              <ProtectedRoute>
                <Bookmarked />
              </ProtectedRoute>
            ),
          },
          {
            path: "create",
            element: (
              <ProtectedRoute>
                <Create />
              </ProtectedRoute>
            ),
          },
          {
            path: "my-recipes",
            element: (
              <ProtectedRoute>
                <UserRecipes />
              </ProtectedRoute>
            ),
          },
          {
            path: "profile",
            element: (
              <ProtectedRoute>
                <UserSettings />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
