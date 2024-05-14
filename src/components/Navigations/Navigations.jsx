import { NavLink} from "react-router-dom";
import css from './Navigations.module.css'
export default function Navigation() {
    return (
    <nav>
      <NavLink to="/" className={css.link}>Home</NavLink>
      <NavLink to="/movies" className={css.link}>Movies</NavLink>
      </nav>
)}