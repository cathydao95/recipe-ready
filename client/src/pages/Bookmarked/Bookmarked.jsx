import { ResultsLayout } from "../../components";
import { useAppContext } from "../../context/appContext";

const Bookmarked = () => {
  // Destructuring from App context
  const { isLoading, usersBookmarked } = useAppContext();

  // Pass props to Results Layout
  return (
    <ResultsLayout
      recipes={usersBookmarked}
      title="Bookmarked Recipes"
      page="bookmarked"
      isLoading={isLoading}
    />
  );
};

export default Bookmarked;
