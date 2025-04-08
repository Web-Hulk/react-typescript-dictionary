import React from "react";
import { useNavigate } from "react-router";
import new_window from "../../assets/icon-new-window.svg";
import play from "../../assets/icon-play.svg";
import { DictionaryInterface } from "../../types";

type WordProps = {
  data: DictionaryInterface[];
  fetchData: (name: string) => void;
  urls: string[];
};

export const Word = ({ data, fetchData, urls }: WordProps) => {
  const navigate = useNavigate();

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
                        <div className="single-box">
                          <p className="title">Meaning</p>

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

                                  {synonyms.length !== 0 && (
                                    <div className="single-box">
                                      <p className="title">Synonyms</p>

                                      <div className="values-box">
                                        {synonyms.map((synonym, index) => (
                                          <p
                                            className="value"
                                            onClick={() => {
                                              fetchData(synonym);
                                              navigate(`/${synonym}`);
                                            }}
                                            key={`${synonym}-${index}`}
                                          >
                                            {synonym}
                                          </p>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {antonyms.length !== 0 && (
                                    <div className="single-box">
                                      <p className="title">Antonyms</p>

                                      <div className="values-box">
                                        {antonyms.map((antonym, index) => (
                                          <p
                                            className="value"
                                            onClick={() => {
                                              fetchData(antonym);
                                              navigate(`/${antonym}`);
                                            }}
                                            key={`${antonym}-${index}`}
                                          >
                                            {antonym}
                                          </p>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </React.Fragment>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {synonyms.length !== 0 && (
                        <div className="single-box">
                          <p className="title">Synonyms</p>

                          <div className="values-box">
                            {synonyms.map((synonym, index) => (
                              <p
                                className="value"
                                onClick={() => {
                                  fetchData(synonym);
                                  navigate(`/${synonym}`);
                                }}
                                key={`${synonym}-${index}`}
                              >
                                {synonym}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {antonyms.length !== 0 && (
                        <div className="single-box">
                          <p className="title">Antonyms</p>

                          <div className="values-box">
                            {antonyms.map((antonym, index) => (
                              <p
                                className="value"
                                onClick={() => {
                                  fetchData(antonym);
                                  navigate(`/${antonym}`);
                                }}
                                key={`${antonym}-${index}`}
                              >
                                {antonym}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </React.Fragment>
        );
      })}

      {urls.length !== 0 && (
        <div className="links-box">
          <p className="word">Sources</p>

          {urls.map((url, index) => (
            <div className="link-box" key={`${url}-${index}`}>
              <p className="value">
                <a href={url} target="_blank" className="link">
                  {url}
                </a>
              </p>
              <img src={new_window} alt="New Window" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
