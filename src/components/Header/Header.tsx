import { useState } from "react";
import logo from "../../assets/logo.svg";
import "./Header.scss";
import { Link } from "react-router";

export const Header = () => {
  const [activeFont, setActiveFont] = useState<string>("Mono");
  const [isFontListDisplayed, setIsFontDisplayed] = useState<boolean>(false);

  const handleActiveFontButton = () => {
    setIsFontDisplayed(!isFontListDisplayed);
  };

  const handleFontItem = (fontName: string) => {
    setActiveFont(fontName);
  };

  return (
    <div className="header-container">
      <Link to="/">
        <img src={logo} alt="Logo" className="header-icon" />
      </Link>

      <div className="header-content">
        <div className="header-fonts-container">
          <button onClick={handleActiveFontButton} className="active-font-btn">
            {activeFont}
          </button>

          {isFontListDisplayed && (
            <ul className="fonts-list">
              <li
                onClick={() => {
                  handleFontItem("Mono");
                  setIsFontDisplayed(false);
                }}
                className={`fonts-list__item ${
                  activeFont === "Mono" ? "selected" : ""
                }`}
              >
                Mono
              </li>
              <li
                onClick={() => {
                  handleFontItem("Akaya Kanadaka");
                  setIsFontDisplayed(false);
                }}
                className={`fonts-list__item ${
                  activeFont === "Akaya Kanadaka" ? "selected" : ""
                }`}
              >
                Akaya Kanadaka
              </li>
              <li
                onClick={() => {
                  handleFontItem("Indie Flower");
                  setIsFontDisplayed(false);
                }}
                className={`fonts-list__item ${
                  activeFont === "Indie Flower" ? "selected" : ""
                }`}
              >
                Indie Flower
              </li>
              <li
                onClick={() => {
                  handleFontItem("Playfair Display");
                  setIsFontDisplayed(false);
                }}
                className={`fonts-list__item ${
                  activeFont === "Playfair Display" ? "selected" : ""
                }`}
              >
                Playfair Display
              </li>
              <li
                onClick={() => {
                  handleFontItem("Spectral");
                  setIsFontDisplayed(false);
                }}
                className={`fonts-list__item ${
                  activeFont === "Spectral" ? "selected" : ""
                }`}
              >
                Spectral
              </li>
            </ul>
          )}
        </div>

        <div className="intersection" />

        <div>Dark mode</div>
      </div>
    </div>
  );
};
