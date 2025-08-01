/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, IconButton, Menu, MenuItem, Pagination } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import MoreVert from '@mui/icons-material/MoreVert';
import { RecurringTable } from '@/components/table/recurringTable';

const mockRecurrings = [
  {
    id: 1,
    account_id: 1,
    type: 'expense',
    description: 'Loyer',
    amount: 50,
    recurrence: 'monthly',
    recurrence_date: 2,
  },
  {
    id: 3,
    account_id: 1,
    type: 'expense',
    description: 'Loyer',
    amount: 500,
    recurrence: 'monthly',
    recurrence_date: 1,
  },
  {
    id: 6,
    account_id: 1,
    type: 'expense',
    description: 'café',
    amount: 2000,
    recurrence: 'daily',
    recurrence_date: null,
  },
  {
    id: 72,
    account_id: 1,
    type: 'expense',
    description: 'Loyer',
    amount: 50,
    recurrence: 'monthly',
    recurrence_date: 2,
  },
  {
    id: 3211,
    account_id: 1,
    type: 'expense',
    description: 'café',
    amount: 2000,
    recurrence: 'daily',
    recurrence_date: null,
  },
  {
    id: 190,
    account_id: 1,
    type: 'expense',
    description: 'Loyer',
    amount: 50,
    recurrence: 'monthly',
    recurrence_date: 2,
  },
  {
    id: 213,
    account_id: 1,
    type: 'expense',
    description: 'Loyer',
    amount: 500,
    recurrence: 'monthly',
    recurrence_date: 1,
  },
  {
    id: 61112,
    account_id: 1,
    type: 'expense',
    description: 'café',
    amount: 2000,
    recurrence: 'daily',
    recurrence_date: null,
  },
  {
    id: 12121,
    account_id: 1,
    type: 'expense',
    description: 'Loyer',
    amount: 50,
    recurrence: 'monthly',
    recurrence_date: 2,
  },
  {
    id: 2113,
    account_id: 1,
    type: 'expense',
    description: 'Loyer',
    amount: 500,
    recurrence: 'monthly',
    recurrence_date: 1,
  },
  {
    id: 6212121,
    account_id: 1,
    type: 'expense',
    description: 'café',
    amount: 2000,
    recurrence: 'daily',
    recurrence_date: null,
  },
];

export default function RecurringPage() {
  const { theme, isDark } = useOutletContext?.() || {};
  const [recurrings, setRecurrings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionAnchor, setActionAnchor] = useState(null);
  const [selectedRecurring, setSelectedRecurring] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;
  const totalPages = Math.ceil(recurrings.length / itemsPerPage);
  const paginatedRecurrings = recurrings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Styles dynamiques
  const bgColor = isDark ? '#18181b' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#111827';
  const mutedColor = isDark ? '#9ca3af' : '#6b7280';
  const borderColor = isDark ? '#374151' : '#e5e7eb';
  const hoverColor = isDark ? '#374151' : '#f9fafb';

  useEffect(() => {
    setTimeout(() => {
      setRecurrings(mockRecurrings);
      setLoading(false);
    }, 500);
    // Pour l'API plus tard :
    // recurringService.getAll().then(setRecurrings).finally(() => setLoading(false));
  }, []);

  const handleActionClick = (event, recurring) => {
    setSelectedRecurring(recurring);
    setActionAnchor(event.currentTarget);
  };

  const handleCloseMenus = () => {
    setActionAnchor(null);
    setSelectedRecurring(null);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Typography variant="h6" sx={{ color: textColor }}>
          Chargement des récurrences...
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Box sx={{ p: 3 }}>
        <Button variant="contained" sx={{ mb: 2 }}>Add Recurring</Button>
      </Box>
      {/* Responsive : cartes sur mobile, tableau sur desktop */}
      <div className="block sm:hidden space-y-3 px-3">
        {paginatedRecurrings.map((rec) => (
          <Paper key={rec.id} sx={{ backgroundColor: bgColor, color: textColor, border: `1px solid ${borderColor}`, borderRadius: 2, p: 2 }}>
            <Typography variant="subtitle1">{rec.description}</Typography>
            <Typography variant="body2">Type: {rec.type}</Typography>
            <Typography variant="body2">Amount: {rec.amount}</Typography>
            <Typography variant="body2">Recurrence: {rec.recurrence}</Typography>
            {rec.recurrence_date !== null && (
              <Typography variant="body2">
                Recurrence date: {rec.recurrence_date}
              </Typography>
            )}
            <Typography variant="body2">Account ID: {rec.account_id}</Typography>
            <Box className="flex justify-end">
              <IconButton size="small" onClick={e => handleActionClick(e, rec)} sx={{ color: mutedColor }}>
                <MoreVert fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </div>
      <div className="hidden sm:block px-3">
        <RecurringTable
          rows={paginatedRecurrings}
          textColor={textColor}
          mutedColor={mutedColor}
          borderColor={borderColor}
          hoverColor={hoverColor}
          onActionClick={handleActionClick}
        />
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
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
        </div>
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
        <MenuItem /* onClick={} */>Modifier</MenuItem>
        <MenuItem /* onClick={} */>Supprimer</MenuItem>
      </Menu>
    </div>
  );
}