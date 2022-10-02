export const Filter = ({ setFilterParam, filters }) => {
  return (
    <select
      onChange={(e) => {
        setFilterParam(e.target.value);
      }}
      className="custom-select border w-52"
      aria-label="Filter Countries By Region"
    >
      <option value="All">Tümü</option>
      {filters &&
        filters.map((filter, index) => (
          <option key={index} value={filter}>
            {filter}
          </option>
        ))}
    </select>
  );
};
