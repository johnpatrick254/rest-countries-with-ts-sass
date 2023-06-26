import FilterListIcon from '@mui/icons-material/FilterList';

export const FilterBar =()=>{

    return <>
      <div className="filter">
        <div className="filter-sort">
            <FilterListIcon/>
            <label htmlFor="sort-by-letter">Filter Alphabetically</label>
            <select name="sort-by-letter" >
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
            </select>
        </div>
        <div className="filter-bysize">
            <p>Smaller than Lithuania</p>
        </div>
        <div className="filter-byregion">
           <div className="filter-byregion_title">Filter by Region</div>
           <div className="filter-byregion_value">
            <p>Africa</p>
           </div>
           <div className="filter-byregion_value">
            <p>Americas</p>
           </div>
           <div className="filter-byregion_value">
            <p>Asia</p>
           </div>
           <div className="filter-byregion_value">
            <p>America</p>
           </div>
           <div className="filter-byregion_value">
            <p>Europe</p>
           </div>
           <div className="filter-byregion_value">
            <p>Oceania</p>
           </div>
    
        </div>
      </div>
    </>

}