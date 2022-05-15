import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Fab, Paper } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: "10px",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function CartModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const items = props.items;

  const clearCart = () => {
    props.clearCart();
  };

  const addItem = (event) => {
    props.addToCart(event);
  };

  const removeItem = (event) => {
    props.removeFromCart(event);
  };

  return (
    <div>
      <Fab color="primary" onClick={handleOpen} aria-label="cart" className="fab">
        <Badge badgeContent={items} color="error">
          <ShoppingCartIcon />
        </Badge>
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="modal"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Cart
            </Typography>
            <Stack spacing={2}>
              {props.cart.map((item, key) => (
                <Paper elevation={0} key={key}>
                  <h3>{item.title}</h3>
                  <div className="details">
                    <p>Price: € {(1 * item.price).toFixed(2)}</p>
                    <p>Total: € {(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                  <div className="buttons">
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => removeItem({ id: item.id, price: item.price, quantity: -1 })}
                    >
                      -
                    </Button>
                    <h3>{item.quantity}</h3>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => addItem({ id: item.id, price: item.price, quantity: 1 })}
                    >
                      +
                    </Button>
                  </div>
                </Paper>
              ))}
            </Stack>
            <hr />
            <div className="total buttons">
              <h3>Total</h3>
              <h3> € {props.total}</h3>
            </div>
            <div className="buttons">
              <Button variant="contained" color="error" onClick={clearCart}>
                Empty
              </Button>
              <Button variant="contained" color="success">
                Checkout
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
