import { Outlet, Link } from "react-router"

const Sidebar = () => {
  return (
    <div className="container">
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/">
              🏠 Dashboard
            </Link>
          </li>
          <li>
            <Link to="/">
              🔍 Search
            </Link>
          </li>
          <li>
            <Link to="/">
              📖 About
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Sidebar;