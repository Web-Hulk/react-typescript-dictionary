import new_window from "../../../assets/icon-new-window.svg";
import "./Sources.scss";

type SourcesProps = {
  urls: string[];
};

export const Sources = ({ urls }: SourcesProps) => {
  if (urls.length === 0) {
    return null;
  }

  return (
    <div className="sources">
      <p className="sources__title">Sources</p>

      {urls.map((url, index) => (
        <div className="sources__item" key={`${url}-${index}`}>
          <p className="sources__url">
            <a href={url} target="_blank" className="sources__link">
              {url}
            </a>
          </p>
          <img src={new_window} alt="New Window" className="sources__icon" />
        </div>
      ))}
    </div>
  );
};
