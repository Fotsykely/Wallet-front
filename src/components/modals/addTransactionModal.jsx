import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';

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
    <Modal open={open} onClose={onClose} title="Ajouter une transaction">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>
          Description
          <input
            type="text"
            className="input"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Montant
          <input
            type="number"
            className="input"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Catégorie
          <select
            className="input"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="expense">Dépense</option>
            <option value="income">Revenu</option>
          </select>
        </label>
        <label>
          Date (optionnel)
          <input
            type="date"
            className="input"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </label>
        <div className="flex gap-2 justify-end mt-2">
          <button type="button" className="btn" onClick={onClose}>Annuler</button>
          <button type="submit" className="btn btn-primary">Ajouter</button>
        </div>
      </form>
    </Modal>
  );
}