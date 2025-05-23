import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, IconButton, Button, Divider, TextField, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Basket() {
  // Sample cart items data
  const [orderNote, setOrderNote] = React.useState('');
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

  const handleOrderNoteChange = (event) => {
    setOrderNote(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold" sx={{ fontFamily: '"Alata", sans-serif', letterSpacing: '0.5px' }}>
        My Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary" sx={{ fontFamily: '"Alata", sans-serif', fontSize: '1.2rem' }}>
            Your cart is empty
          </Typography>
          <Button
            variant="contained"
            sx={{ 
              mt: 2, 
              bgcolor: '#ff8800', 
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '12px',
              py: 1.2,
              px: 3,
              fontSize: '1rem',
              '&:hover': { bgcolor: '#e67a00' } 
            }}
            component="a"
            href="/"
          >
            Start Shopping
          </Button>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {cartItems.map((item) => (
                <Card key={item.id} sx={{ display: 'flex', mb: 2, borderRadius: 3, border: '1px solid #ff8800', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                    image={item.imageUrl}
                    alt={item.name}
                  />
                  <CardContent sx={{ flex: '1 0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Box>
                      <Typography component="div" variant="h6" sx={{ fontFamily: '"Alata", sans-serif', fontWeight: 'bold' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontFamily: '"Alata", sans-serif' }}>
                        ₺ {item.price.toFixed(2)}
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
              <Card sx={{ borderRadius: 3, border: '1px solid #ff8800', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontFamily: '"Alata", sans-serif', fontWeight: 'bold', color: '#333' }}>
                    Order Summary
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontFamily: '"Alata", sans-serif' }}>Subtotal</Typography>
                    <Typography sx={{ fontFamily: '"Alata", sans-serif' }}>₺ {calculateTotal().toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontFamily: '"Alata", sans-serif' }}>Delivery Fee</Typography>
                    <Typography sx={{ fontFamily: '"Alata", sans-serif' }}>₺ 10.00</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontFamily: '"Alata", sans-serif', fontWeight: 'bold' }}>Total</Typography>
                    <Typography variant="h6" sx={{ fontFamily: '"Alata", sans-serif', fontWeight: 'bold', color: '#ff8800' }}>₺ {(calculateTotal() + 10).toFixed(2)}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ 
                      mt: 2, 
                      bgcolor: '#ff8800', 
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: '12px',
                      py: 1.2,
                      fontSize: '1rem',
                      letterSpacing: '1px',
                      boxShadow: '0 2px 4px rgba(255, 136, 0, 0.3)',
                      '&:hover': { 
                        bgcolor: '#e67a00',
                        boxShadow: '0 4px 8px rgba(255, 136, 0, 0.4)'
                      } 
                    }}
                  >
                    PLACE ORDER
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          {/* Order Notes Section */}
          <Paper elevation={2} sx={{ 
            p: 3, 
            mt: 3,
            borderRadius: '16px',
            border: '1px solid #ff8800'
          }}>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              fontWeight: 'bold',
              color: '#333',
              fontFamily: '"Alata", sans-serif'
            }}>
              Order Notes
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Add special instructions for your order..."
              value={orderNote}
              onChange={handleOrderNoteChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  fontFamily: '"Alata", sans-serif',
                }
              }}
            />
          </Paper>
        </>
      )}
    </Container>
  );
}

export default Basket;
