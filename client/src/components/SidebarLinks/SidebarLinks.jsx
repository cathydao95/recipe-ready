import styles from "./styles.module.scss";
import { LinkItem } from "../index";

const SidebarLinks = ({ category, links }) => {
  return (
    <div className={styles.link}>
      <div className={styles.category}>{category}</div>
      <ul className={styles.linksContainer}>
        {links.map((link) => (
          <LinkItem key={link.to} to={link.to} onClick={link.onClick}>
            {link.text}
          </LinkItem>
        ))}
      </ul>
    </div>
  );
};

export default SidebarLinks;
