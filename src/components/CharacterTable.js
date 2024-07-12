import React, { useState, useEffect } from "react";
import { fetchCharacters } from "../api";
import CharacterDetails from "./CharacterDetails";
import Pagination from "./Pagination";

const CharacterTable = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [pageSize, setPageSize] = useState(10); // Default page size
  const [totalPages, setTotalPages] = useState(0); // Toplam sayfa sayısını tutar
  const [sortOrder, setSortOrder] = useState("asc"); // Sıralama durumu

  useEffect(() => {
    const getAllCharacters = async () => {
      setLoading(true);
      try {
        const allCharacters = [];
        let currentPage = 1;
        let totalFetched = 0;
        const maxCharacters = 300; // Maksimum almak istediğiniz karakter sayısı

        while (totalFetched < maxCharacters) {
          const data = await fetchCharacters(currentPage, filters);
          allCharacters.push(...data.results);
          totalFetched += data.results.length;
          if (data.info.next) {
            currentPage++;
          } else {
            break;
          }
        }

        setCharacters(allCharacters);
        setTotalPages(Math.ceil(allCharacters.length / pageSize));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getAllCharacters();
  }, [filters]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(1); // Reset to first page
  };

  const handleSort = () => {
    const sortedCharacters = [...characters].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortOrder === "asc") {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else {
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      }
    });
    setCharacters(sortedCharacters);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredCharacters = characters.filter(
    (character) =>
      (filters.name
        ? character.name.toLowerCase().includes(filters.name.toLowerCase())
        : true) &&
      (filters.location
        ? character.location.name
            .toLowerCase()
            .includes(filters.location.toLowerCase())
        : true)
  );

  const paginatedCharacters = filteredCharacters.slice(startIndex, endIndex);

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Filter by name"
        onChange={handleFilterChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Filter by location"
        onChange={handleFilterChange}
      />
      <button onClick={() => setFilters({})}>Clear Filters</button>
      <div>
        <label htmlFor="pageSize">Results per page: </label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {filteredCharacters.length === 0 ? (
            <p>No result found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th onClick={handleSort}>
                    Name {sortOrder === "asc" ? "▲" : "▼"}
                  </th>
                  <th>Location</th>
                  <th>Gender</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCharacters.map((character) => (
                  <tr
                    key={character.id}
                    onClick={() => handleCharacterClick(character)}
                  >
                    <td>{character.name}</td>
                    <td>{character.location.name}</td>
                    <td>{character.gender}</td>
                    <td>{character.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
    </div>
  );
};

export default CharacterTable;
