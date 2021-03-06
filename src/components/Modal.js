import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import '../App.css'
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h4">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        alignItems:"center"
    },
}))(MuiDialogContent);
withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
export default function CustomizedDialogs(props) {
    const [open, setOpen] = React.useState(true);


    const handleClose = () => {
        props.toggleModal(false);
        setOpen(false);
    };
    return (
        <div>
            <link href='https://fonts.googleapis.com/css?family=Amethysta' rel='stylesheet' type='text/css'/>
            <Dialog  onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle className={"modalDialog"} id="customized-dialog-title" onClose={handleClose} >
                    <span className={'modalPlot'}>
                        {props.movieDetails["Title"]} <h5>{props.movieDetails["Year"]}</h5>
                    </span>


                </DialogTitle>
                <DialogContent dividers>

                    <Typography gutterBottom>
                        <p className={"modalPlot"}>
                            {props.movieDetails["Plot"]}
                        </p>

                    </Typography>


                </DialogContent>

            </Dialog>
        </div>
    );
}