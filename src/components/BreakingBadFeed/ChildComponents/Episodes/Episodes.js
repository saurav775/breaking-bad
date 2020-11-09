import React, { Fragment } from "react";
import { Episode } from "./components";

const Episodes = (props) => {
  const { allEpisodes } = props;

  return (
    <Fragment>
      {allEpisodes.map((episode) => (
        <Episode episode={episode} key={episode.episode_id} />
      ))}
    </Fragment>
  );
};

export default Episodes;
