import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Favorites() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Tavuk Döner',
      description: 'Özel soslu lavaş üzerinde servis edilen tavuk döner',
      price: 75.0,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Karışık Pizza',
      description: 'Mantar, sosis, zeytin ve peynir ile hazırlanan pizza',
      price: 120.0,
      imageUrl: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Lahmacun',
      description: 'Kıyma, soğan ve maydanoz ile hazırlanmış lahmacun',
      price: 40.0,
      imageUrl: 'https://via.placeholder.com/150'
    }
  ]);

  const handleRemoveFromFavorites = (id) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">
        Favorilerim
      </Typography>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Favori ürününüz bulunmamaktadır
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2, bgcolor: '#FFA500', '&:hover': { bgcolor: '#FF8C00' } }}
            component="a"
            href="/"
          >
            Menüyü Görüntüle
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, border: '1px solid #FFA500', boxShadow: 'none' }}>
                <CardMedia
                  component="img"
                  sx={{ height: 160 }}
                  image={item.imageUrl}
                  alt={item.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2, color: '#FFA500' }}>
                    {item.price.toFixed(2)} TL
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button 
                      variant="contained" 
                      startIcon={<AddShoppingCartIcon />} 
                      sx={{ bgcolor: '#FFA500', '&:hover': { bgcolor: '#FF8C00' } }}
                    >
                      Sepete Ekle
                    </Button>
                    <IconButton 
                      onClick={() => handleRemoveFromFavorites(item.id)} 
                      sx={{ color: '#FF6347' }}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Favorites;
