import React, { useState } from "react";
import { Button, Card, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ScoreWithIncrement from "../../components/ScoreWithIncrement";
import LoadingButton from "../../components/LoadingButton";
import colors from "../../res/colors";
import ShareMenu from "./ShareMenu";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      [theme.breakpoints.up("md")]: {
        flex: 1,
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      },
    },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      margin: 8,
      padding: 8,
      [theme.breakpoints.down("sm")]: {
        width: "80vw",
        maxWidth: "60vh",
      },
      [theme.breakpoints.up("md")]: {
        minWidth: "20vw",
      },
    },
    scoresContainer: {
      width: "100%",
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "row",
        justifyContent: "space-evenly",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    cardText: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "2rem",
      },
    },
    submitShareContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    buttonClass: {
      margin: "5px",
    },
  })
);

const GameSideBar: React.FC<GameSideBarProps> = ({
  gameMode,
  gameStarted,
  gameEnded,
  roundEnded,
  roundLoading,
  showIncrement,
  onStartRound,
  onSubmitClick,
  onChallenge,
  playerScore,
  aiScore,
}: GameSideBarProps) => {
  const classes = useStyles();

  const [challengeLoading, setChallengeLoading] = useState(false);

  const gameEndText = () => {
    if (!gameEnded) {
      return null;
    }

    const playerScoreEnd = playerScore.total + playerScore.round;
    const aiScoreEnd = aiScore.total + aiScore.round;

    let endText: string;
    let color: string;

    if (playerScoreEnd > aiScoreEnd) {
      endText = "You won!";
      color = colors.playerWon;
    } else if (playerScoreEnd < aiScoreEnd) {
      endText = "AI won!";
      color = colors.playerLost;
    } else {
      endText = "It was a draw!";
      color = colors.draw;
    }

    return (
      <Typography className={classes.cardText} style={{ color }}>
        {endText}
      </Typography>
    );
  };

  const startRoundButton = () => {
    if (gameEnded) {
      return null;
    }

    return (
      <LoadingButton
        className={classes.buttonClass}
        variant="contained"
        color="primary"
        size="large"
        loading={roundLoading}
        disabled={gameStarted && !roundEnded}
        onClick={onStartRound}
      >
        {gameStarted ? "Next" : "Start"}
      </LoadingButton>
    );
  };

  const submitShareButtons = () => {
    if ((gameMode === "competitive" && !gameEnded) || !roundEnded || roundLoading) {
      return null;
    }

    return (
      <div className={classes.submitShareContainer}>
        <Button
          className={classes.buttonClass}
          variant="contained"
          color="primary"
          size="large"
          onClick={onSubmitClick}
        >
          Submit
        </Button>
        <ShareMenu playerScore={playerScore} />
      </div>
    );
  };

  const onChallengeClick = async () => {
    try {
      setChallengeLoading(true);

      await onChallenge();
    } finally {
      setChallengeLoading(false);
    }
  };

  const challengeButton = () => {
    if (!gameEnded) {
      return null;
    }

    return (
      <LoadingButton
        className={classes.buttonClass}
        variant="contained"
        color="primary"
        size="large"
        loading={challengeLoading}
        onClick={onChallengeClick}
      >
        Challenge friend
      </LoadingButton>
    );
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <div className={classes.scoresContainer}>
          <ScoreWithIncrement
            player="You"
            score={playerScore.total}
            increment={playerScore.round}
            showIncrement={showIncrement}
          />

          <Typography className={classes.cardText}>vs</Typography>

          <ScoreWithIncrement
            player="AI"
            score={aiScore.total}
            increment={aiScore.round}
            showIncrement={showIncrement}
          />
        </div>

        {gameEndText()}

        {startRoundButton()}

        {submitShareButtons()}

        {challengeButton()}
      </Card>
    </div>
  );
};

export default GameSideBar;
