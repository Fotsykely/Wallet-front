/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, IconButton, Menu, MenuItem, Pagination } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import MoreVert from '@mui/icons-material/MoreVert';
import { RecurringTable } from '@/components/table/recurringTable';
import { PageHeader } from '@/components/common/PageHeader';
import { recurringService } from '@/services/api/recurring';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function RecurringPage() {
  const { theme, isDark } = useOutletContext?.() || {};
  const [recurrings, setRecurrings] = useState([]);
  const [filteredRecurrings, setFilteredRecurrings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionAnchor, setActionAnchor] = useState(null);
  const [selectedRecurring, setSelectedRecurring] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const itemsPerPage = 7;

  // Styles dynamiques
  const bgColor = isDark ? '#18181b' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#111827';
  const mutedColor = isDark ? '#9ca3af' : '#6b7280';
  const borderColor = isDark ? '#374151' : '#e5e7eb';
  const hoverColor = isDark ? '#374151' : '#f9fafb';
  const searchBgColor = isDark ? '#374151' : '#f9fafb';

  // Filtrage des récurrences
  useEffect(() => {
    let filtered = recurrings;

    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.recurrence.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(r => r.type.toLowerCase() === typeFilter);
    }

    setFilteredRecurrings(filtered);
  }, [recurrings, searchTerm, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredRecurrings.length / itemsPerPage);
  const paginatedRecurrings = filteredRecurrings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Statistiques pour les filtres
  const stats = {
    all: recurrings.length,
    income: recurrings.filter(r => r.type.toLowerCase() === 'income').length,
    expense: recurrings.filter(r => r.type.toLowerCase() === 'expense').length,
  };

  // Configuration des filtres
  const filterOptions = [
    {
      key: 'all',
      label: `Toutes (${stats.all})`,
      color: '#6366f1',
      hoverColor: '#5855eb'
    },
    {
      key: 'income',
      label: `Revenus (${stats.income})`,
      color: '#4caf50',
      hoverColor: '#43a047'
    },
    {
      key: 'expense',
      label: `Dépenses (${stats.expense})`,
      color: '#f44336',
      hoverColor: '#e53935'
    }
  ];

  useEffect(() => {
    recurringService.getRecurringByAccountId(1)
      .then(setRecurrings)
      .finally(() => setLoading(false));
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
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <PageHeader
          filters={filterOptions}
          activeFilter={typeFilter}
          onFilterChange={setTypeFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Rechercher des récurrences..."
          textColor={textColor}
          borderColor={borderColor}
          hoverColor={hoverColor}
          mutedColor={mutedColor}
          searchBgColor={searchBgColor}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{ 
              boxShadow: 'none', 
              textTransform: 'none', 
              width: { xs: '100%', sm: 'auto' }, 
              mb: { xs: 1, sm: 0 } 
            }}
          >
            Ajouter une récurrence
          </Button>
        </PageHeader>
      </motion.div>

      {/* Table des récurrences ou cartes responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Responsive : cartes sur mobile, tableau sur desktop */}
        <div className="block sm:hidden space-y-3 px-3">
          {paginatedRecurrings.map((rec) => (
            <Paper key={rec.id} sx={{ backgroundColor: bgColor, color: textColor, border: `1px solid ${borderColor}`, borderRadius: 2, p: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {rec.description}
              </Typography>
              <div className="space-y-1">
                <Typography variant="body2" sx={{ color: mutedColor }}>
                  Type: <span style={{ color: textColor }}>{rec.type}</span>
                </Typography>
                <Typography variant="body2" sx={{ color: mutedColor }}>
                  Montant: <span style={{ color: textColor }}>{rec.amount} MGA</span>
                </Typography>
                <Typography variant="body2" sx={{ color: mutedColor }}>
                  Récurrence: <span style={{ color: textColor }}>{rec.recurrence}</span>
                </Typography>
                {rec.recurrence_date !== null && (
                  <Typography variant="body2" sx={{ color: mutedColor }}>
                    Date de récurrence: <span style={{ color: textColor }}>{rec.recurrence_date}</span>
                  </Typography>
                )}
                <Typography variant="body2" sx={{ color: mutedColor }}>
                  Compte ID: <span style={{ color: textColor }}>{rec.account_id}</span>
                </Typography>
              </div>
              <Box className="flex justify-end mt-2">
                <IconButton size="small" onClick={e => handleActionClick(e, rec)} sx={{ color: mutedColor }}>
                  <MoreVert fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </div>
        
        {/* Tableau pour desktop */}
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
        <MenuItem onClick={handleCloseMenus}>Modifier</MenuItem>
        <MenuItem onClick={handleCloseMenus}>Supprimer</MenuItem>
      </Menu>
    </div>
  );
}