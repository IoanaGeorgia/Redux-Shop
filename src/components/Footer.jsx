import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";
import { memo } from "react";
function Footer() {

  return (
    <footer className={styles.footer}>
      <span>
        <div className={styles.logo}>CasaFashion</div>
      </span>
      <p>
        We are an online shopping service, your number one source for products of all types.
        We're dedicated to giving you the very best, with a
        focus on quality, customer service, and uniqueness. Founded in 1990,
        CasaFashion has come a long way from its beginnings in Berlin. When Ingrid Liechstenstein and Gilbert Lex first started out, their passion for
        Our wish for worldwide accessibility drove them to found this company, and gave
        them the impetus to turn hard work and inspiration into a booming online
        store. 
      </p>
      <span>
        <a target="_blank">Customer Care</a>
        <a target="_blank">Legal Concerns</a>

        <Link to="/contact">Contact</Link>
      </span>
    </footer>
  );
}

export default memo(Footer);
