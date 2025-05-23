import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Header from './components/Header';
import Menu from './pages/Menu';
import MyAddresses from './pages/MyAddresses';
import Basket from './pages/Basket';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Login from './pages/login';

// Tema oluşturma fonksiyonu
const createAppTheme = (isLoggedIn) => {
  return createTheme({
    palette: {
      primary: {
        main: '#ff8800', // Turuncu renk
      },
      secondary: {
        main: '#9d8df1', // Mor renk
      },
      background: {
        default: isLoggedIn ? '#fef3e2' : '#ffffff', // Giriş yapıldıysa açık sarı, değilse beyaz
      }
    },
  });
};

// Layout bileşeni - Header'ı login sayfasında göstermemek için
const Layout = ({ children, isAuthenticated }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  
  // Arka plan stili
  const backgroundStyle = {
    backgroundColor: isAuthenticated ? '#fef3e2' : undefined,
    backgroundImage: !isAuthenticated && !isLoginPage ? 'none' : 'none', // Arka plan resmini tamamen kaldır
    minHeight: '100vh',
  };
  
  return (
    <Box sx={backgroundStyle}>
      {!isLoginPage && <Header />}
      <Box sx={{ pt: isLoginPage ? 0 : 2 }}>
        {children}
      </Box>
    </Box>
  );
};

function App() {
  // Auth durumunu kontrol et (login olup olmama durumu)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Gerçek uygulamada burada localStorage'dan token kontrolü yapılabilir
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    
    // Token değişikliklerini dinle
    const handleStorageChange = () => {
      const currentToken = localStorage.getItem('token');
      setIsAuthenticated(!!currentToken);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Kullanıcı giriş durumuna göre temayı oluştur
  const theme = useMemo(() => createAppTheme(isAuthenticated), [isAuthenticated]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Varsayılan olarak login sayfasına yönlendir */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={
            <Layout isAuthenticated={isAuthenticated}>
              <Menu />
            </Layout>
          } />
          <Route path="/addresses" element={
            <Layout isAuthenticated={isAuthenticated}>
              <MyAddresses />
            </Layout>
          } />
          <Route path="/basket" element={
            <Layout isAuthenticated={isAuthenticated}>
              <Basket />
            </Layout>
          } />
          <Route path="/favorites" element={
            <Layout isAuthenticated={isAuthenticated}>
              <Favorites />
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout isAuthenticated={isAuthenticated}>
              <Profile />
            </Layout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;