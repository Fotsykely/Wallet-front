import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { budgetService } from '@/services/api/budget';

export default function BudgetPage() {
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    budgetService.getBudget(1, month)
      .then(b => { if (!mounted) return; setAmount(b?.amount ?? ''); })
      .catch(() => { if (!mounted) return; setAmount(''); })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [month]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await budgetService.setBudget({ account_id: 1, month, amount: Number(amount) });
    } catch (err) {
      setError(err?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5">Budget — {month}</Typography>
      <Box mt={2} display="flex" gap={2} flexWrap="wrap" alignItems="center">
        <TextField label="Mois" type="month" value={month} onChange={e => setMonth(e.target.value)} />
        <TextField label="Montant" type="number" value={amount} onChange={e => setAmount(e.target.value)} InputProps={{ startAdornment: <span style={{ marginRight: 8 }}>MGA</span> }} />
        <Button variant="contained" onClick={handleSave} disabled={loading}>Enregistrer</Button>
      </Box>
      {error && <Typography color="error" mt={2}>{error}</Typography>}
    </Box>
  );
}