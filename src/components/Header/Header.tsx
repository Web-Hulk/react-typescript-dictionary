import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.svg";
import { Toggle } from "../Toggle/Toggle";
import { LIST_ITEMS } from "./data/listItems";
import "./Header.scss";

export const Header = () => {
  const [activeFont, setActiveFont] = useState<string>("Mono");
  const [isFontListDisplayed, setIsFontDisplayed] = useState<boolean>(false);
  const fontListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFontDisplayed(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        fontListRef.current &&
        !fontListRef.current.contains(e.target as Node)
      ) {
        setIsFontDisplayed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getFontNameFromLocalStorage =
      localStorage.getItem("font-name") || "Roboto";

    setActiveFont(getFontNameFromLocalStorage);

    document.documentElement.style.setProperty(
      "--font-family",
      getFontNameFromLocalStorage
    );
  }, [activeFont]);

  const handleActiveFontButton = () => {
    setIsFontDisplayed(!isFontListDisplayed);
  };

  const setLocalStorageItem = (fontName: string) => {
    localStorage.setItem("font-name", fontName);
  };

  const handleFontItem = (fontName: string) => {
    setActiveFont(fontName);
    setLocalStorageItem(fontName);
  };

  return (
    <div className="header-container">
      <Link to="/">
        <img src={logo} alt="Logo" className="header-icon" />
      </Link>

      <div className="header-content">
        <div className="header-fonts-container" ref={fontListRef}>
          <button onClick={handleActiveFontButton} className="active-font-btn">
            {activeFont}
          </button>

          {isFontListDisplayed && (
            <ul className="fonts-list">
              {LIST_ITEMS.map(({ fontName, cssValue }) => (
                <li
                  onClick={() => {
                    handleFontItem(fontName);
                    setIsFontDisplayed(false);
                  }}
                  className={`fonts-list__item ${cssValue} ${
                    activeFont === fontName ? "selected" : ""
                  }`}
                  key={`List item-${fontName}`}
                >
                  {fontName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="intersection" />

        <Toggle />
      </div>
    </div>
  );
};
