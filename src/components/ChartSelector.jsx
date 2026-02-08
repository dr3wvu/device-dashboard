import { useState, useEffect, useRef } from "react";

export default function ChartSelector({
  charts,
  visibleCharts,
  setVisibleCharts,
}) {
  const [tempSelection, setSelection] = useState(visibleCharts);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setSelection(visibleCharts);
    }
  }, [isOpen, visibleCharts]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApply = () => {
    setVisibleCharts(tempSelection);
    setIsOpen(false);
  };
  return (
    <div className="control-group relative" ref={dropdownRef}>
      <label className="nav-label">Chart Selector</label>
      <button className="dropdown-ghost" onClick={() => setIsOpen(!isOpen)}>
        {Object.values(visibleCharts).filter(Boolean).length} Charts Active
        <span style={{ marginLeft: "8px", opacity: 0.5 }}>▼</span>
      </button>

      {isOpen && (
        <div className="date-popup" style={{ minWidth: "220px" }}>
          <div className="popup-content">
            <div
              className="menu-header"
              style={{
                marginBottom: "12px",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "var(--primary-sapphire)",
              }}
            >
              Visibility
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {Object.keys(charts).map((key) => (
                <label
                  key={key}
                  className="checkbox-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={tempSelection[key]}
                    onChange={() =>
                      setSelection((prev) => ({ ...prev, [key]: !prev[key] }))
                    }
                    style={{ accentColor: "var(--primary-sapphire)" }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      color: tempSelection[key] ? "#fff" : "var(--text-dim)",
                    }}
                  >
                    {key}
                  </span>
                </label>
              ))}
            </div>
            <div
              className="menu-actions"
              style={{
                marginTop: "20px",
                paddingTop: "12px",
                borderTop: "1px solid var(--border-color)",
              }}
            >
              <button
                className="btn-secondary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={() => handleApply()}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
