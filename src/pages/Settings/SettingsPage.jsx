import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Switch, List, ListItem, 
  ListItemText, ListItemSecondaryAction, Divider, 
  Button, TextField, Avatar, Alert, Stack 
} from '@mui/material';
import { 
  Notifications, Security, Language, 
  DeleteForever, Save, CloudDownload 
} from '@mui/icons-material';
import { useOutletContext } from 'react-router-dom';
import { useNotifier } from '@/components/ui/notifications/NotifierContext';

export default function SettingsPage() {
  const { isDark } = useOutletContext();
  const { show } = useNotifier();

  const [settings, setSettings] = useState({
    emailNotifs: true,
    budgetAlerts: true,
    currency: 'MGA',
    language: 'fr'
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    show('Paramètre mis à jour', 'info');
  };

  const handleSaveProfile = () => {
    show('Profil mis à jour avec succès', 'success');
  };

  const handleClearData = () => {
    if(confirm('Voulez-vous vraiment réinitialiser les données locales ?')) {
      show('Données locales nettoyées', 'warning');
    }
  };

  const SectionTitle = ({ children }) => (
    <Typography 
      variant="h6" 
      sx={{ 
        mt: 4, mb: 2, 
        color: isDark ? '#6366f1' : '#1976d2', 
        fontWeight: 600 
      }}
    >
      {children}
    </Typography>
  );

  const cardStyle = {
    p: 3,
    borderRadius: 2,
    bgcolor: isDark ? '#18181b' : 'white',
    color: isDark ? 'white' : 'inherit',
    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', pb: 4 }}>
      
      {/* Profil */}
      <Paper elevation={0} sx={cardStyle}>
        <Stack direction="row" spacing={3} alignItems="center" mb={3}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: '#6366f1' }}>AR</Avatar>
          <Box>
            <Typography variant="h6">Ando Razafy</Typography>
            <Typography variant="body2" color="text.secondary">Administrateur</Typography>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <TextField 
            label="Email" 
            defaultValue="ando@example.com" 
            fullWidth 
            variant="outlined"
            size="small"
          />
           <Button 
            variant="contained" 
            startIcon={<Save />} 
            onClick={handleSaveProfile}
            sx={{ alignSelf: 'flex-start' }}
          >
            Enregistrer
          </Button>
        </Stack>
      </Paper>

      {/* Préférences */}
      <SectionTitle>Préférences</SectionTitle>
      <Paper elevation={0} sx={cardStyle}>
        <List disablePadding>
          <ListItem>
            <ListItemText 
              primary="Notifications Email" 
              secondary="Recevoir un récapitulatif hebdomadaire" 
            />
            <ListItemSecondaryAction>
              <Switch 
                edge="end" 
                checked={settings.emailNotifs} 
                onChange={() => handleToggle('emailNotifs')} 
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText 
              primary="Alertes Budget" 
              secondary="Être notifié quand 80% du budget est atteint" 
            />
            <ListItemSecondaryAction>
              <Switch 
                edge="end" 
                checked={settings.budgetAlerts}
                onChange={() => handleToggle('budgetAlerts')}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      {/* Zone de danger */}
      <SectionTitle>Zone de Danger</SectionTitle>
      <Paper elevation={0} sx={{ ...cardStyle, borderColor: '#ef4444', borderWidth: 1 }}>
        <Alert severity="warning" sx={{ mb: 2, bgcolor: 'transparent' }}>
          Ces actions sont irréversibles. Soyez prudent.
        </Alert>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined" 
            color="error" 
            startIcon={<DeleteForever />}
            onClick={handleClearData}
          >
            Réinitialiser les caches
          </Button>
             <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<CloudDownload />}
            onClick={() => show('Export lancé...', 'info')}
          >
            Exporter mes données (CSV)
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}