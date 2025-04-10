import { useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import search from "../../assets/icon-search.svg";
import "./Input.scss";

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

  const fetchAndNavagate = (word: string) => {
    fetchData(word);
    navigate(`/${word}`);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Search for any word..."
        className="input__field"
        value={word}
        onChange={handleInput}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchAndNavagate(word);
          }
        }}
      />

      {isLoading ? (
        <ClipLoader size={18} color="#a445ed" className="input__icon--search" />
      ) : (
        <img
          src={search}
          alt="Search"
          className="input__icon-search"
          onClick={() => {
            fetchAndNavagate(word);
          }}
        />
      )}
    </div>
  );
};
