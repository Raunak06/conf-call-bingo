import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Confetti from "react-confetti";
import { BingoOption } from "../../utils/types";
import { getRandomNumberList } from "../../utils/utils";
import {
  BINGO_CARDS_NUMBER,
  BINGO_GRID,
  FREE_SPACE_TEXT,
} from "../../constant/constant";
import allOptionsList from "../../data/bingoOptions.json";
import Card from "../common/Card/Card";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useBingoGridDimension from "../../hooks/useBingoGridDimension";

interface IBingoCard {
  dimension: string;
  fontSize: string;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BingoGrid = styled.div<IBingoCard>`
  width: ${(props) => props.dimension};
  height: ${(props) => props.dimension};
  display: grid;
  background-color: white;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(
    5,
    minmax(calc(${(props) => props.dimension} / 5), auto)
  );
  grid-template-rows: repeat(
    5,
    minmax(calc(${(props) => props.dimension} / 5), auto)
  );
  border: 1px solid black;
  font-size: ${(props) => props.fontSize};
`;

const StyledWinsDiv = styled.div`
  margin-bottom: 16px;
`;

const BingoContainer = (): JSX.Element => {
  const allOptionsListLen = allOptionsList.length;
  const [bingoOptionsList, setBingoOptionsList] = useState<BingoOption[]>([
    { cardVal: "", cardIndex: -1, bingoCard: false, selected: false },
  ]);
  const [selectedBingoCards, setSelectedBingoCards] = useState<number[]>([12]);
  const [winIndexes, setWinIndexes] = useState<number[]>([]);
  const [isWon, setIsWon] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();
  const { dimension, fontSize } = useBingoGridDimension(width, height);

  const checkIsBingo = (selectedIndexList: number[]) => {
    for (let i = 0; i < BINGO_GRID.length; i++) {
      if (
        winIndexes.indexOf(i) === -1 &&
        BINGO_GRID[i].every((j) => selectedIndexList.includes(j))
      ) {
        setWinIndexes([...winIndexes, i]);
        setIsWon(true);

        setBingoOptionsList((prevState) => {
          return prevState.map((el, index) =>
            BINGO_GRID[i].includes(index)
              ? {
                  ...el,
                  bingoCard: true,
                }
              : el
          );
        });
      }
    }
  };

  const cardClickHandler = (arrIndex: number) => {
    setBingoOptionsList((prevState) => {
      return prevState.map((el, index) =>
        index === arrIndex
          ? {
              ...el,
              selected: !bingoOptionsList[arrIndex].selected,
            }
          : el
      );
    });
    const newState = [...selectedBingoCards];
    const selectedCardIndex = newState.indexOf(arrIndex);
    selectedCardIndex === -1
      ? newState.push(arrIndex)
      : newState.splice(selectedCardIndex, 1);
    setSelectedBingoCards([...newState]);

    if (newState.length >= 5) {
      checkIsBingo(newState);
    }
  };

  const generateBingoList = useCallback(() => {
    const bingoList = [];
    const randomNumList = getRandomNumberList(
      BINGO_CARDS_NUMBER,
      allOptionsListLen
    );
    for (let i = 0; i < BINGO_CARDS_NUMBER; i++) {
      bingoList.push({
        cardVal: allOptionsList[randomNumList[i]],
        cardIndex: randomNumList[i],
        bingoCard: false,
        selected: false,
      });
    }
    const middleSpace = bingoList.length / 2;
    bingoList.splice(middleSpace, 0, {
      cardVal: FREE_SPACE_TEXT,
      cardIndex: allOptionsListLen,
      bingoCard: false,
      selected: false,
    });
    return bingoList;
  }, [getRandomNumberList]);

  useEffect(() => {
    const bingoList = generateBingoList();
    setBingoOptionsList(bingoList);
  }, []);

  useEffect(() => {
    if (isWon) {
      setTimeout(() => {
        setIsWon(false);
      }, 5000);
    }
  }, [isWon]);

  return (
    <>
      {isWon && <Confetti width={width} height={height} />}
      {dimension && (
        <StyledContainer>
          <StyledWinsDiv>Number of wins: {winIndexes.length}</StyledWinsDiv>
          <BingoGrid dimension={dimension} fontSize={fontSize}>
            {bingoOptionsList &&
              bingoOptionsList.length !== 0 &&
              bingoOptionsList.map((option: BingoOption, index: number) => (
                <Card
                  key={option.cardIndex}
                  cardData={option}
                  onClickHandler={cardClickHandler}
                  arrIndex={index}
                />
              ))}
          </BingoGrid>
        </StyledContainer>
      )}
    </>
  );
};

export default BingoContainer;
