import search from "../../assets/icon-search.svg";
import ClipLoader from "react-spinners/ClipLoader";

type InputProps = {
  word: string;
  isLoading: boolean;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fetchData: (name: string) => void;
};

export const Input = ({
  word,
  isLoading,
  handleInput,
  fetchData,
}: InputProps) => {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Search for any word..."
        className="input"
        value={word}
        onChange={handleInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchData(word);
          }
        }}
      />

      {isLoading ? (
        <ClipLoader size={18} color="#a445ed" className="input-search-icon" />
      ) : (
        <img
          src={search}
          alt="Search"
          onClick={() => fetchData(word)}
          className="input-search-icon"
        />
      )}
    </div>
  );
};
