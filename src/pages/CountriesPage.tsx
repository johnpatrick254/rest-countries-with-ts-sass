import { useEffect, useState } from "react";
import axios from "axios";
import { FilterBar } from "../components/FilterBar"
import { CountryCard } from "../components/CountryCard";
import { Header } from "../components/Header"
import { Paginate } from "../components/Pagination";

interface CountriesInterface {
    name: string;
    region: string;
    area: 272967.0;
    independent: string;

}

export const CountriesPage: React.FC = () => {

    const [countries, setCountries] = useState<CountriesInterface[]>([])
    const [selectedCountries, setSelectedCountries] = useState<CountriesInterface[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)
    const [pageNum, setPageNum] = useState<number>(1)
    const [totalItems, setTotalItems] = useState<number>(0)
    const lithuaniaArea = 65300.0;


    const fetchCountries = async () => {
        const res = await axios.request<CountriesInterface[]>({
            method: "GET",
            url: "https://restcountries.com/v2/all?fields=name,region,area"
        })

        setCountries(res.data);
        setTotalItems(res.data.length)
        const startIndex = (pageNum - 1) * 7;
        const endIndex = startIndex + 7;
        const slicedCountries = countries.slice(startIndex, endIndex);
        setPageNum(pageNum);
        setSelectedCountries(slicedCountries);
        if (res.data) {
            setLoaded(true);
            handlePageClick(1)
            console.log("data set");
        }
    }


    const handlePageClick = (pageNum: number): void => {
        if (loaded) {
            const startIndex = (pageNum - 1) * 7;
            const endIndex = startIndex + 7;
            const slicedCountries = countries.slice(startIndex, endIndex);

            setPageNum(pageNum);
            setSelectedCountries(slicedCountries);

            console.log("page set on:", pageNum);
            console.log("selected countries:", slicedCountries);
        } else if (countries.length === 0) {
            console.log("empty");
        }
    };




    const handleFilter = (query: string | number, region?: string): void => {
        switch (query) {
            case "Ascending":
                setSelectedCountries(countries.sort((a, b) => a.name.localeCompare(b.name)))
                console.log(query)
                break;

            case "Descending":
                setSelectedCountries(countries.sort((a, b) => b.name.localeCompare(a.name)))
                console.log(query)

                break;

            case "smaller than lithuania":
                setSelectedCountries(countries.filter(country => country.area < lithuaniaArea))
            break
            case "Region":
                setSelectedCountries(countries.filter(country => country.region === region));
                break;

            case "Reset":
                handlePageClick(1)
                break;


            default:
                break;
        }
    }

    useEffect((): void => {
        try {
            fetchCountries();
        } catch (error) {
            console.log(error)
        }
    }, [totalItems])



    return <>
         <Header/>
        <FilterBar filterHandler={handleFilter} />
        <div className="countries">
            {
                loaded && selectedCountries.map((country, index) => <CountryCard key={index} details={country} />)
            }
        </div>
        {loaded && <Paginate itemsPerPage={7} totalItems={countries.length} handleClick={handlePageClick} />
        }    </>
}




