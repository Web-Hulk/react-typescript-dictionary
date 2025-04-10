import React from "react";
import play from "../../assets/icon-play.svg";
import { DictionaryInterface } from "../../types";
import { Sources } from "./Sources/Sources";
import { WordsCollection } from "./WordsCollection/WordsCollection";

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
          <React.Fragment key={`${word}-${index}`}>
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
            <div className="word-meaning">
              {meanings.map(
                ({ partOfSpeech, definitions, synonyms, antonyms }, index) => {
                  const { definition } = definitions[0];

                  return (
                    <div className="word-meaning-box" key={`Word box-${index}`}>
                      <div className="part-of-speech-container">
                        <p className="meaning-partOfSpeech">{partOfSpeech}</p>
                        <div className="full-width-line" />
                      </div>

                      {definition.length !== 0 && (
                        <div className="words-collection">
                          <p className="words-collection__title">Meaning</p>

                          <ul className="single-box-list">
                            {definitions.map(
                              (
                                { definition, synonyms, antonyms, example },
                                index
                              ) => (
                                <React.Fragment key={`${definition}-${index}`}>
                                  <li className="definition-text">
                                    {definition}
                                  </li>

                                  {example && (
                                    <p className="definition-text example">
                                      "{example}"
                                    </p>
                                  )}

                                  <WordsCollection
                                    title="Synonyms"
                                    words={synonyms}
                                    fetchData={fetchData}
                                  />

                                  <WordsCollection
                                    title="Antonyms"
                                    words={antonyms}
                                    fetchData={fetchData}
                                  />
                                </React.Fragment>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      <WordsCollection
                        title="Synonyms"
                        words={synonyms}
                        fetchData={fetchData}
                      />

                      <WordsCollection
                        title="Antonyms"
                        words={antonyms}
                        fetchData={fetchData}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </React.Fragment>
        );
      })}

      <Sources urls={urls} />
    </div>
  );
};
