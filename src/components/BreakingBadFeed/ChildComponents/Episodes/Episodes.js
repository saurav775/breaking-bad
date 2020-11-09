import React, { useState, Fragment } from "react";
import Pagination from "react-js-pagination";
import { Episode } from "./components";

const Episodes = (props) => {
  const { allEpisodes, allCharacters } = props;

  const [activePage, setActivePage] = useState(1);
  const [paginatedData, setPaginatedData] = useState(
    allEpisodes.slice(0, allEpisodes.length > 10 ? 10 : allEpisodes.length)
  );

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setPaginatedData(
      allEpisodes.slice(
        pageNumber === 1 ? 0 : (pageNumber - 1) * 10,
        allEpisodes.length < (pageNumber - 1) * 10 + 10
          ? allEpisodes.length
          : (pageNumber - 1) * 10 + 10
      )
    );
  };

  return (
    <Fragment>
      {paginatedData.map((episode) => (
        <Episode
          episode={episode}
          key={episode.episode_id}
          allCharacters={allCharacters}
        />
      ))}
      <div className="col-md-12 mt-4">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={allEpisodes.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </Fragment>
  );
};

export default Episodes;
