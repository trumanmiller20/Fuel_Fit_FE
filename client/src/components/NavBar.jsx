import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="navsection">
      <NavLink to="/dashboard" className="navlink">
        Dashboard
      </NavLink>
      <NavLink to="/calculate" className="navlink">
        MyMacros
      </NavLink>
      <NavLink to="/grocery" className="navlink">
        Grocery Plan
      </NavLink>
      <NavLink to="/recipe" className="navlink">
        Recipe Plan
      </NavLink>
      <NavLink to="/about" className="navlink">
        About
      </NavLink>
      <NavLink to="/faq" className="navlink">
        FAQ
      </NavLink>
    </div>
  )
}
export default NavBar