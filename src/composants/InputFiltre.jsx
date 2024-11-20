import React from "react";

const SearchInput = ({ filterText, handleFilterChange }) => {
    return (
        <div className="my-4">
            <input
                type="text"
                placeholder="Rechercher"
                value={filterText}
                onChange={handleFilterChange}
                className="border border-blue-600 p-2 rounded-lg"
            />
        </div>
    );
};

export default SearchInput;
