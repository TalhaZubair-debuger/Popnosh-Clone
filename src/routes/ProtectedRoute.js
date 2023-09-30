import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useUserAuth } from '../context/userContext';

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const handlePurchase = () => {
        console.log("open checkout error")
    }
    const handleClose = () => {
        navigate('/');
    }
    useEffect(() => {
        handlePurchase();
    }, [])
    let { user } = useUserAuth();
    if (!user) {
        return (
            <div className="error-display">
                <Dialog
                    open={alert}
                    onClose={handlePurchase}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" className='headerModalCheckout'>
                        <FontAwesomeIcon icon={faTriangleExclamation} /> Couldn't proceed to checkout!
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You need to sign in to Check out your order.
                            <br />
                            —<b>Thanks for co-operating</b>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            I Understand
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    return children;
}

export default ProtectedRoute