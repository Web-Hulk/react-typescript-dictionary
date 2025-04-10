export interface DictionaryInterface {
  word: string;
  phonetic: string;
  phonetics?: [
    {
      text: string;
      audio: string;
      sourceUrls: string;
      license: {
        name: string;
        url: string;
      };
    }
  ];
  meanings: MeaningType[];
  license?: {
    name: string;
    url: string;
  };
  sourceUrls?: string[];
}

export type MeaningType = {
  partOfSpeech: string;
    definitions: [
      {
        antonyms: string[];
        synonyms: string[];
        definition: string;
        example: string;
      }
    ];
    antonyms: string[];
    synonyms: string[];
}

export type FontListType = {
  fontName: string;
  cssValue: string;
};

