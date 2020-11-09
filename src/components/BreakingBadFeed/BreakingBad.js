import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../../commonComponent";
import { Characters, Episodes } from "./ChildComponents";
import "./BreakingBadFeed.css";

const BreakingBad = () => {
  const [allChars, setChars] = useState([]);
  const [allEpisodes, setEpisodes] = useState([]);
  const [optionSelected, setOption] = useState("characters");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetching all characters
    axios.get("https://www.breakingbadapi.com/api/characters")
      .then((data) => {
        setChars(data.data);
      })
      .catch((err) => console.log(err));
  }, [allChars.length]);

  useEffect(() => {
    // fetching all episodes
    axios.get("https://www.breakingbadapi.com/api/episodes")
      .then((data) => {
        setEpisodes(data.data);
        allChars.length > 0 && setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [allEpisodes.length, allChars.length]);

  // handle Option Change
  const handleSelectChange = (e) => {
    setOption(e.target.value);
  };

  return (
    <div className="feed-container p-4">
      <div className="select-container pr-15">
        <select
          className="form-control cursor-pointer col-md-2 ml-auto"
          value={optionSelected}
          onChange={handleSelectChange}
        >
          <option value="characters">View By Characters</option>
          <option value="episodes">View By Episodes</option>
        </select>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center"> <Loader /> </div>
      ) : optionSelected === "characters" ? (
        <Characters data={allChars} />
      ) : (
        <Episodes allCharacters={allChars} allEpisodes={allEpisodes} />
      )}
    </div>
  );
};

export default BreakingBad;
