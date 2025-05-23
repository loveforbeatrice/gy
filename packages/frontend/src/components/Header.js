import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Typography, 
  Divider,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [user, setUser] = useState(null);
  
  // Sayfa yüklenirken localStorage'dan kullanıcı bilgilerini al
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('User parsing error:', error);
      }
    }
  }, []);

  // Sayfa yönlendirme fonksiyonları
  const goToMenu = () => navigate('/');
  const goToBasket = () => navigate('/basket');
  const goToFavorites = () => navigate('/favorites');
  
  // Profil menüsü fonksiyonları
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateAndClose = (path) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = () => {
    // Çıkış işlemleri
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    console.log('Çıkış yapıldı');
    handleClose();
    
    // Login sayfasına yönlendir
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#9d8df1' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          <img 
            src="/images/logo.png" 
            alt="Yemek Logo" 
            style={{ height: '50px' }}
          />
        </Box>

        {/* Sağ taraftaki ikonlar */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton color="inherit" onClick={goToMenu}>
            <img 
              src="/images/menu-icon.png" 
              alt="Menü" 
              style={{ height: '24px', filter: 'brightness(0) invert(1)' }} 
            />
          </IconButton>

          <IconButton color="inherit" onClick={goToBasket}>
            <img 
              src="/images/basket-icon.png" 
              alt="Sepet" 
              style={{ height: '24px', filter: 'brightness(0) invert(1)' }} 
            />
          </IconButton>

          <IconButton color="inherit" onClick={goToFavorites}>
            <img 
              src="/images/favorite-icon.png" 
              alt="Favoriler" 
              style={{ height: '24px', filter: 'brightness(0) invert(1)' }} 
            />
          </IconButton>

          <IconButton 
            color="inherit" 
            onClick={handleProfileClick}
            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <img 
              src="/images/profile-icon.png" 
              alt="Profil" 
              style={{ height: '24px', filter: 'brightness(0) invert(1)' }} 
            />
          </IconButton>
          
          {/* Profil Menüsü */}
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                mt: 1.5,
                borderRadius: '10px',
                width: 250,
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1.5,
                  typography: 'body1',
                  borderBottom: '1px solid #f0f0f0',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {/* Kullanıcı Bilgileri */}
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #f0f0f0' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#9d8df1' }}>
                {user ? user.name : 'Misafir Kullanıcı'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user ? user.phone : 'Giriş yapınız'}
              </Typography>
            </Box>
            
            {/* Menü Öğeleri */}
            <MenuItem onClick={() => navigateAndClose('/profile')} sx={{ color: '#ff8800' }}>
              Account Details
            </MenuItem>
            
            <MenuItem onClick={() => navigateAndClose('/settings')} sx={{ color: '#ff8800' }}>
              Settings
            </MenuItem>
            
            <MenuItem onClick={() => navigateAndClose('/addresses')} sx={{ color: '#ff8800' }}>
              My Addresses
            </MenuItem>
            
            <MenuItem onClick={() => navigateAndClose('/orders')} sx={{ color: '#ff8800' }}>
              Order History
            </MenuItem>
            
            <MenuItem onClick={handleLogout} sx={{ color: '#ff8800' }}>
              Log Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
