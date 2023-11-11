import { Link } from "react-router-dom";

const LinkItem = ({ to, onClick, children }) => {
  return (
    <Link to={to} onClick={onClick}>
      {children}
    </Link>
  );
};

export default LinkItem;
