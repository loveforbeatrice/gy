import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, IconButton, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Basket() {
  // Sepetteki ürünler için örnek veri
  const [cartItems, setCartItems] = React.useState([
    {
      id: 1,
      name: 'Tavuk Döner',
      price: 75.0,
      quantity: 2,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Karışık Pizza',
      price: 120.0,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/150'
    }
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (id, increment) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + increment;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">
        Sepetim
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Sepetiniz boş
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: '#FFA500', '&:hover': { bgcolor: '#FF8C00' } }}
            component="a"
            href="/"
          >
            Alışverişe Başla
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {cartItems.map((item) => (
                <Card key={item.id} sx={{ display: 'flex', mb: 2, borderRadius: 2, border: '1px solid #FFA500', boxShadow: 'none' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                    image={item.imageUrl}
                    alt={item.name}
                  />
                  <CardContent sx={{ flex: '1 0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Box>
                      <Typography component="div" variant="h6">
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {item.price.toFixed(2)} TL
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton size="small" onClick={() => handleQuantityChange(item.id, -1)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton size="small" onClick={() => handleQuantityChange(item.id, 1)}>
                        <AddIcon />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveItem(item.id)} sx={{ ml: 1, color: '#FF6347' }}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 2, border: '1px solid #FFA500', boxShadow: 'none' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Sipariş Özeti
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Ara Toplam</Typography>
                    <Typography>{calculateTotal().toFixed(2)} TL</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Teslimat Ücreti</Typography>
                    <Typography>10.00 TL</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6">Toplam</Typography>
                    <Typography variant="h6">{(calculateTotal() + 10).toFixed(2)} TL</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, bgcolor: '#FFA500', '&:hover': { bgcolor: '#FF8C00' } }}
                  >
                    Siparişi Tamamla
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}

export default Basket;
