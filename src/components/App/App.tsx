import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getData } from "../../api/axios";
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
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();

  const fetchData = (name: string) => {
    setIsLoading(true);

    getData(name)
      .then((response) => {
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

  const cleanState = () => {
    setWord("");
    setData([]);
    setUrls([]);
    setResponseStatus(200);
  };

  useEffect(() => {
    const { pathname } = location;

    if (pathname !== "/") {
      const updatedWord = pathname.slice(1);

      fetchData(updatedWord);
    } else {
      cleanState();
    }
  }, [location]);

  useEffect(() => {
    if (data && data?.length > 0) {
      const newUrls = [
        ...new Set(data?.flatMap((item) => item.sourceUrls)),
      ].filter((url): url is string => url !== undefined);

      setUrls(newUrls);
    }
  }, [data]);

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
