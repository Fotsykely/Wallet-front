/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Box, Paper, Typography, Chip, Avatar, IconButton, Button, TextField, InputAdornment, Menu, MenuItem, Select, FormControl, InputLabel, Pagination, Stack, Divider, Badge } from '@mui/material';
import {
  Search,
  FilterList,
  GetApp,
  TrendingUp,
  TrendingDown,
  SwapHoriz,
  MoreVert,
  CalendarToday,
  AccountBalanceWallet,
  CreditCard,
  AccountBalance,
  Payment
} from '@mui/icons-material';
import { transactionService } from '@/services/api/transaction';
import { TransactionTable } from '@/components/ui/TransactionTable';
import { exportToCsv } from '@/utils/exportCsv';
import AddTransactionModal from '@/components/modals/addTransactionModal';
import { Money } from '@mui/icons-material';
import { money } from '@/resources/content';

// Fonctions utilitaires pour les données réelles
const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'income':
      return TrendingDown; // Reçu
    case 'expense':
      return TrendingUp; // Dépensé
    case 'loisir':
      return TrendingUp;
    default:
      return TrendingUp;
  }
};

const getCategoryColor = (category) => {
  switch (category.toLowerCase()) {
    case 'income':
      return '#4caf50'; // Vert pour les revenus
    case 'expense':
      return '#f44336'; // Rouge pour les dépenses
    case 'loisir':
      return '#ff9800'; // Orange pour les loisirs
    default:
      return '#757575';
  }
};

const getStatusColor = (category) => {
  switch (category.toLowerCase()) {
    case 'income':
      return '#4caf50';
    case 'expense':
      return '#f44336';
    case 'loisir':
      return '#ff9800';
    default:
      return '#757575';
  }
};

const getStatusText = (category) => {
  switch (category.toLowerCase()) {
    case 'income':
      return 'Income';
    case 'expense':
      return 'Expense';
    case 'loisir':
      return 'Leisure';
    default:
      return 'Other';
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

const TransactionPage = () => {
  const { theme, isDark } = useOutletContext();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [actionAnchor, setActionAnchor] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState(() => {
    return localStorage.getItem('transactionDateRange') || '7';
  });
  
  const itemsPerPage = 7;

  // Styles dynamiques basés sur le thème
  const bgColor = isDark ? '#18181b' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#111827';
  const mutedColor = isDark ? '#9ca3af' : '#6b7280';
  const borderColor = isDark ? '#374151' : '#e5e7eb';
  const hoverColor = isDark ? '#374151' : '#f9fafb';
  const searchBgColor = isDark ? '#374151' : '#f9fafb';

  // Chargement des données réelles
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        localStorage.setItem('transactionDateRange', dateRange);
        // Utiliser l'ID du compte 1 par défaut - vous pouvez le rendre dynamique
        const response = await transactionService.getAccountTransaction(1, {maxDate: dateRange});
        setTransactions(response);
        setFilteredTransactions(response);
      } catch (err) {
        console.error('Erreur lors du chargement des transactions:', err);
        setError('Erreur lors du chargement des transactions');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [dateRange]);

  // Filtrage des transactions
  useEffect(() => {
    let filtered = transactions;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(t => t.category.toLowerCase() === categoryFilter);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, categoryFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Statistiques pour les filtres
  const stats = {
    all: transactions.length,
    income: transactions.filter(t => t.category.toLowerCase() === 'income').length,
    expense: transactions.filter(t => t.category.toLowerCase() === 'expense').length,
    loisir: transactions.filter(t => t.category.toLowerCase() === 'loisir').length,
  };

  const formatAmount = (amount) => {
    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: money.abréviation,
      minimumFractionDigits: 2,
    });
    return formatter.format(Math.abs(amount));
  };

  const handleFilterClick = (event) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleActionClick = (event, transaction) => {
    setSelectedTransaction(transaction);
    setActionAnchor(event.currentTarget);
  };

  const handleCloseMenus = () => {
    setFilterAnchor(null);
    setActionAnchor(null);
  };

  const handleDeleteTransaction = () => {
    //TODO: Implémenter la logique de suppression de transaction
    transactionService.deleteTransaction(selectedTransaction.id)
      .then(() => {
        setTransactions(transactions.filter(t => t.id !== selectedTransaction.id));
        setFilteredTransactions(filteredTransactions.filter(t => t.id !== selectedTransaction.id));
        handleCloseMenus();
      })
      .catch(err => {
        console.error('Erreur lors de la suppression de la transaction:', err);
        setError('Erreur lors de la suppression de la transaction');
      });
  };

  const handleOpenUpdateTransactionModal = () => {
    setIsUpdateModalOpen(true);
    setActionAnchor();
  };

  const handleUpdateTransaction = async (data) => {
  try {
    setLoading(true);
    setError(null);
    await transactionService.UpdateTransaction(
      selectedTransaction.id,
      data.date,
      data.category,
      data.description,
      data.amount
    );
    setIsUpdateModalOpen(false);
    setSelectedTransaction(null); 
    // Recharge les transactions après modification
    const response = await transactionService.getAccountTransaction(1, {maxDate: dateRange});
    setTransactions(response);
    setFilteredTransactions(response);
  } catch (err) {
    setError("Erreur lors de la modification de la transaction");
    console.error('Erreur lors de la modification de la transaction:', err);
  } finally {
    setLoading(false);
  }
};

  const handleAddTransaction = async (data) => {
    try {
      setLoading(true);
      setError(null);
      // Ici, on suppose que l'ID du compte est 1 (à adapter si besoin)
      await transactionService.createTransaction(
        1, // account_id
        data.date, // date (peut être vide)
        data.category, // category
        data.description, // description
        data.amount // amount
      );
      setIsAddModalOpen(false);
      // Recharge les transactions après ajout
      const response = await transactionService.getAccountTransaction(1, {maxDate: dateRange});
      setTransactions(response);
      setFilteredTransactions(response);
    } catch (err) {
      setError("Erreur lors de l'ajout de la transaction");
      console.error('Erreur lors de l\'ajout de la transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  // Affichage du loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Typography variant="h6" sx={{ color: textColor }}>
          Chargement des transactions...
        </Typography>
      </div>
    );
  }

  // Affichage de l'erreur
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <Typography variant="h6" sx={{ color: '#f44336' }}>
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AddTransactionModal
        open={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedTransaction(null);
        }}
        onSubmit={handleAddTransaction}
      />
      <AddTransactionModal
        open={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedTransaction(null);
        }}
        onSubmit={handleUpdateTransaction}
        initialData={selectedTransaction}
        title="Modifier la transaction"
      />
      <motion.div 
        className="w-full space-y-6 px-2 sm:px-4"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        {/* Filtres par catégorie de transaction */}
        <div className="flex flex-wrap gap-2">
          <Chip
            label={`Toutes (${stats.all})`}
            onClick={() => setCategoryFilter('all')}
            variant={categoryFilter === 'all' ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: categoryFilter === 'all' ? '#6366f1' : 'transparent',
              color: categoryFilter === 'all' ? 'white' : textColor,
              borderColor: categoryFilter === 'all' ? '#6366f1' : borderColor,
              '&:hover': {
                backgroundColor: categoryFilter === 'all' ? '#5855eb' : hoverColor,
              }
            }}
          />
          <Chip
            label={`Revenus (${stats.income})`}
            onClick={() => setCategoryFilter('income')}
            variant={categoryFilter === 'income' ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: categoryFilter === 'income' ? '#4caf50' : 'transparent',
              color: categoryFilter === 'income' ? 'white' : textColor,
              borderColor: categoryFilter === 'income' ? '#4caf50' : borderColor,
              '&:hover': {
                backgroundColor: categoryFilter === 'income' ? '#43a047' : hoverColor,
              }
            }}
          />
          <Chip
            label={`Dépenses (${stats.expense})`}
            onClick={() => setCategoryFilter('expense')}
            variant={categoryFilter === 'expense' ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: categoryFilter === 'expense' ? '#f44336' : 'transparent',
              color: categoryFilter === 'expense' ? 'white' : textColor,
              borderColor: categoryFilter === 'expense' ? '#f44336' : borderColor,
              '&:hover': {
                backgroundColor: categoryFilter === 'expense' ? '#e53935' : hoverColor,
              }
            }}
          />
          {/* <Chip
            label={`Loisirs (${stats.loisir})`}
            onClick={() => setCategoryFilter('loisir')}
            variant={categoryFilter === 'loisir' ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: categoryFilter === 'loisir' ? '#ff9800' : 'transparent',
              color: categoryFilter === 'loisir' ? 'white' : textColor,
              borderColor: categoryFilter === 'loisir' ? '#ff9800' : borderColor,
              '&:hover': {
                backgroundColor: categoryFilter === 'loisir' ? '#f57c00' : hoverColor,
              }
            }}
          /> */}
        </div>

        {/* Barre de recherche et contrôles */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center w-full">
          <div className="w-full sm:w-auto flex flex-row gap-2 items-center">
            <TextField
              placeholder="Rechercher des transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              sx={{ minWidth: 200, flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: mutedColor, fontSize: '1.25rem' }} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: searchBgColor,
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #6366f1'
                  }
                }
              }}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto sm:flex-row flex-col">
            {/* Bouton pour ouvrir la modale d'ajout */}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsAddModalOpen(true)}
              sx={{ boxShadow: 'none', textTransform: 'none', width: { xs: '100%', sm: 'auto' }, mb: { xs: 1, sm: 0 } }}
            >
              Ajouter une transaction
            </Button>
            
            <FormControl size="small" sx={{ minWidth: 120, width: { xs: '100%', sm: 'auto' }, mb: { xs: 1, sm: 0 } }}>
              <InputLabel sx={{ color: mutedColor }}>Période</InputLabel>
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                label="Période"
                sx={{
                  backgroundColor: bgColor,
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: borderColor
                  },
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                <MenuItem value="7">7 derniers jours</MenuItem>
                <MenuItem value="15">15 derniers jours</MenuItem>
                <MenuItem value="30">30 derniers jours</MenuItem>
                <MenuItem value="90">90 derniers jours</MenuItem>
                <MenuItem value="">Tous</MenuItem>

              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<GetApp />}
              sx={{
                borderColor: borderColor,
                color: textColor,
                '&:hover': {
                  borderColor: mutedColor,
                  backgroundColor: hoverColor
                },
                width: { xs: '100%', sm: 'auto' }
              }}
              onClick={() => exportToCsv(
                dateRange ? `transaction_${dateRange}j_of_${Date.now()}.csv` : `transaction_of_${Date.now()}.csv`,
                filteredTransactions
              )}
            >
              Exporter
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Table des transactions ou cartes responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Affichage responsive : cartes sur mobile, tableau sur desktop */}
        <div className="block sm:hidden space-y-3">
          {paginatedTransactions.map((transaction, index) => {
            const CategoryIcon = getCategoryIcon(transaction.category);
            return (
              <Paper key={transaction.id} sx={{ backgroundColor: bgColor, color: textColor, border: `1px solid ${borderColor}`, borderRadius: 2, p: 2 }}>
                <div className="flex items-center gap-3 mb-2">
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: getCategoryColor(transaction.category), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CategoryIcon sx={{ fontSize: 16, color: 'white' }} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: transaction.amount > 0 ? '#4caf50' : '#f44336' }}>
                    {transaction.amount > 0 ? '+' : '-'}{formatAmount(transaction.amount)}
                  </Typography>
                  <Chip label={getStatusText(transaction.category)} size="small" sx={{ backgroundColor: getStatusColor(transaction.category), color: 'white', fontSize: '0.75rem', height: 24, fontWeight: 500 }} />
                </div>
                <Typography variant="body2" sx={{ color: textColor, mb: 1 }}>{transaction.description}</Typography>
                <div className="flex justify-between items-center">
                  <Typography variant="caption" sx={{ color: mutedColor }}>{new Date(transaction.date).toLocaleDateString('fr-FR')}</Typography>
                  <IconButton size="small" onClick={(e) => handleActionClick(e, transaction)} sx={{ color: mutedColor }}>
                    <MoreVert fontSize="small" />
                  </IconButton>
                </div>
              </Paper>
            );
          })}
        </div>
        <div className="hidden sm:block">
          <TransactionTable
            transactions={paginatedTransactions}
            getCategoryIcon={getCategoryIcon}
            getCategoryColor={getCategoryColor}
            getStatusText={getStatusText}
            getStatusColor={getStatusColor}
            formatAmount={formatAmount}
            textColor={textColor}
            mutedColor={mutedColor}
            borderColor={borderColor}
            hoverColor={hoverColor}
            onActionClick={handleActionClick}
          />
        </div>
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex justify-center"
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                color: textColor,
                '&.Mui-selected': {
                  backgroundColor: '#6366f1',
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: hoverColor,
                }
              }
            }}
          />
        </motion.div>
      )}

      {/* Menu d'actions */}
      <Menu
        anchorEl={actionAnchor}
        open={Boolean(actionAnchor)}
        onClose={handleCloseMenus}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            backgroundColor: bgColor,
            color: textColor,
            border: `1px solid ${borderColor}`,
            '& .MuiMenuItem-root': {
              color: textColor,
              '&:hover': {
                backgroundColor: hoverColor
              }
            }
          }
        }}
      >
        <MenuItem onClick={handleDeleteTransaction}>Supprimer</MenuItem>
        <MenuItem onClick={handleOpenUpdateTransactionModal}>Modifier</MenuItem>
      </Menu>
    </div>
  );
};

export default TransactionPage;