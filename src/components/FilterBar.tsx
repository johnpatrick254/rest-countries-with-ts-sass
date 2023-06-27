import FilterListIcon from '@mui/icons-material/FilterList';

interface FilterProps{
    filterHandler:(query:string,region?:string)=>void
}

export const FilterBar:React.FC <FilterProps> = ({filterHandler})=>{

    return <>
      <div className="filter">
        <div className="filter-sort">
            <FilterListIcon/>
            <label htmlFor="sort-by-letter">Filter Alphabetically</label>
            <select onChange ={
                (e:React.ChangeEvent)=>{
                filterHandler(e.target.value!);
                }
            } name="sort-by-letter" >
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
            </select>
        </div>
        <div onClick={()=>{
                filterHandler('smaller than lithuania');
            }} className="filter-bysize">
            <p>Smaller than Lithuania</p>
        </div>
        <div className="filter-byregion">
           <div className="filter-byregion_title">Filter by Region</div>
           <div onClick={()=>{
                filterHandler('Region','Africa');
            }} className="filter-byregion_value">
            <p>Africa</p>
           </div>
           <div onClick={()=>{
                filterHandler('Region','Americas');
            }} className="filter-byregion_value">
            <p>Americas</p>
           </div>
           <div onClick={()=>{
                filterHandler('Region','Asia');
            }} className="filter-byregion_value">
            <p>Asia</p>
           </div>
           <div onClick={()=>{
                filterHandler('Region','Europe');
            }} className="filter-byregion_value">
            <p>Europe</p>
           </div>
           <div onClick={()=>{
                filterHandler('Region','Oceania');
            }} className="filter-byregion_value">
            <p>Oceania</p>
           </div>
        </div>
        <button onClick={()=>{
                filterHandler('Reset');
            }}>Reset Filters</button>
      </div>
    </>

}

