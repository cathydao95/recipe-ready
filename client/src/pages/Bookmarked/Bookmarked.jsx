import { ResultsLayout, SmallLoader } from "../../components";
import { useAppContext } from "../../context/appContext";

const Bookmarked = () => {
  // Destructuring from App context
  const { usersBookmarked, resultsLoaded } = useAppContext();

  // Pass props to Results Layout
  return !resultsLoaded ? (
    <SmallLoader />
  ) : (
    <ResultsLayout
      recipes={usersBookmarked}
      title="Bookmarked Recipes"
      page="bookmarked"
    />
  );
};

export default Bookmarked;
