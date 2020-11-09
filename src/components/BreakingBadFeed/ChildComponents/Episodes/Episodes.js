import React, { Fragment } from "react";
import { Episode } from "./components";

const Episodes = (props) => {
  const { allEpisodes, allCharacters } = props;

  return (
    <Fragment>
      {allEpisodes.map((episode) => (
        <Episode
          episode={episode}
          key={episode.episode_id}
          allCharacters={allCharacters}
        />
      ))}
    </Fragment>
  );
};

export default Episodes;
