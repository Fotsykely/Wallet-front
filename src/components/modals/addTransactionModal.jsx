import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

export default function AddTransactionModal({ open, onClose, onSubmit }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('expense');
  const [date, setDate] = useState('');

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
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 1
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        Ajouter une transaction
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
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
              startAdornment: <span style={{ marginRight: 8 }}>€</span>,
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
              <MenuItem value="loisir">Loisir</MenuItem>
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
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Annuler
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!description || !amount}
        >
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}