import { useState } from "react";

export default function Navbar({ dashboard, setDashboard }) {
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>OverWatch Dashboard</h2>
        <div className="nav-item-group">
          <span className="nav-label">Profile:</span>
          <select className="dropdown-ghost">
            <option>Toronto Stores</option>
            <option>New York Stores</option>
            <option>London Stores</option>
          </select>
        </div>

        <div className="nav-item-group">
          <span className="nav-label">Dashboard:</span>
          <select
            className="dropdown-ghost"
            value={dashboard}
            onChange={(e) => setDashboard(e.target.value)}
          >
            <option value="device">Device Overview</option>
            <option value="map">Network Overview</option>
          </select>
        </div>
      </div>

      <div className="nav-right">
        <div
          className="admin-trigger"
          onClick={() => setAdminMenuOpen(!adminMenuOpen)}
          role="button"
          tabIndex="0"
        >
          <span className="admin-icon">🛡️</span>
          <span className="admin-text">Admin</span>
          <span className="arrow-down">▼</span>
        </div>

        {adminMenuOpen && (
          <div className="admin-menu">
            <div className="admin-menu-item">User Profile</div>
            <div className="admin-menu-item">System Settings</div>
            <div className="admin-menu-divider" />
            <div
              className="admin-menu-item logout"
              onClick={() => alert("Logged out")}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
