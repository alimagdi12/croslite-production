import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function SliderBtn({ direction, onClick }) {
  return (
    <button className="slider-button" onClick={onClick}>
      <FontAwesomeIcon
        icon={direction === "next" ? faArrowRight : faArrowLeft}
      />
    </button>
  );
}

export default SliderBtn;
