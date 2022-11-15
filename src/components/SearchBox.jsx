import React from "react";

const SearchBox = ({ value, onChange }) => {
    return (
        <input
        type="search"
        name="query"
        className="form-control my-3"
        placeholder="Search..."
        value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            // we raise custom event
        />
    );
}
    
export default SearchBox;