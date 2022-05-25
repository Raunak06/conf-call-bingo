import { useState, useEffect } from "react";
import { SCREEN_SIZES } from "../constant/constant";

const useBingoGridDimension = (width: number, height: number) => {
  const [dimension, setDimension] = useState<string>("");
  const [fontSize, setFontSize] = useState<string>("");

  const getDimension = () => {
    const baseValue = width <= height ? width : height - 25;
    let calculatedValue = 0;
    let calculatedFontSize = 10;
    if (baseValue < SCREEN_SIZES.XS) calculatedValue = baseValue * 0.95;
    else if (baseValue < SCREEN_SIZES.S) calculatedValue = baseValue * 0.9;
    else if (baseValue < SCREEN_SIZES.MD) {
      calculatedValue = baseValue * 0.8;
      calculatedFontSize = 14;
    } else if (baseValue < SCREEN_SIZES.L) {
      calculatedValue = baseValue * 0.8;
      calculatedFontSize = 16;
    } else {
      calculatedValue = 700;
      calculatedFontSize = 16;
    }

    setDimension(`${calculatedValue}px`);
    setFontSize(`${calculatedFontSize}px`);
  };

  useEffect(() => {
    getDimension();
  }, [width, height]);

  return {
    dimension: dimension,
    fontSize: fontSize,
  };
};

export default useBingoGridDimension;
