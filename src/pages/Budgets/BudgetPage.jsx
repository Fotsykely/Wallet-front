/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { 
  Box, Typography, TextField, Button, Paper, 
  LinearProgress, Stack, CircularProgress 
} from '@mui/material';
import { useNotifier } from '@/components/ui/notifications/NotifierContext';
import { useBudget } from '@/pages/Budgets/useBudget';

export default function BudgetPage() {
  // Custom hook for budget management
  const {
    month, setMonth,
    amount, setAmount,
    summary,
    loading, saving, error,
    save,
    isFutureMonth
  } = useBudget(1, new Date().toISOString().slice(0, 7));

  const { show } = useNotifier();

  // Wrapper to handle UI feedback after saving
  const onSave = async () => {
    try {
      await save();
      show('Budget enregistré avec succès', 'success');
    } catch (e) {
      show(e?.message || 'Erreur', 'error');
    }
  };

  const applyPreset = (value) => setAmount(String(value));

  // Extract summary values with defaults
  const budgetVal = summary.budget || 0;
  const expenseVal = summary.spent || 0;
  const remainingVal = summary.remaining || 0;
  const percentVal = summary.percent || 0;

  const fmt = new Intl.NumberFormat('fr-FR');

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Budgets — {month}</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            label="Mois"
            type="month"
            value={month || ''}
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
          <Button 
            variant="contained" 
            onClick={onSave} 
            disabled={saving || loading || amount === ''}
          >
            {saving ? <CircularProgress size={20} color="inherit" /> : 'Enregistrer'}
          </Button>
        </Stack>

        <Box mt={3}>
          {loading ? (
            <div className="flex justify-center p-4">
               <CircularProgress size={30} />
            </div>
          ) : (
            <>
              {/* Display API errors from the hook */}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Typography variant="body2" color="text.secondary">
                Budget : {budgetVal > 0 ? `${fmt.format(budgetVal)} MGA` : '—'}
              </Typography>

              {isFutureMonth && expenseVal === 0 ? (
                <>
                  <Typography variant="body2" color="text.secondary">Dépensé ce mois : —</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Restant : {budgetVal > 0 ? `${fmt.format(budgetVal)} MGA` : '—'}
                  </Typography>
                  <Typography variant="caption" mt={0.5} color="text.secondary">
                    Aucune dépense enregistrée pour ce mois (futur).
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="body2" color="text.secondary">
                    Dépensé ce mois : {fmt.format(expenseVal)} MGA
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color={remainingVal === 0 ? 'error.main' : 'text.secondary'}
                  >
                    Restant : {fmt.format(remainingVal)} MGA
                  </Typography>

                  <Box mt={2}>
                    <LinearProgress 
                      variant="determinate" 
                      value={percentVal} 
                      sx={{ 
                        height: 10, 
                        borderRadius: 2,
                        // Ajout d'une couleur conditionnelle optionnelle
                        backgroundColor: theme => theme.palette.grey[200],
                        '& .MuiLinearProgress-bar': {
                           backgroundColor: percentVal >= 100 ? '#ef4444' : '#3b82f6'
                        }
                      }} 
                    />
                    <Typography variant="caption" mt={0.5}>
                      {Math.round(percentVal)}% utilisé
                    </Typography>
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" gutterBottom>Notes</Typography>
        <Typography variant="body2" color="text.secondary">
          Le budget se définit par mois. Utilisez les presets pour des réglages rapides.
        </Typography>
      </Paper>
    </Box>
  );
}