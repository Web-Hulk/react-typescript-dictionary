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
  meanings: [
    {
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
  ];
  license?: {
    name: string;
    url: string;
  };
  sourceUrls?: string[];
}