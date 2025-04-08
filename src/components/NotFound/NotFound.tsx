import emoji from "../../assets/emoji.png";
import "./NotFound.scss";

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src={emoji} alt="Emoji" className="not-found__emoji" />

      <h2 className="not-found__heading">No Definitions Found</h2>

      <p className="not-found__paragraph">
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at later time or head to the web
        instead.
      </p>
    </div>
  );
};
