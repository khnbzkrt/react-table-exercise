import { Link } from "react-router-dom";

export const Card = ({ country }) => {
  return (
    <Link to={`/${country.name.common.toLowerCase()}`}>
      <div className="grid grid-rows-[200px_minmax(0,_1fr)] shadow-md rounded-md cursor-pointer shadow-gray-200">
        <div className="h-auto md:h-48">
          <img
            src={country.flags.png}
            alt={country.region}
            className="w-full h-full"
          />
        </div>
        <div className="p-2 h-auto md:min-h-[270px] leading-8">
          <h2 className="font-bold text-xl mb-4 border-b pb-2 min-h-[65px]">
            {country.name.official}
          </h2>
          <div>
            <span className="font-bold">Population : </span>
            <span>{country.population}</span>
          </div>
          <div>
            <span className="font-bold">Region : </span>
            <span>{country.region}</span>
          </div>
          <div className="flex flex-wrap">
            <span className="font-bold">Timezones : </span>
            {country.timezones.map((tz) => (
              <span className="rounded-md m-1 text-sm">{tz}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
