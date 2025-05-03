import React from "react";
import { Filter } from "lucide-react";

interface FilterDropdownProps {
  filter: string;
  setFilter: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <div className="relative w-full max-w-xs mx-auto">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full appearance-none px-4 py-2.5 text-sm rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 bg-white pr-10"
      >
        <option value="">All Genders</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>
      <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
    </div>
  );
};

export default FilterDropdown;
