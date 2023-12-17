import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FinalizeComfirmDialog({clickAgree}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgreeBtn = () => {
    clickAgree();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} style={{ borderColor: 'red', color: 'red' }}>
        Finalize
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Finalize this grade composition?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Once you have checked the table below, finalize this grade composition.
            This means you <strong style={{color: 'red'}}>cannot update</strong> the grade of the existing student in this grade composition.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgreeBtn} variant={"contained"}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}