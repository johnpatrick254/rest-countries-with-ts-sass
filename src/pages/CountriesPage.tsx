import { useEffect, useState } from "react";
import axios from "axios";
import { FilterBar } from "../components/FilterBar";
import { CountryCard } from "../components/CountryCard";
import { Header } from "../components/Header";
import { Paginate } from "../components/Pagination";
import { dummydata } from "./dummydata"

interface CountriesInterface {
  name: string;
  region: string;
  area: number;
  independent: boolean;
}

export const CountriesPage: React.FC = () => {
  const [countries, setCountries] = useState<CountriesInterface[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CountriesInterface[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<CountriesInterface[]>(dummydata);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const lithuaniaArea = 65300;

  const handlePageClick = (pageNumber: number): void => {

    if (selectedCountries.length === 0) console.log("empty");
    setPageNum(pageNumber);
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    const slicedCountries = filteredCountries.filter((_country, index) => index >= startIndex && index < endIndex);
    setSelectedCountries(slicedCountries);
    setTotalItems(filteredCountries.length);
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
        {
          setFilteredCountries(
            countries.filter((country) => country.area < lithuaniaArea)
          );
          setTotalItems(filteredCountries.length)
          const startIndex = 0;
          const endIndex = 5;
          const slicedCountries = filteredCountries.filter((_country, index) => index >= startIndex && index < endIndex);
          setSelectedCountries(slicedCountries);
        }
        break;
      case "Region":
        {
          setFilteredCountries(
            countries.filter((country) => country.region === region)
          );
          setTotalItems(filteredCountries.length);
          const startIndex = 0;
          const endIndex = 5;
          const slicedCountries = filteredCountries.filter((_country, index) => index >= startIndex && index < endIndex);
          setSelectedCountries(slicedCountries);
        }
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
      const startIndex = 0
      const endIndex = 5;
      const slicedCountries = res.data.slice(startIndex, endIndex);
      setSelectedCountries(slicedCountries);
      setLoaded(true);
      console.log("initial data set:", slicedCountries);
    });
  };

  useEffect((): void => {
    try {
      fetchCountries();
    } catch (error) {
      console.log(error);
    }


  }, []);

  useEffect((): void => {
    handlePageClick(pageNum);
  }, [filteredCountries.length,totalItems]);

  return (
    <>
      <Header />
      <FilterBar filterHandler={handleFilter} />
      <div className="countries">
        {selectedCountries.map((country, index) => (
          <CountryCard loading={loaded} key={index} details={country} />
        ))}
      </div>
      {loaded && (
        <Paginate
          itemsPerPage={5}
          totalItems={filteredCountries.length}
          handleClick={handlePageClick}
          currentPage={pageNum}
        />
      )}
    </>
  );
};
