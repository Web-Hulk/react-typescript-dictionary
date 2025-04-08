import { useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import search from "../../assets/icon-search.svg";

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
  const navigate = useNavigate();

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
            navigate(`/${word}`);
          }
        }}
      />

      {isLoading ? (
        <ClipLoader size={18} color="#a445ed" className="input-search-icon" />
      ) : (
        <img
          src={search}
          alt="Search"
          className="input-search-icon"
          onClick={() => {
            fetchData(word);
            navigate(`/${word}`);
          }}
        />
      )}
    </div>
  );
};
