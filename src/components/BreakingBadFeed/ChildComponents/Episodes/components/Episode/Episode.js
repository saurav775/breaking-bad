import React, { useEffect, useState } from "react";
import Characters from "../../../Characters";
import "./Episode.css";

const Episode = (props) => {
  const {
    episode: { episode, characters, season, title, air_date },
    allCharacters,
  } = props;

  const [episodeCharacters, setEpisodeCharacters] = useState([]);

  // filtering characters as per episode
  useEffect(() => {
    const chars = [];
    allCharacters.forEach((element) => {
      if (characters.includes(element.name)) {
        chars.push(element);
      }
    });
    setEpisodeCharacters(chars);
  }, [episodeCharacters.length]);

  return (
    <div className="mt-5">
      <div className="col-md-12">
        <div className="episode-card text-light p-3 d-flex justify-content-between">
          <div className="">
            <span className="bold-text mr-2">Season:</span> {season}
          </div>
          <div className="">
            <span className="bold-text mr-2">Episode:</span> {episode}
          </div>
          <div className="">
            <span className="bold-text mr-2">Title:</span> {title}
          </div>
          <div className="">
            <span className="bold-text mr-2">On Air:</span> {air_date}
          </div>
        </div>
      </div>
      <Characters data={episodeCharacters} />
    </div>
  );
};

export default Episode;
