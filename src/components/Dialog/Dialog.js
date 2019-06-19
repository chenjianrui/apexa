import React from 'react';
import DialogEl from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
const styles = {
  dialogContent: {
    padding: '48px 24px'
  },
  dialogActions: {
    padding: '20px'
  },
  button: {
    background: 'linear-gradient(#00cccc, #04afaa)',
    color: '#fff'
  },
  dialog: {
    '@media (max-width: 414px)': {
      '& .MuiDialog-paperFullWidth': {
        width: 'calc(100% - 20px)'
      },
      '& .MuiDialog-paper': {
        margin: 0
      }
    }
  }
};
const Dialog = props => {
  const { classes } = props;
  return (
    <DialogEl
      open={props.open}
      onClose={props.handleClose}
      fullWidth={props.sm}
      className={classes.dialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent className={classes.dialogContent}>
        <DialogContentText id="alert-dialog-description">
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          onClick={props.handleClose}
          variant="contained"
          className={classes.button}
        >
          {props.buttonText}
        </Button>
      </DialogActions>
    </DialogEl>
  );
};
export default withStyles(styles)(Dialog);
