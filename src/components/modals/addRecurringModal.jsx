import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { money } from '@/resources/content';

export default function AddRecurringModal({ open, onClose, onSubmit, initialData, title = "Ajouter une récurrence" }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [recurrence, setRecurrence] = useState('monthly');
  const [recurrenceDate, setRecurrenceDate] = useState('');

  // Charger les données initiales si en mode modification
  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description || '');
      setAmount(Math.abs(initialData.amount) || '');
      setType(initialData.type || 'expense');
      setRecurrence(initialData.recurrence || 'monthly');
      setRecurrenceDate(initialData.recurrence_date ? new Date(initialData.recurrence_date).toISOString().split('T')[0] : '');
    } else {
      setDescription('');
      setAmount('');
      setType('expense');
      setRecurrence('monthly');
      setRecurrenceDate('');
    }
  }, [initialData, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    onSubmit({ description, amount, type, recurrence, recurrenceDate });
    
    // Ne réinitialiser les champs que si ce n'est PAS une modification
    if (!initialData) {
      setDescription('');
      setAmount('');
      setType('expense');
      setRecurrence('monthly');
      setRecurrenceDate('');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      actions={[
        <Button key="cancel" onClick={onClose} color="inherit">
          Annuler
        </Button>,
        <Button
          key="add"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!description || !amount}
        >
          {initialData ? 'Modifier' : 'Ajouter'}
        </Button>
      ]}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Montant"
          type="number"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          InputProps={{
            startAdornment: <span style={{ marginRight: 8 }}>{money.abréviation}</span>,
          }}
        />
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={e => setType(e.target.value)}
            label="Type"
          >
            <MenuItem value="expense">Dépense</MenuItem>
            <MenuItem value="income">Revenu</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Récurrence</InputLabel>
          <Select
            value={recurrence}
            onChange={e => setRecurrence(e.target.value)}
            label="Récurrence"
          >
            <MenuItem value="daily">Quotidien</MenuItem>
            <MenuItem value="weekly">Hebdomadaire</MenuItem>
            <MenuItem value="monthly">Mensuel</MenuItem>
            <MenuItem value="yearly">Annuel</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Date de récurrence"
          type="date"
          variant="outlined"
          fullWidth
          value={recurrenceDate}
          onChange={e => setRecurrenceDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          helperText="Optionnel - laissez vide pour commencer immédiatement"
        />
      </Box>
    </Modal>
  );
}