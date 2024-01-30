import { Link } from "react-router-dom";
import s from "./Logo.module.scss";

export const Logo = () => (
  <Link className={s.link} to="/">
    <svg
      className={s.logo}
      width="32"
      height="32"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  </Link>
);
