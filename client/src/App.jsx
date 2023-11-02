import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  DashboardLayout,
  Register,
  Login,
  ErrorNotFound,
  Results,
  SearchByIngredients,
  Recipe,
  Bookmarked,
  Create,
  UserRecipes,
  UserSettings,
  ProtectedRoute,
  SearchByName,
} from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <ErrorNotFound />,
    children: [
      { index: true, element: <SearchByName /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "search-ingredients", element: <SearchByIngredients /> },
      { path: "results", element: <Results /> },
      { path: "recipes/:id", element: <Recipe /> },

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
