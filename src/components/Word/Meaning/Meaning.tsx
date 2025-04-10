import { MeaningType } from "../../../types";
import { WordsCollection } from "../WordsCollection/WordsCollection";
import "./Meaning.scss";

type MeaningProps = {
  meanings: MeaningType[];
  fetchData: (name: string) => void;
};

export const Meaning = ({ meanings, fetchData }: MeaningProps) => {
  if (meanings.length === 0) {
    return null;
  }

  return (
    <div className="meaning">
      {meanings.map(
        ({ partOfSpeech, definitions, synonyms, antonyms }, index) => {
          const { definition } = definitions[0];

          return (
            <div className="meaning__box" key={`meaning-box-${index}`}>
              <div className="meaning__part-of-speech-container">
                <p className="meaning__part-of-speech">{partOfSpeech}</p>
                <div className="meaning__line" />
              </div>

              {definition.length !== 0 && (
                <div className="meaning__definitions">
                  <p className="meaning__title">Meaning</p>

                  <ul className="meaning__list">
                    {definitions.map(
                      ({ definition, synonyms, antonyms, example }, index) => (
                        <div key={`${definition}-${index}`}>
                          <li className="meaning__definition">{definition}</li>

                          {example && (
                            <p className="meaning__example">"{example}"</p>
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
  );
};
