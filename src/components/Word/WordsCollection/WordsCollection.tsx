import { useNavigate } from "react-router";

type WordsCollection = {
  title: string;
  words: string[];
  fetchData: (name: string) => void;
};

export const WordsCollection = ({
  title,
  words,
  fetchData,
}: WordsCollection) => {
  const navigate = useNavigate();

  const handleOnClick = (word: string) => {
    fetchData(word);
    navigate(`/${word}`);
  };

  if (words.length === 0) {
    return null;
  }

  return (
    <div className="words-collection">
      <p className="words-collection__title">{title}</p>

      <div className="words-collection__list">
        {words.map((word, index) => (
          <p
            className="words-collection__item"
            onClick={() => {
              handleOnClick(word);
            }}
            key={`${word}-${index}`}
          >
            {word}
          </p>
        ))}
      </div>
    </div>
  );
};
