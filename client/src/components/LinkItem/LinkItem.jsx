import { Link } from "react-router-dom";

// Link component to render page links on sidebar
const LinkItem = ({ to, onClick, children }) => {
  return (
    <Link to={to} onClick={onClick}>
      {children}
    </Link>
  );
};

export default LinkItem;
