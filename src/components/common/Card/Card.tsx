import React from "react";
import styled from "styled-components";
import { BingoOption } from "../../../utils/types";

interface ICardProps {
  cardData: BingoOption;
  onClickHandler: (arrIndex: number) => void;
  arrIndex: number;
}

interface IStyledCard {
  isDisabled: boolean;
}

interface IStyledInnerCard {
  selected: boolean;
  bingoCard: boolean;
}

const StyledCard = styled.div<IStyledCard>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid black;
  cursor: pointer;
  pointer-events: ${(props) => (props.isDisabled ? "none" : "unset")};
`;

const StyledInnerCard = styled.div<IStyledInnerCard>`
  margin: 0 4px 4px;
  display: flex;
  height: 100%;
  align-items: center;
  background-color: ${(props) =>
    props.bingoCard ? "#E5FEE1" : props.selected ? "#DDD" : "white"};
  color: ${(props) => (props.selected ? "#b3b3b3" : "black")};
  text-decoration: ${(props) => (props.selected ? "line-through" : "unset")};
  pointer-events: ${(props) => (props.bingoCard ? "none" : "unset")};

  &.free-space {
    border: 2px solid #000;
    border-radius: 50%;
  }

  @media (min-width: 600px) {
    margin: 0 8px 8px;
  }

  @media (min-width: 900px) {
    margin: 0 16px 16px;
  }
`;

const StyledIndex = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  padding-right: 4px;
`;

const Card = (props: ICardProps): JSX.Element => {
  const {
    cardData: { cardVal, selected: isSelected, bingoCard },
    onClickHandler,
    arrIndex,
  } = props;

  const freeSpaceClass = arrIndex === 12 ? "free-space" : "";

  return (
    <StyledCard
      isDisabled={arrIndex === 12 ? true : bingoCard}
      onClick={() => onClickHandler(arrIndex)}
    >
      <StyledIndex>{arrIndex}</StyledIndex>
      <StyledInnerCard
        className={freeSpaceClass}
        selected={isSelected}
        bingoCard={arrIndex === 12 ? false : bingoCard}
      >
        {cardVal}
      </StyledInnerCard>
    </StyledCard>
  );
};

export default Card;
