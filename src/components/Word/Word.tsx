import play from "../../assets/icon-play.svg";
import { DictionaryInterface } from "../../types";
import { Meaning } from "./Meaning/Meaning";
import { Sources } from "./Sources/Sources";
import "./Word.scss";

type WordProps = {
  data: DictionaryInterface[];
  fetchData: (name: string) => void;
  urls: string[];
};

export const Word = ({ data, fetchData, urls }: WordProps) => {
  const handlePlayPhoneticButton = (wordAudio: string) => {
    const audioElement = new Audio(wordAudio);
    audioElement.play();
  };

  return (
    <div className="word-meanings-container">
      {data?.map(({ word, phonetic, phonetics, meanings }, index) => {
        const wordAudio =
          phonetics?.filter((phonetic) => phonetic.audio !== "") || [];

        return (
          <div key={`${word}-${index}`}>
            <div className="word-container">
              <div>
                <h1 className="word">{word}</h1>
                <p className="phonetic">{phonetic}</p>
              </div>

              {wordAudio?.length > 0 ? (
                <img
                  src={play}
                  alt="Play"
                  className="content-icon-play"
                  onClick={() => handlePlayPhoneticButton(wordAudio[0].audio)}
                />
              ) : null}
            </div>

            <Meaning meanings={meanings} fetchData={fetchData} />
          </div>
        );
      })}

      <Sources urls={urls} />
    </div>
  );
};
