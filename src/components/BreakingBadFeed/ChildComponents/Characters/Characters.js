import React, { Fragment } from "react";
import { CharacterCard } from "./components";

const Characters = (props) => {
  const { data } = props;
  return (
    <div className="d-flex flex-wrap">
      {data.map((character) => (
        <CharacterCard character={character} key={character.char_id} />
      ))}
    </div>
  );
};

export default Characters;
