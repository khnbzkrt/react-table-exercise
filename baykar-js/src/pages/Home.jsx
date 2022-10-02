import { useEffect, useState } from "react";
import { Card } from "./../components/card";
import { Filter } from "./../components/filter";
import { Pagination } from "./../components/pagination";
import { SearchInput } from "./../components/search";
import { Spinner } from "./../components/spinner";
import { searchHelper } from "./../helpers/searchHelper";

export const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["name", "region"]);
  const [filterParam, setFilterParam] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = searchHelper(
    countries,
    query,
    filterParam,
    searchParam
  ).slice(indexOfFirstRecord, indexOfLastRecord);
  const filters = currentRecords.map((record) => record.region);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setCountries(result);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  if (error) return <>{error.message}</>;
  if (!isLoaded) return <Spinner />;
  return (
    <div className="container m-auto p-4">
      <div className="flex flex-row justify-between my-4">
        <Filter setFilterParam={setFilterParam} filters={filters} />
        <SearchInput query={query} setQuery={setQuery} />
      </div>
      <div className="grid grid-rows-1 md:grid-cols-4 gap-8 mb-10">
        {currentRecords &&
          currentRecords.map((country, index) => (
            <Card country={country} key={index} />
          ))}
      </div>
      <Pagination
        data={searchHelper(countries, query, filterParam, searchParam)}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
