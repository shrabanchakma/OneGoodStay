import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
const CustomTextDisplay = ({ pathMatch, mainText, HighlightedText }) => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname.includes(pathMatch) && (
        <p className="font-normal text-xl text-right">
          {mainText} <br />
          <span className="text-4xl font-bold">{HighlightedText}</span>
        </p>
      )}
    </>
  );
};

CustomTextDisplay.propTypes = {
  pathMatch: PropTypes.string,
  mainText: PropTypes.string,
  HighlightedText: PropTypes.string,
};

export default CustomTextDisplay;
