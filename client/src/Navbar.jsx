// Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="main">
      <nav>
        <h2>
        <Link to="/" className="link">Medicine Alert</Link>
        </h2>
        <h2 className="btn">
          <Link to="/addreminder" className="link">Add Reminder</Link>
        </h2>
      </nav>
    </div>
  );
};

export default Navbar;
