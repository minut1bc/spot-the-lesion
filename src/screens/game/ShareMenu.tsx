import React, { useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  EmailIcon,
  EmailShareButton,
} from "react-share";
import { Button, Dialog, DialogTitle, IconButton, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) =>
  createStyles({
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    background: {
      width: "100%",
      textAlign: "center",
    },
    shareButton: {
      margin: "10px",
    },
    buttonClass: {
      margin: "5px",
    },
  })
);

const ShareMenu: React.FC<ShareMenuProps> = ({ playerScore }: ShareMenuProps) => {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        className={classes.buttonClass}
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickOpen}
      >
        Share
      </Button>
      <Dialog open={open} fullWidth maxWidth="xs">
        <DialogTitle id="simple-dialog-title">
          <Typography variant="h6">Share your score!</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <div className={classes.background}>
          <TwitterShareButton
            className={classes.shareButton}
            url="http://cb3618.pages.doc.ic.ac.uk/spot-the-lesion"
            title={`I got ${playerScore.total} points in Spot-the-Lesion! Can you beat my score?`}
          >
            <TwitterIcon size="50px" round />
          </TwitterShareButton>
          <FacebookShareButton
            className={classes.shareButton}
            url="http://cb3618.pages.doc.ic.ac.uk/spot-the-lesion"
            quote={`I got ${playerScore.total} points in Spot-the-Lesion! Can you beat my score?`}
          >
            <FacebookIcon size="50px" round />
          </FacebookShareButton>
          <LinkedinShareButton
            className={classes.shareButton}
            url="http://cb3618.pages.doc.ic.ac.uk/spot-the-lesion"
            title={`I got ${playerScore.total} points in Spot-the-Lesion! Can you beat my score?`}
          >
            <LinkedinIcon size="50px" round />
          </LinkedinShareButton>
          <EmailShareButton
            className={classes.shareButton}
            url="http://cb3618.pages.doc.ic.ac.uk/spot-the-lesion"
            subject={`I got ${playerScore.total} points in Spot-the-Lesion! Can you beat my score?`}
          >
            <EmailIcon size="50px" round />
          </EmailShareButton>
        </div>
      </Dialog>
    </>
  );
};

export default ShareMenu;
