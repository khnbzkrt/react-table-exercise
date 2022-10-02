import { useEffect, useState } from "react";
import { Table } from "../components/table";
import { createColumnHelper } from "@tanstack/react-table";
import { Spinner } from "../components/spinner";

export const CountryList = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState([]);
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
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("currencies", {
      header: "Currencies",
      cell: (info) => (
        <div className="flex flex-wrap">
          {Object.keys(info.getValue()).map((key) => info.getValue()[key].name)}
        </div>
      ),
    }),
    columnHelper.accessor("name.common", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("region", {
      header: "Region",
    }),

    columnHelper.accessor("startOfWeek", {
      header: "Start Of Week",
      cell: (info) => info.getValue(),
    }),
  ];
  if (error) return <>{error.message}</>;
  if (!isLoaded) return <Spinner />;
  return <Table data={countries} columns={columns} />;
};
