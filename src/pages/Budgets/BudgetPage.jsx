import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper, LinearProgress, Stack, Snackbar, Alert, CircularProgress, IconButton } from '@mui/material';
import { budgetService } from '@/services/api/budget';
import { accountsService } from '@/services/api/account';
import CloseIcon from '@mui/icons-material/Close';

export default function BudgetPage() {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [accountData, setAccountData] = useState(null);

  const fmt = new Intl.NumberFormat('fr-FR');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([
      budgetService.getBudget(1, month).catch(() => null),
      accountsService.getAccountDetails(1, true).catch(() => null),
    ]).then(([b, acc]) => {
      if (!mounted) return;
      setAmount(b?.amount ?? '');
      setAccountData(acc);
    }).catch(() => {
      if (!mounted) return;
      setAmount('');
      setAccountData(null);
    }).finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [month]);

  const expense = Math.abs(accountData?.expense || 0);
  const budgetAmount = Number(amount) || 0;
  const remaining = Math.max(budgetAmount - expense, 0);
  const percentUsed = budgetAmount > 0 ? Math.min((expense / budgetAmount) * 100, 100) : 0;

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await budgetService.setBudget({ account_id: 1, month, amount: Number(amount) });
      setSuccessMsg('Budget enregistré');
    } catch (err) {
      setError(err?.message || 'Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const applyPreset = (value) => setAmount(String(value));

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Budgets — {month}</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            label="Mois"
            type="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
            size="small"
          />
          <TextField
            label="Montant (MGA)"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            size="small"
            InputProps={{ inputProps: { min: 0 } }}
            sx={{ width: 200 }}
          />
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" onClick={() => applyPreset(50000)}>50k</Button>
            <Button variant="outlined" size="small" onClick={() => applyPreset(100000)}>100k</Button>
            <Button variant="outlined" size="small" onClick={() => applyPreset(200000)}>200k</Button>
          </Stack>
          <Box sx={{ flex: 1 }} />
          <Button variant="contained" onClick={handleSave} disabled={saving || loading || amount === ''}>
            {saving ? <CircularProgress size={20} color="inherit" /> : 'Enregistrer'}
          </Button>
        </Stack>

        <Box mt={3}>
          {loading ? (
            <Typography>Chargement des données...</Typography>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary">Budget : {budgetAmount > 0 ? `${fmt.format(budgetAmount)} MGA` : '—'}</Typography>
              <Typography variant="body2" color="text.secondary">Dépensé ce mois : {fmt.format(expense)} MGA</Typography>
              <Typography variant="body2" color={remaining === 0 ? 'error.main' : 'text.secondary'}>Restant : {fmt.format(remaining)} MGA</Typography>

              <Box mt={2}>
                <LinearProgress variant="determinate" value={percentUsed} sx={{ height: 10, borderRadius: 2 }} />
                <Typography variant="caption" mt={0.5}>{Math.round(percentUsed)}% utilisé</Typography>
              </Box>
            </>
          )}
          {error && <Typography color="error" mt={2}>{error}</Typography>}
        </Box>
      </Paper>

      {/* Historique / explications courtes */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" gutterBottom>Notes</Typography>
        <Typography variant="body2" color="text.secondary">
          Le budget se définit par mois. Utilisez les presets pour des réglages rapides.
        </Typography>
      </Paper>

      <Snackbar
        open={!!successMsg}
        autoHideDuration={3000}
        onClose={() => setSuccessMsg('')}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSuccessMsg('')}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={() => setSuccessMsg('')} severity="success" sx={{ width: '100%' }}>
          {successMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}