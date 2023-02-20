import { jsx, css } from "@emotion/react";
import { flexbox } from "@mui/system";

import { ReactElement } from "react";
import { useRecoilValue } from "recoil";
import { Player } from "../../modules/Player";
import { selectedCardState } from "../state/selectedCardState";
import { CardHand } from "./CardHand";
import { PlanningCard } from "./PlanningCard";

const planningBoardStyles = css(`
display: grid;
grid-template-columns: 100%;
grid-template-rows: 28% 44% 28%;
justify-content: center;
align-content: center;
background-color: #F0F8FF;
height: 50vh;
width: 70vw;
border-radius: 40%; 
margin: 200px auto 50px auto;
padding: 50px auto;
box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`);

const centerContainerStyles = css(`
display: flex;
justify-content: center;
align-items: center;
`);

const storyNameStyles = css`
  font-size: 24px;
`;

type PlanningBoardProps = {
  storyName: string;
  players: Player[];
};

export const PlanningBoard = ({
  storyName = "my first story ",
}: PlanningBoardProps): ReactElement => {
  const selectedCard = useRecoilValue(selectedCardState);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div id="planning-board-container" css={planningBoardStyles}>
        <div></div>

        <div css={centerContainerStyles}>
          <p css={storyNameStyles}>{storyName}</p>
        </div>

        {selectedCard && (
          <div>
            <PlanningCard
              card={selectedCard}
              onBoard={true}
              handleCardClicked={(selectedCard) => {
                return;
              }}
            />
          </div>
        )}
      </div>
      <CardHand cards={[]} />
    </div>
  );
};
