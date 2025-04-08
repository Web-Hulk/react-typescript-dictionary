import { RefObject, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.svg";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { LIST_ITEMS } from "./data/listItems";
import "./Header.scss";

export const Header = () => {
  const [activeFont, setActiveFont] = useState<string>("Mono");
  const [isFontListVisible, setIsFontListVisible] = useState<boolean>(false);
  const fontListRef = useRef<HTMLDivElement>(null);

  useEscapeKey(() => setIsFontListVisible(false));
  useOutsideClick(fontListRef as RefObject<HTMLDivElement>, () =>
    setIsFontListVisible(false)
  );

  useEffect(() => {
    const storedFont = localStorage.getItem("font-name") || "Roboto";
    setActiveFont(storedFont);
    document.documentElement.style.setProperty("--font-family", storedFont);
  }, [activeFont]);

  const toggleFontList = () => setIsFontListVisible(!isFontListVisible);

  const handleFontSelection = (fontName: string) => {
    setActiveFont(fontName);
    localStorage.setItem("font-name", fontName);
    setIsFontListVisible(false);
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="Logo" className="header__logo" />
      </Link>

      <div className="header__content">
        <div className="header__font-selector" ref={fontListRef}>
          <button onClick={toggleFontList} className="header__font-button">
            {activeFont}
          </button>

          {isFontListVisible && (
            <ul className="header__font-list">
              {LIST_ITEMS.map(({ fontName, cssValue }) => (
                <li
                  onClick={() => {
                    handleFontSelection(fontName);
                  }}
                  className={`header__font-item  ${cssValue} ${
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
      </div>
    </div>
  );
};
