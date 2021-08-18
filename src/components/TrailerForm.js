import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(0, 0, 0, 0.8)'
    },
    paper: {
        width: '515px',
        height: '345px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
    },
}));

const TrailerForm = ({ open, url, setOpen }) => {
    const classes = useStyles();
    return (
        <Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={setOpen}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className="box" style={{ width: "100%", height: "100%" }}>
                            <iframe src={url} allow="fullscreen" style={{ width: "100%", height: "100%" }} title="trailer">
                            </iframe>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </Fragment>
    )
}

export default TrailerForm
