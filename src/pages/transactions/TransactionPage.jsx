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

// Données de démonstration - à remplacer par vos appels API
const mockTransactions = [
  {
    id: 1,
    type: 'sent',
    amount: -500.00,
    currency: 'USD',
    originalAmount: -500000,
    originalCurrency: 'IDR',
    paymentMethod: 'Credit Card',
    paymentDetails: '**** 6969',
    status: 'success',
    activity: 'Sending money to Raihan Fikri',
    recipient: 'Raihan Zuhlimin',
    avatar: 'R',
    avatarColor: '#ff9800',
    date: 'Aug 28, 2023 3:40 PM',
    icon: TrendingUp
  },
  {
    id: 2,
    type: 'sent',
    amount: -200.00,
    currency: 'USD',
    originalAmount: -200000,
    originalCurrency: 'IDR',
    paymentMethod: 'Wire Transfer',
    paymentDetails: '**** 8830',
    status: 'success',
    activity: 'Sending money to Bani Zuhlimin',
    recipient: 'Bani Zuhlimin',
    avatar: 'B',
    avatarColor: '#4caf50',
    date: 'Aug 28, 2023 3:40 PM',
    icon: TrendingUp
  },
  {
    id: 3,
    type: 'received',
    amount: +1500,
    currency: 'USD',
    paymentMethod: 'Bank Transfer',
    paymentDetails: '**** 6683',
    status: 'success',
    activity: 'Received money from Andrew',
    recipient: 'Andrew Top G',
    avatar: 'AT',
    avatarColor: '#2196f3',
    date: 'Aug 28, 2023 3:40 PM',
    icon: TrendingDown
  },
  {
    id: 4,
    type: 'received',
    amount: +2500,
    currency: 'USD',
    paymentMethod: 'PayPal',
    paymentDetails: '@clarista',
    status: 'success',
    activity: 'Payment for product',
    recipient: 'Clarista Jawl',
    avatar: 'C',
    avatarColor: '#9c27b0',
    date: 'Aug 28, 2023 3:40 PM',
    icon: TrendingDown
  },
  {
    id: 5,
    type: 'received',
    amount: +1500,
    currency: 'USD',
    paymentMethod: 'Payoneer',
    paymentDetails: '**** 1083',
    status: 'incomplete',
    activity: 'Payment for invoice',
    recipient: 'Andrew Top G',
    avatar: 'AT',
    avatarColor: '#2196f3',
    date: 'Aug 27, 2023 5:30 PM',
    icon: TrendingDown
  },
  {
    id: 6,
    type: 'converted',
    amount: 400000,
    currency: 'IDR',
    originalAmount: 40,
    originalCurrency: 'USD',
    paymentMethod: 'Debit Card',
    paymentDetails: '**** 3333',
    status: 'failed',
    activity: 'Convert money from USD to IDR',
    recipient: 'Bagus Fikri',
    avatar: 'BF',
    avatarColor: '#795548',
    date: 'Aug 27, 2023 3:35 PM',
    icon: SwapHoriz
  },
  {
    id: 7,
    type: 'received',
    amount: +500,
    currency: 'USD',
    paymentMethod: 'Credit Card',
    paymentDetails: '**** 3288',
    status: 'success',
    activity: 'Received money from Bani Zuhlimin',
    recipient: 'Bani Zuhlimin',
    avatar: 'B',
    avatarColor: '#4caf50',
    date: 'Aug 27, 2023 2:15 PM',
    icon: TrendingDown
  },
  {
    id: 8,
    type: 'received',
    amount: +1000,
    currency: 'IDR',
    paymentMethod: 'PayPal',
    paymentDetails: '@basilius.kevin',
    status: 'success',
    activity: 'Received money from Basilius Kelvin',
    recipient: 'Basilius Kelvin',
    avatar: 'BK',
    avatarColor: '#e91e63',
    date: 'Aug 27, 2023 11:10 AM',
    icon: TrendingDown
  },
  {
    id: 1,
    type: 'sent',
    amount: -500.00,
    currency: 'USD',
    originalAmount: -500000,
    originalCurrency: 'IDR',
    paymentMethod: 'Credit Card',
    paymentDetails: '**** 6969',
    status: 'success',
    activity: 'Sending money to Raihan Fikri',
    recipient: 'Raihan Zuhlimin',
    avatar: 'R',
    avatarColor: '#ff9800',
    date: 'Aug 28, 2023 3:40 PM',
    icon: TrendingUp
  },
  {
    id: 2,
    type: 'sent',
    amount: -200.00,
    currency: 'USD',
    originalAmount: -200000,
    originalCurrency: 'IDR',
    paymentMethod: 'Wire Transfer',
    paymentDetails: '**** 8830',
    status: 'success',
    activity: 'Sending money to Bani Zuhlimin',
    recipient: 'Bani Zuhlimin',
    avatar: 'B',
    avatarColor: '#4caf50',
    date: 'Aug 28, 2023 3:40 PM',
    icon: TrendingUp
  },
  {
    id: 3,
    type: 'received',
    amount: +1500,
    currency: 'USD',
    paymentMethod: 'Bank Transfer',
    paymentDetails: '**** 6683',
    status: 'success',
    activity: 'Received money from Andrew',
    recipient: 'Andrew Top G',
    avatar: 'AT',
    avatarColor: '#2196f3',
    date: 'Aug 28, 2023 3:40 PM',
    icon: TrendingDown
  },
  {
    id: 4,
    type: 'received',
    amount: +2500,
    currency: 'USD',
    paymentMethod: 'PayPal',
    paymentDetails: '@clarista',
    status: 'success',
    activity: 'Payment for product',
    recipient: 'Clarista Jawl',
    avatar: 'C',
    avatarColor: '#9c27b0',
    date: 'Aug 28, 2023 3:40 PM',
    icon: TrendingDown
  },
  {
    id: 5,
    type: 'received',
    amount: +1500,
    currency: 'USD',
    paymentMethod: 'Payoneer',
    paymentDetails: '**** 1083',
    status: 'incomplete',
    activity: 'Payment for invoice',
    recipient: 'Andrew Top G',
    avatar: 'AT',
    avatarColor: '#2196f3',
    date: 'Aug 27, 2023 5:30 PM',
    icon: TrendingDown
  },
  {
    id: 6,
    type: 'converted',
    amount: 400000,
    currency: 'IDR',
    originalAmount: 40,
    originalCurrency: 'USD',
    paymentMethod: 'Debit Card',
    paymentDetails: '**** 3333',
    status: 'failed',
    activity: 'Convert money from USD to IDR',
    recipient: 'Bagus Fikri',
    avatar: 'BF',
    avatarColor: '#795548',
    date: 'Aug 27, 2023 3:35 PM',
    icon: SwapHoriz
  },
  {
    id: 7,
    type: 'received',
    amount: +500,
    currency: 'USD',
    paymentMethod: 'Credit Card',
    paymentDetails: '**** 3288',
    status: 'success',
    activity: 'Received money from Bani Zuhlimin',
    recipient: 'Bani Zuhlimin',
    avatar: 'B',
    avatarColor: '#4caf50',
    date: 'Aug 27, 2023 2:15 PM',
    icon: TrendingDown
  },
  {
    id: 8,
    type: 'received',
    amount: +1000,
    currency: 'IDR',
    paymentMethod: 'PayPal',
    paymentDetails: '@basilius.kevin',
    status: 'success',
    activity: 'Received money from Basilius Kelvin',
    recipient: 'Basilius Kelvin',
    avatar: 'BK',
    avatarColor: '#e91e63',
    date: 'Aug 27, 2023 11:10 AM',
    icon: TrendingDown
  }
];

const getPaymentIcon = (method) => {
  switch (method.toLowerCase()) {
    case 'credit card':
    case 'debit card':
      return CreditCard;
    case 'bank transfer':
      return AccountBalance;
    case 'wire transfer':
      return AccountBalanceWallet;
    case 'paypal':
    case 'payoneer':
      return Payment;
    default:
      return Payment;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'success':
      return '#4caf50';
    case 'failed':
      return '#f44336';
    case 'incomplete':
      return '#ff9800';
    default:
      return '#757575';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'success':
      return 'Success';
    case 'failed':
      return 'Failed';
    case 'incomplete':
      return 'Incomplete';
    default:
      return 'Unknown';
  }
};

const getTypeIcon = (type) => {
  switch (type) {
    case 'sent':
      return TrendingUp;
    case 'received':
      return TrendingDown;
    case 'converted':
      return SwapHoriz;
    default:
      return TrendingUp;
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'sent':
      return '#f44336';
    case 'received':
      return '#4caf50';
    case 'converted':
      return '#2196f3';
    default:
      return '#757575';
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

const TransactionPage = () => {
  const { theme, isDark } = useOutletContext();
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [actionAnchor, setActionAnchor] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  const itemsPerPage =6;

  // Styles dynamiques basés sur le thème
  const bgColor = isDark ? '#18181b' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#111827';
  const mutedColor = isDark ? '#9ca3af' : '#6b7280';
  const borderColor = isDark ? '#374151' : '#e5e7eb';
  const hoverColor = isDark ? '#374151' : '#f9fafb';
  const searchBgColor = isDark ? '#374151' : '#f9fafb';

  // Chargement des données (simulation)
  useEffect(() => {
    // Ici vous pourrez appeler votre API
    // transactionService.getAllTransactions()
    //   .then(setTransactions)
    //   .catch(console.error);
  }, []);

  // Filtrage des transactions
  useEffect(() => {
    let filtered = transactions;

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    // Filtre par type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === typeFilter);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, statusFilter, typeFilter]);

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
    received: transactions.filter(t => t.type === 'received').length,
    sent: transactions.filter(t => t.type === 'sent').length,
    converted: transactions.filter(t => t.type === 'converted').length,
  };

  const formatAmount = (amount, currency) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: currency === 'IDR' ? 0 : 2,
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
    setSelectedTransaction(null);
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="max-w-7xl mx-auto space-y-6 px-2 sm:px-4"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        {/* Filtres par type de transaction */}
        <div className="flex flex-wrap gap-2">
          <Chip
            label={`All ${stats.all}`}
            onClick={() => setTypeFilter('all')}
            variant={typeFilter === 'all' ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: typeFilter === 'all' ? '#6366f1' : 'transparent',
              color: typeFilter === 'all' ? 'white' : textColor,
              borderColor: typeFilter === 'all' ? '#6366f1' : borderColor,
              '&:hover': {
                backgroundColor: typeFilter === 'all' ? '#5855eb' : hoverColor,
              }
            }}
          />
          <Chip
            label={`Received ${stats.received}`}
            onClick={() => setTypeFilter('received')}
            variant={typeFilter === 'received' ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: typeFilter === 'received' ? '#4caf50' : 'transparent',
              color: typeFilter === 'received' ? 'white' : textColor,
              borderColor: typeFilter === 'received' ? '#4caf50' : borderColor,
              '&:hover': {
                backgroundColor: typeFilter === 'received' ? '#43a047' : hoverColor,
              }
            }}
          />
          <Chip
            label={`Sent ${stats.sent}`}
            onClick={() => setTypeFilter('sent')}
            variant={typeFilter === 'sent' ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: typeFilter === 'sent' ? '#f44336' : 'transparent',
              color: typeFilter === 'sent' ? 'white' : textColor,
              borderColor: typeFilter === 'sent' ? '#f44336' : borderColor,
              '&:hover': {
                backgroundColor: typeFilter === 'sent' ? '#e53935' : hoverColor,
              }
            }}
          />
          <Chip
            label={`Convert ${stats.converted}`}
            onClick={() => setTypeFilter('converted')}
            variant={typeFilter === 'converted' ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: typeFilter === 'converted' ? '#2196f3' : 'transparent',
              color: typeFilter === 'converted' ? 'white' : textColor,
              borderColor: typeFilter === 'converted' ? '#2196f3' : borderColor,
              '&:hover': {
                backgroundColor: typeFilter === 'converted' ? '#1e88e5' : hoverColor,
              }
            }}
          />
        </div>

        {/* Barre de recherche et contrôles */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <TextField
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ minWidth: 300 }}
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
          
          <div className="flex gap-2">
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: mutedColor }}>Period</InputLabel>
              <Select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                label="Period"
                sx={{
                  backgroundColor: bgColor,
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: borderColor
                  }
                }}
              >
                <MenuItem value="7days">Last 7 days</MenuItem>
                <MenuItem value="30days">Last 30 days</MenuItem>
                <MenuItem value="90days">Last 90 days</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: mutedColor }}>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                sx={{
                  backgroundColor: bgColor,
                  color: textColor,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: borderColor
                  }
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
                <MenuItem value="incomplete">Incomplete</MenuItem>
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
                }
              }}
            >
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Table des transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TransactionTable
          transactions={paginatedTransactions}
          getTypeIcon={getTypeIcon}
          getTypeColor={getTypeColor}
          getPaymentIcon={getPaymentIcon}
          getStatusText={getStatusText}
          getStatusColor={getStatusColor}
          formatAmount={formatAmount}
          textColor={textColor}
          mutedColor={mutedColor}
          borderColor={borderColor}
          hoverColor={hoverColor}
          onActionClick={handleActionClick}
        />
      </motion.div>

      {/* ✅ Ajouter le composant de pagination */}
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
        <MenuItem onClick={handleCloseMenus}>View Details</MenuItem>
        <MenuItem onClick={handleCloseMenus}>Download Receipt</MenuItem>
        <MenuItem onClick={handleCloseMenus}>Report Issue</MenuItem>
      </Menu>
    </div>
  );
};

export default TransactionPage;