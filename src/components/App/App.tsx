import axios from "axios";
import { useEffect, useState } from "react";
import { DictionaryInterface } from "../../types";
import { Header } from "../Header/Header";
import { Input } from "../Input/Input";
import { NotFound } from "../NotFound/NotFound";
import { Word } from "../Word/Word";
import "./App.scss";

function App() {
  const [word, setWord] = useState<string>("");
  const [data, setData] = useState<DictionaryInterface[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [responseStatus, setResponseStatus] = useState<number>(200);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data && data?.length > 0) {
      const newUrls = [
        ...new Set(data?.flatMap((item) => item.sourceUrls)),
      ].filter((url): url is string => url !== undefined);

      setUrls(newUrls);
    }
  }, [data]);

  const fetchData = (name: string) => {
    const baseURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${name}`;

    setIsLoading(true);

    axios
      .get(baseURL)
      .then((response) => {
        console.log("status: ", response.status);
        setData(response.data);
        setResponseStatus(response.status);
      })
      .catch((error) => {
        console.log("Error status: ", error.status);
        setResponseStatus(error.status);
      });

    setWord(name);
    setIsLoading(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <div className="container">
      <Header />

      <Input
        word={word}
        isLoading={isLoading}
        handleInput={handleInput}
        fetchData={fetchData}
      />

      <div className="content">
        {responseStatus === 200 ? (
          <Word data={data} fetchData={fetchData} urls={urls} />
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
}

export default App;
