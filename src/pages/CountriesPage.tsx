import { useEffect, useState } from "react";
import axios from "axios";
import { FilterBar } from "../components/FilterBar";
import { CountryCard } from "../components/CountryCard";
import { Header } from "../components/Header";
import { Paginate } from "../components/Pagination";

interface CountriesInterface {
  name: string;
  region: string;
  area: 272967.0;
  independent: string;
}

export const CountriesPage: React.FC = () => {
  const [countries, setCountries] = useState<CountriesInterface[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CountriesInterface[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<
    CountriesInterface[]
  >([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const lithuaniaArea = 65300;

  const handlePageClick = (pageNum: number): void => {

    if (selectedCountries.length === 0) console.log("empty");
    setPageNum(pageNum);
    const startIndex = (pageNum - 1) * 7;
    const endIndex = startIndex + 7;
    const slicedCountries = filteredCountries.slice(startIndex, endIndex);
    setSelectedCountries(slicedCountries);
    setTotalItems(filteredCountries.length);
    console.log("page set on:", pageNum);
    console.log("selected countries:", slicedCountries);
  };

  const handleFilter = (query: string | number, region?: string): void => {
    switch (query) {
      case "Ascending":
        setFilteredCountries(
          filteredCountries.sort((a, b) => a.name.localeCompare(b.name))
        );
        handlePageClick(pageNum);

        break;

      case "Descending":
        setFilteredCountries(
          filteredCountries.sort((a, b) => b.name.localeCompare(a.name))
        );
        handlePageClick(pageNum);


        break;

      case "smaller than lithuania":
        console.log("selected countries before filter :", totalItems);
        setFilteredCountries(
          countries.filter((country) => country.area < lithuaniaArea)
        );
        setTotalItems(filteredCountries.length)
        handlePageClick(1);
        console.log("selected countries after filter :", totalItems);

        break;
      case "Region":
        setFilteredCountries(
          countries.filter((country) => country.region === region)
        );
        setTotalItems(filteredCountries.length);
        handlePageClick(1);

        break;

      case "Reset":
        setFilteredCountries(countries);
        setTotalItems(filteredCountries.length);
        handlePageClick(1);
        break;

      default:
        break;
    }
  };

  const fetchCountries = async () => {
    axios.request<CountriesInterface[]>({
      method: "GET",
      url: "https://restcountries.com/v2/all?fields=name,region,area",
    }).then(res => {
      setCountries(res.data);
      setFilteredCountries(res.data);
      setTotalItems(filteredCountries.length);
      const startIndex = (pageNum - 1) * 7;
      const endIndex = startIndex + 7;
      const slicedCountries = res.data.slice(startIndex, endIndex);
      setSelectedCountries(slicedCountries);
      setLoaded(true);
      console.log("initial data set");
    });
  };

  useEffect((): void => {
    try {
      fetchCountries();
    } catch (error) {
      console.log(error);
    }


  }, []);

  return (
    <>
      <Header />
      <FilterBar filterHandler={handleFilter} />
      <div className="countries">
        {selectedCountries.map((country, index) => (
          <CountryCard key={index} details={country} />
        ))}
      </div>
      {loaded && (
        <Paginate
          itemsPerPage={7}
          totalItems={filteredCountries.length}
          handleClick={handlePageClick}
          currentPage={pageNum}
        />
      )}
    </>
  );
};
