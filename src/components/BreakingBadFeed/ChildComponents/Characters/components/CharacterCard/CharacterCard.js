import React from "react";
import { dummyProfile } from "../../../../../../static";
import "./CharacterCard.css";

const CharacterCard = (props) => {
  const {
    character: {
      char_id,
      img,
      name,
      nickname,
      status,
      category,
      occupation,
      portrayed,
      birthday,
    },
  } = props;
  return (
    <div className="col-md-3 mt-4">
      <div className="card character-card p-3">
        {/* For character id 39 image not found error was throwing that's why replaced with dummy image */}
        <div
          className="avatar bg-image m-auto"
          style={{
            backgroundImage: `url('${
              char_id === 39 ? dummyProfile : img ? img : dummyProfile
            }')`,
          }}
        />
        <div className="mt-4 text-light">
          <span className="bold-text mr-2">Name:</span> {name}
        </div>
        <div className="text-light">
          <span className="bold-text mr-2">Status:</span> {status}
        </div>
        <div className="text-light">
          <span className="bold-text mr-2">Category:</span> {category}
        </div>
        <div className="text-light">
          <span className="bold-text mr-2">Occupation:</span> {occupation.join(", ")}
        </div>
        <div className="text-light">
          <span className="bold-text mr-2">Portrayed:</span> {portrayed}
        </div>
        <div className="text-light">
          <span className="bold-text mr-2">Nickname:</span> {nickname}
        </div>
        <div className="text-light">
          <span className="bold-text mr-2">Birthday:</span> {birthday}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
