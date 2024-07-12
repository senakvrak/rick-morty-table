import React from "react";

const CharacterDetails = ({ character }) => {
  return (
    <div>
      <h2>{character.name}</h2>
      <p>
        <strong>Location:</strong> {character.location.name}
      </p>
      <p>
        <strong>Species:</strong> {character.species}
      </p>
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Status:</strong> {character.status}
      </p>
      <img src={character.image} alt={character.name} />
    </div>
  );
};

export default CharacterDetails;
