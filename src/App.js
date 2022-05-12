import React, { useEffect, useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import ProductCard from "./components/ProductCard";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";

export default function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [cart, setCart] = React.useState([{}]);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((json) => setData(json));
    console.log(data);
    setLoading(false);
  }, []);

  const handleClick = (event) => {
    //setCart([...cart, event.target.value]);
    console.log(event.target.value);
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
          <div>Loading...</div>
        ) : (
          data.map((item) => (
            // <ProductCard key={item.id} {...item} onChange={handleClick} />

            <Card key={item.id}>
              <CardMedia
                component="img"
                height="300"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="primary"
                  aria-label="add to shopping cart"
                  onClick={() => {
                    setCart([...cart, { id: item.id, quantity: 1 }]);
                    console.log("cart", cart);
                  }}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
}
