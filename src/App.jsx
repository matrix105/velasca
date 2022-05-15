import React, { useEffect, useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import ProductCard from "./components/ProductCard";
import { makeStyles, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Header from "./components/Header";
import CartModal from "./components/CartModal";
import { Link } from "@mui/material";

export default function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [cart, setCart] = React.useState([{}]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [cartTotal, setCartTotal] = React.useState(0);
  const [itemsCount, setItems] = React.useState(0);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((json) => setData(json));
    console.log(data);
    setLoading(false);
    clearCart();
  }, []);

  const addToCart = (event) => {
    if (cart.some((item) => item.id === event.id)) {
      setCart((prevState) => {
        const newState = prevState.map((obj) => {
          if (obj.id === event.id) {
            return { ...obj, quantity: obj.quantity + event.quantity };
            setCartTotal(cartTotal + obj.price * event.quantity);
          }
          setItems(itemsCount + 1);
          console.log(cartTotal + event.price);
          setCartTotal(cartTotal + event.price * event.quantity);
          return obj;
        });
        return newState;
      });
    } else {
      setCart([...cart, event]);
      setItems(itemsCount + 1);
      setCartTotal(cartTotal + event.price * event.quantity);
    }
  };

  const deleteFromCart = (event) => {
    if (event.quantity === 0) {
      setCart((prevState) => {
        const newState = prevState.filter((obj) => obj.id !== event.id);
        setItems(itemsCount - 1);
        return newState;
      });
    }
  };

  const removeFromCart = (event) => {
    setCart((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === event.id) {
          return { ...obj, quantity: obj.quantity + event.quantity };
          setCartTotal(cartTotal - obj.price);
        }
        setCartTotal(cartTotal - event.price);
        return obj;
      });
      if (newState.length === 0) {
        clearCart();
        setCartTotal(0);
      }
      newState.forEach((item) => {
        deleteFromCart(item);
      });
      return newState;
    });
  };

  const clearCart = () => {
    setCart([]);
    setCartTotal(0);
    setItems(0);
  };

  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 350,
            height: "auto",
          },
        }}
      >
        {loading ? (
          <Box sx={{ width: 210, marginRight: 0.5, my: 3 }}>
            <Skeleton variant="rectangular" width={350} height={250} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={30} />
          </Box>
        ) : (
          data.map((item) => (
            // <ProductCard key={item.id} {...item} onChange={handleClick} />

            <Card key={item.id}>
              <div className="pic">
                <CardMedia component="img" height="300" image={item.image} alt={item.title} />
                <div
                  className="addToCart"
                  onClick={() =>
                    addToCart({ id: item.id, title: item.title, price: item.price, image: item.image, quantity: 1 })
                  }
                >
                  <AddShoppingCartIcon /> <span>Add to Cart</span>
                </div>
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <div className="row card-footer">
                  <h3 className="col-md-6">
                    € <span className="price">{item.price.toFixed(2)}</span>
                  </h3>
                </div>
              </CardActions>
            </Card>
          ))
        )}
      </Box>

      <CartModal
        cart={cart}
        total={cartTotal}
        items={itemsCount}
        clearCart={clearCart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </Container>
  );
}
