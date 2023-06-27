import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useState } from 'react';
interface FilterProps {
    filterHandler: (query: string, region?: string) => void
}

export const FilterBar: React.FC<FilterProps> = ({ filterHandler }) => {
    const [showRegions, setShowRegions] = useState<boolean>(false)
    const [sortAscending, setSortAscending] = useState<boolean>(true)
    const styles = {

        largeIcon: {
            width: 33,
            height: 33,
        }
    }

    return <>
        <div className="filter">
            <div className="filter-sort">
                <FilterListIcon />
                <label htmlFor="sort-by-letter">{sortAscending ? "A-Z":"Z-A"}</label>
                <select onChange={
                    (e: React.ChangeEvent) => {
                        filterHandler(e.target.value!);
                        setSortAscending(!sortAscending);
                    }
                } name="sort-by-letter" >
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                </select>
            </div>
            <div onClick={() => {
                filterHandler('smaller than lithuania');
            }} className="filter-bysize">
                <p>Smaller than Lithuania</p>
            </div>
            <div onClick={() => { setShowRegions(!showRegions) }} className={`filter-byregion ${showRegions ? "showregion" : ""}`} >
                <div className="filter-byregion_title">Filter by Region {showRegions ? <ExpandLessIcon sx={styles.largeIcon}  /> : <ExpandMoreIcon sx={styles.largeIcon} />}</div>
                <div onClick={() => {
                    filterHandler('Region', 'Africa');
                }} className="filter-byregion_value">
                    <p>Africa</p>
                </div>
                <div onClick={() => {
                    filterHandler('Region', 'Americas');
                }} className="filter-byregion_value">
                    <p>Americas</p>
                </div>
                <div onClick={() => {
                    filterHandler('Region', 'Asia');
                }} className="filter-byregion_value">
                    <p>Asia</p>
                </div>
                <div onClick={() => {
                    filterHandler('Region', 'Europe');
                }} className="filter-byregion_value">
                    <p>Europe</p>
                </div>
                <div onClick={() => {
                    filterHandler('Region', 'Oceania');
                }} className="filter-byregion_value">
                    <p>Oceania</p>
                </div>
            </div>
            <button onClick={() => {
                filterHandler('Reset');
            }}>Reset Filters</button>
        </div>
    </>

}

