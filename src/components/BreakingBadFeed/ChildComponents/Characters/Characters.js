import React, { Fragment } from "react";
import { CharacterCard } from "./components";

const Characters = (props) => {
  const { data } = props;
  return (
    <Fragment>
      {data.map((character) => (
        <CharacterCard character={character} key={character.char_id} />
      ))}
    </Fragment>
  );
};

export default Characters;
