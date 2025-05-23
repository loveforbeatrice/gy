import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';

function Profile() {
  const [profile, setProfile] = useState({
    name: 'Alp Yılmaz',
    email: 'alp.yilmaz@example.com',
    phone: '555-123-4567'
  });

  const [pastOrders, setPastOrders] = useState([
    {
      id: 1,
      date: '15 Mayıs 2025',
      totalAmount: 185.0,
      status: 'Teslim Edildi',
      items: [
        'Tavuk Döner x2',
        'Kola x1'
      ]
    },
    {
      id: 2,
      date: '10 Mayıs 2025',
      totalAmount: 120.0,
      status: 'Teslim Edildi',
      items: [
        'Karışık Pizza x1',
        'Su x2'
      ]
    }
  ]);

  const [editing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    alert('Çıkış yapılıyor...');
    // Çıkış işlemi gerçekleştirilir
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom fontWeight="bold">
        Profilim
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3, borderRadius: 2, border: '1px solid #FFA500', boxShadow: 'none' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: '#FFA500',
                  width: 100,
                  height: 100,
                  fontSize: '3rem',
                  mx: 'auto',
                  mb: 2
                }}
              >
                {profile.name.charAt(0)}
              </Avatar>

              <Typography variant="h6" gutterBottom>
                {profile.name}
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary={profile.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocalPhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary={profile.phone} />
                </ListItem>
              </List>

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: '#FFA500', '&:hover': { bgcolor: '#FF8C00' } }}
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
              >
                Çıkış Yap
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3, borderRadius: 2, border: '1px solid #FFA500', boxShadow: 'none' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="h2">
                  Kişisel Bilgiler
                </Typography>
                {!editing && (
                  <Button 
                    variant="outlined" 
                    onClick={handleEdit}
                    sx={{ 
                      color: '#FFA500', 
                      borderColor: '#FFA500',
                      '&:hover': { borderColor: '#FF8C00', color: '#FF8C00' } 
                    }}
                  >
                    Düzenle
                  </Button>
                )}
              </Box>

              {editing ? (
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Ad Soyad"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="E-posta"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Telefon"
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleChange}
                  />
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      sx={{ mr: 1, color: 'gray' }} 
                      onClick={handleCancel}
                    >
                      İptal
                    </Button>
                    <Button 
                      variant="contained" 
                      onClick={handleSave}
                      sx={{ bgcolor: '#FFA500', '&:hover': { bgcolor: '#FF8C00' } }}
                    >
                      Kaydet
                    </Button>
                  </Box>
                </Box>
              ) : (
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ad Soyad" secondary={profile.name} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText primary="E-posta" secondary={profile.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocalPhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Telefon" secondary={profile.phone} />
                  </ListItem>
                </List>
              )}
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 2, border: '1px solid #FFA500', boxShadow: 'none' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HistoryIcon sx={{ mr: 1, color: '#FFA500' }} />
                <Typography variant="h6" component="h2">
                  Geçmiş Siparişlerim
                </Typography>
              </Box>

              {pastOrders.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Henüz sipariş geçmişiniz bulunmamaktadır.
                </Typography>
              ) : (
                pastOrders.map((order, index) => (
                  <React.Fragment key={order.id}>
                    <Box sx={{ my: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Sipariş #{order.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.date} • {order.status}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        {order.items.map((item, i) => (
                          <Typography key={i} variant="body2">
                            • {item}
                          </Typography>
                        ))}
                      </Box>
                      <Typography variant="body1" sx={{ mt: 1, color: '#FFA500', fontWeight: 'bold' }}>
                        Toplam: {order.totalAmount.toFixed(2)} TL
                      </Typography>
                    </Box>
                    {index < pastOrders.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
