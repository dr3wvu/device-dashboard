import { useFilters } from "./FilterContent";

export default function () {
  const { filters, updateFilter } = useFilters();

  const labelMap = {
    osVersion: " OS Version",
    manufacturer: " Manufacturers",
    signalStrength: "Signal Strength",
  };

  const activefilters = Object.entries(filters).filter(([_, value]) => !!value);

  if (activefilters.length === 0) {
    return null;
  }

  return (
    <div className="filter-container">
      {activefilters.map(([key, value]) => (
        <div key={key} className="filter-tag">
          <span className="filter-key">{labelMap[key] || key}:</span>
          <span className="filter-value">{value}</span>

          <button
            onClick={() => updateFilter(key, value)}
            className="tag-close-btn"
          >
            x
          </button>
        </div>
      ))}
      <button
        className="clear-all-btn"
        onClick={() =>
          activefilters.forEach(([key, value]) => updateFilter(key, value))
        }
      >
        Clear All
      </button>
    </div>
  );
}
