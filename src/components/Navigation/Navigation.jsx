import style from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const styleLink = ({ isActive }) => {
  return clsx(style.link, isActive && style.active);
};

const Navigation = () => {
  return (
    <nav className={style.nav}>
      <NavLink className={styleLink} to="/">
        Home
      </NavLink>
      <NavLink className={styleLink} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
};
export default Navigation;
