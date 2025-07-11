import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
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

export default function AddTransactionModal({ open, onClose, onSubmit, initialData, title = "Ajouter une transaction" }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('expense');
  const [date, setDate] = useState('');

  // Charger les données initiales si en mode modification
  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description || '');
      setAmount(Math.abs(initialData.amount) || '');
      setCategory(initialData.category || 'expense');
      setDate(initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '');
    } else {
      setDescription('');
      setAmount('');
      setCategory('expense');
      setDate('');
    }
  }, [initialData, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;
    onSubmit({ description, amount, category, date });
    setDescription('');
    setAmount('');
    setCategory('expense');
    setDate('');
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
          <InputLabel>Catégorie</InputLabel>
          <Select
            value={category}
            onChange={e => setCategory(e.target.value)}
            label="Catégorie"
          >
            <MenuItem value="expense">Dépense</MenuItem>
            <MenuItem value="income">Revenu</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          fullWidth
          value={date}
          onChange={e => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          helperText="Optionnel - laissez vide pour aujourd'hui"
        />
      </Box>
    </Modal>
  );
}