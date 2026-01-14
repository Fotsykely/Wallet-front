/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Typography, Paper, Switch, List, ListItem, 
  ListItemText, ListItemSecondaryAction, Divider, 
  Button, TextField, Avatar, Alert, Stack, CircularProgress
} from '@mui/material';
import { 
  DeleteForever, Save, CloudDownload, CloudUpload 
} from '@mui/icons-material';
import { useOutletContext } from 'react-router-dom';
import { useNotifier } from '@/components/ui/notifications/NotifierContext';
import { settingsService } from '@/services/api/settings';
import { accountsService } from '@/services/api/account';

export default function SettingsPage() {
  const { isDark } = useOutletContext();
  const { show } = useNotifier();
  const fileInputRef = useRef(null);

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  // État local pour le switch
  const [alertsEnabled, setAlertsEnabled] = useState(false);

  // Charger les données (Email + Préférences)
  useEffect(() => {
    // Load email from primary account (id = 1)
    accountsService.getAccount(1).then(acc => {
      if (acc && acc.email) setEmail(acc.email);
      else settingsService.getSettings().then(data => { if (data.user_email) setEmail(data.user_email); });
    }).catch(() => {});

    // Load budget alert preference
    settingsService.getSettings().then(data => {
      // Convert string 'true' -> boolean
      setAlertsEnabled(data.pref_budget_alerts === 'true');
    });
  }, []);

  // Specific handlers for the budget alerts toggle
  const handleToggleBudgetAlerts = async () => {
    const newValue = !alertsEnabled;
    setAlertsEnabled(newValue); // Optimistic UI update
    
    try {
      // Sauvegarde en string 'true' ou 'false'
      await settingsService.saveSetting('pref_budget_alerts', String(newValue));
      show(newValue ? 'Alertes activées' : 'Alertes désactivées', 'info');
    } catch (err) {
      setAlertsEnabled(!newValue); // Rollback en cas d'erreur
      show('Erreur lors de la sauvegarde de la préférence', 'error');
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      // save on account (primary account id = 1)
      await accountsService.updateAccount(1, { email });
      show('Email sauvegardé avec succès', 'success');
    } catch (err) {
      show('Erreur lors de la sauvegarde', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      show('Préparation de l\'export...', 'info');
      const data = await settingsService.exportData();
      
      // Téléchargement du fichier côté client
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wallet_backup_${new Date().toISOString().slice(0,10)}.json`;
      link.click();
      window.URL.revokeObjectURL(url);
      
      show('Données exportées avec succès', 'success');
    } catch (err) {
      show('Erreur lors de l\'export', 'error');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const jsonContent = JSON.parse(e.target.result);
        if (!jsonContent.data) throw new Error("Format invalide");
        
        if (confirm("Attention : L'importation va écraser toutes les données actuelles. Continuer ?")) {
          setLoading(true);
          await settingsService.importData(jsonContent.data);
          show('Importation réussie ! Veuillez rafraîchir.', 'success');
          setTimeout(() => window.location.reload(), 1500);
        }
      } catch (err) {
        console.error(err);
        show('Fichier invalide ou erreur serveur', 'error');
      } finally {
        setLoading(false);
        // Reset input
        event.target.value = ''; 
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = async () => {
    if(confirm('DANGER : Voulez-vous vraiment SUPPRIMER TOUTES les transactions, revenus et budgets ? Cette action est irréversible.')) {
      try {
        setLoading(true);
        await settingsService.resetData();
        show('Base de données réinitialisée', 'warning');
      } catch (err) {
        show('Erreur lors de la suppression', 'error');
      } finally {
        setLoading(false);
      }
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
            <Typography variant="h6">Mon Profil</Typography>
            <Typography variant="body2" color="text.secondary">Paramètres du compte</Typography>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <TextField 
            label="Adresse Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth 
            variant="outlined"
            size="small"
            helperText="Cet email est sauvegardé dans la base de données locale"
          />
           <Button 
            variant="contained" 
            startIcon={loading ? <CircularProgress size={20} color="inherit"/> : <Save />} 
            onClick={handleSaveProfile}
            disabled={loading}
            sx={{ alignSelf: 'flex-start' }}
          >
            Enregistrer les modifications
          </Button>
        </Stack>
      </Paper>

      {/* Préférences */}
      <SectionTitle>Préférences</SectionTitle>
      <Paper elevation={0} sx={cardStyle}>
        <List disablePadding>
          <ListItem>
            <ListItemText 
              primary="Alertes Budget" 
              secondary="Être notifié quand 80% du budget est atteint" 
            />
            <ListItemSecondaryAction>
              <Switch 
                edge="end" 
                checked={alertsEnabled}
                onChange={handleToggleBudgetAlerts}
                disabled={loading}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      {/* Zone de Données */}
      <SectionTitle>Gestion des Données (BACKUP)</SectionTitle>
      <Paper elevation={0} sx={cardStyle}>
          <Typography variant="body2" color="text.secondary" paragraph>
            Exportez vos données au format JSON personnalisé pour les sauvegarder ou les transférer.
          </Typography>
          
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<CloudDownload />}
              onClick={handleExport}
              disabled={loading}
            >
              Exporter les données
            </Button>
            
            <input 
              type="file" 
              ref={fileInputRef}
              style={{ display: 'none' }} 
              accept=".json"
              onChange={handleFileChange}
            />
            
            <Button 
              variant="outlined" 
              startIcon={<CloudUpload />}
              onClick={handleImportClick}
              disabled={loading}
            >
              Importer une sauvegarde
            </Button>
          </Stack>
      </Paper>

      {/* Zone de danger */}
      <SectionTitle>Zone de Danger</SectionTitle>
      <Paper elevation={0} sx={{ ...cardStyle, borderColor: '#ef4444', borderWidth: 1 }}>
        <Alert severity="warning" sx={{ mb: 2, bgcolor: 'transparent' }}>
            Attention : "Effacer tout" supprimera définitivement vos transactions, budgets et historiques.
        </Alert>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<DeleteForever />}
            onClick={handleClearData}
            disabled={loading}
          >
            Effacer toutes les données
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}