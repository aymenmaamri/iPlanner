import { css } from "@emotion/react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Card } from "../../modules/Card";
import { getCardRepresentation } from "../cardUtils/utils";
import {
  cardTypeRepresentationMap,
  cardTypes,
} from "../constants/styling/constants";
import { selectedCardState } from "../state/selectedCardState";
import ClearIcon from "@mui/icons-material/Clear";

const styles = (color: string) =>
  css(`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${color};
    font-size: 8rem;
    cursor: pointer;
   ;`);

type PlanningCardProps = {
  card: Card;
  onBoard: boolean;
  handleCardClicked: (card: Card | null) => void;
};

export const PlanningCard = ({
  card,
  onBoard = false,
  handleCardClicked,
}: PlanningCardProps) => {
  const [selectedCard, setSelectedCard] = useRecoilState(selectedCardState);
  const [hovered, setHovered] = useState<boolean>(false);

  const cardDeselectBtn = () => (
    <ClearIcon
      onClick={() => setSelectedCard(null)}
      style={{
        marginBottom: "-10px",
        color: `${card.color}`,
      }}
    />
  );
  return (
    <div
      css={styles(card.color)}
      onClick={() => handleCardClicked(card)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered &&
        card.value === selectedCard?.value &&
        onBoard &&
        cardDeselectBtn()}
      {getCardRepresentation(card.type, card.value, cardTypeRepresentationMap)}
    </div>
  );
};
