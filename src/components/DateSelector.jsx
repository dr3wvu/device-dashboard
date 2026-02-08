import { useState, useRef, useEffect } from "react";

const labelMap = {
  today: "Today",
  lastWeek: "Last Week",
  lastMonth: "Last Month",
  custom: "Custom Range",
};

export default function DateSelector({ onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [mode, setMode] = useState("lastWeek");
  const [customRange, setCustomRange] = useState({ from: "", to: "" });
  const dropdownRef = useRef(null);

  // Default to Last Week on Mount
  useEffect(() => {
    const now = new Date();
    const start = new Date();
    start.setDate(now.getDate() - 7);
    onChange({
      from: start.toISOString().split("T")[0],
      to: now.toISOString().split("T")[0],
    });
  }, []);

  const handleSelect = (id) => {
    if (id === "custom") return setShowCustom(true);

    const now = new Date();
    const start = new Date(now);
    if (id === "today") start.setHours(0, 0, 0, 0);
    else if (id === "lastWeek") start.setDate(now.getDate() - 7);
    else if (id === "lastMonth") start.setMonth(now.getMonth() - 1);

    setMode(id);
    onChange({
      from: start.toISOString().split("T")[0],
      to: now.toISOString().split("T")[0],
    });
    setIsOpen(false);
  };

  return (
    <div className="control-group relative" ref={dropdownRef}>
      <label className="nav-label">Date Range</label>
      <button
        className="dropdown-ghost"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowCustom(false);
        }}
        style={{ minWidth: "160px", textAlign: "left" }}
      >
        {mode === "custom" && customRange.from
          ? `${customRange.from} — ${customRange.to}`
          : labelMap[mode] || mode}
        <span style={{ float: "right", opacity: 0.5, marginLeft: "10px" }}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="date-popup">
          {!showCustom ? (
            <div className="popup-content">
              <div className="menu-header">Select Period</div>
              {["today", "lastWeek", "lastMonth", "custom"].map((id) => (
                <div
                  key={id}
                  className={`menu-item-clean ${mode === id ? "active" : ""}`}
                  onClick={() => handleSelect(id)}
                >
                  {id
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </div>
              ))}
            </div>
          ) : (
            <div className="popup-content">
              <div className="menu-header">
                <button
                  className="back-btn"
                  onClick={() => setShowCustom(false)}
                >
                  ← Back
                </button>
                Custom Range
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {["from", "to"].map((key) => (
                  <div key={key} className="control-group">
                    <label className="input-label">
                      {key === "from" ? "Start" : "End"}
                    </label>
                    <input
                      type="date"
                      className="date-input-minimal"
                      value={customRange[key]}
                      onChange={(e) =>
                        setCustomRange((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
                <button
                  className="btn-primary full-width"
                  onClick={() => {
                    if (customRange.from && customRange.to) {
                      setMode("custom");
                      onChange(customRange);
                      setIsOpen(false);
                    }
                  }}
                >
                  Apply Range
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
