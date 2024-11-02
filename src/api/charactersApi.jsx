export const fetchCharacters = async (page = 1) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  if (!response.ok) {
    throw new Error("Error fetching characters");
  }
  return response.json();
};

export const fetchCharacterById = async (id) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  if (!response.ok) {
    throw new Error("Error fetching character");
  }
  return response.json();
};
