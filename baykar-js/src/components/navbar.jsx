import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="container m-auto my-4 flex justify-end gap-4">
      <Link to={"/"} className="block w-fit underline">
        Anasayfa
      </Link>
      <Link to={"/countries"} className="block w-fit underline">
        Ülke Listesi
      </Link>
    </div>
  );
};
