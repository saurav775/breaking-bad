import React, { useState, Fragment } from "react";
import Pagination from "react-js-pagination";
import { CharacterCard } from "./components";

const Characters = (props) => {
  const { data } = props;

  const [activePage, setActivePage] = useState(1);
  const [paginatedData, setPaginatedData] = useState(
    data.slice(0, data.length > 20 ? 20 : data.length)
  );

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setPaginatedData(
      data.slice(
        pageNumber === 1 ? 0 : (pageNumber - 1) * 20,
        data.length < (pageNumber - 1) * 20 + 20
          ? data.length
          : (pageNumber - 1) * 20 + 20
      )
    );
  };

  return (
    <Fragment>
      <div className="d-flex flex-wrap mb-4">
        {data.length > 20 ? paginatedData.map((character) => (
          <CharacterCard character={character} key={character.char_id} />
        )) : (
          data.map((character) => (
            <CharacterCard character={character} key={character.char_id} />
          ))
        )}
      </div>
      {
        data.length > 20 && (
          <div className="col-md-12">
            <Pagination
              activePage={activePage}
              itemsCountPerPage={20}
              totalItemsCount={data.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        )
      }
    </Fragment>
  );
};

export default Characters;
