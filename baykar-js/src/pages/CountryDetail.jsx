import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spinner } from "../components/spinner";

export const CountryDetail = () => {
  const location = useLocation();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [country, setCountry] = useState(null);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setCountry(
          result.find(
            (x) =>
              x.name.common.toLowerCase() == location.pathname.split("/")[1]
          )
        );
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  if (error) return <>{error.message}</>;
  if (!isLoaded) return <Spinner />;
  return (
    <div className="container m-auto">
      {country && (
        <div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col justify-start items-center">
              <div className="mb-3">
                <strong className="text-2xl">Flag</strong>
              </div>
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-2/3 h-full"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="mb-3">
                <strong className="text-2xl">Coat Of Arms</strong>
              </div>
              <img
                src={country.coatOfArms.png}
                alt={country.name.common}
                className="w-2/3 h-full"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold my-3 border-b py-4">
            {country.name.common}
          </h1>
          <div className="grid grid-cols-3">
            <div className="leading-10">
              <strong>Region : </strong>
              <span>{country.region}</span>
            </div>
            <div className="leading-10">
              <strong>Capital : </strong>
              <span>{country.capital}</span>
            </div>
            <div className="leading-10">
              <strong>Car Sign : </strong>
              <span className="mr-3">{country.car.signs}</span>
            </div>
            <div className="leading-10">
              <strong>Continents : </strong>
              <span>{country.continents}</span>
            </div>
            <div className="leading-10">
              <strong>Currencies : </strong>
              <span>
                {Object.keys(country.currencies).map(
                  (key) => country.currencies[key].name
                )}
                {"  "}-{"  "}
                {Object.keys(country.currencies).map(
                  (key) => country.currencies[key].symbol
                )}
              </span>
            </div>
            <div className="leading-10">
              <strong>Fifa : </strong>
              <span>{country.fifa}</span>
            </div>
            <div className="leading-10">
              <strong>Languages : </strong>
              <span>
                {Object.keys(country.languages).map(
                  (key) => country.languages[key]
                )}
              </span>
            </div>
            <div className="leading-10">
              <strong>Maps : </strong>
              <a
                href={country.maps.googleMaps}
                target="_blank"
                className="text-blue-500 underline"
              >
                {country.maps.googleMaps}
              </a>
            </div>
            <div className="leading-10">
              <strong>Population : </strong>
              <span>{country.population}</span>
            </div>
            <div className="leading-10">
              <strong>Start Of Week : </strong>
              <span>{country.startOfWeek}</span>
            </div>
            <div className="leading-10">
              <strong>Subregion : </strong>
              <span>{country.subregion}</span>
            </div>
            <div className="leading-10">
              <strong>Timezones : </strong>
              <span>{country.timezones}</span>
            </div>
            <div className="leading-10">
              <strong>Status : </strong>
              <span>{country.status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
