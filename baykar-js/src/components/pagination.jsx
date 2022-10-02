export const Pagination = ({
  data,
  recordsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const nPages = Math.ceil(data.length / recordsPerPage);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav>
      <ul className="grid grid-flow-col w-3/4 m-auto justify-center gap-3">
        <li className="w-fit">
          <a
            href="#"
            onClick={prevPage}
            className="bg-gray-400 text-white  p-2"
          >
            Prev
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber} className="w-fit">
            <a
              href="#"
              onClick={() => setCurrentPage(pgNumber)}
              className={`bg-gray-100 p-2 ${
                currentPage == pgNumber ? "bg-gray-800 text-white" : ""
              }`}
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="w-fit">
          <a href="#" onClick={nextPage} className="bg-gray-400 text-white p-2">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
