import React from 'react';

const FilterSearch = ({filter, handleFilterChange}) => {
    return(
      <div>
        <span> filter shown with: <input value = {filter} onChange = {handleFilterChange}/></span>
      </div>
    )
  }

export default FilterSearch