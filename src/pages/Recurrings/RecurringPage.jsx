/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, IconButton, Menu, MenuItem, Pagination, FormControl, InputLabel, Select } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GetApp } from '@mui/icons-material';
import MoreVert from '@mui/icons-material/MoreVert';
import { RecurringTable } from '@/components/table/recurringTable';
import { PageHeader } from '@/components/common/PageHeader';
import { recurringService } from '@/services/api/recurring';
import { exportToCsv } from '@/utils/exportCsv';
import AddRecurringModal from '@/components/modals/addRecurringModal';
import { useNotifier } from '@/components/ui/notifications/NotifierContext';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
};

export default function RecurringPage() {
  const { theme, isDark } = useOutletContext?.() || {};
  const { show } = useNotifier();
  const [recurrings, setRecurrings] = useState([]);
  const [filteredRecurrings, setFilteredRecurrings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionAnchor, setActionAnchor] = useState(null);
  const [selectedRecurring, setSelectedRecurring] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState(() => {
    return localStorage.getItem('recurringDateRange') || '7';
  });

  const itemsPerPage = 7;

  // Styles dynamiques
  const bgColor = isDark ? '#18181b' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#111827';
  const mutedColor = isDark ? '#9ca3af' : '#6b7280';
  const borderColor = isDark ? '#374151' : '#e5e7eb';
  const hoverColor = isDark ? '#374151' : '#f9fafb';
  const searchBgColor = isDark ? '#374151' : '#f9fafb';

  // Chargement des données avec filtrage par période
  useEffect(() => {
    const loadRecurrings = async () => {
      try {
        setLoading(true);
        setError(null);
        localStorage.setItem('recurringDateRange', dateRange);
        const response = await recurringService.getRecurringByAccountId(1, { maxDate: dateRange });
        setRecurrings(response);
      } catch (err) {
        console.error('Erreur lors du chargement des récurrences:', err);
        setError('Erreur lors du chargement des récurrences');
      } finally {
        setLoading(false);
      }
    };

    loadRecurrings();
  }, [dateRange]);

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

  const handleAddRecurring = async (data) => {
    try {
      setLoading(true);
      setError(null);
      await recurringService.createRecurring(
        1, // account_id
        data.type,
        data.description,
        data.amount,
        data.recurrence,
        data.recurrenceDate || null
      );
      setIsAddModalOpen(false);
      // Recharge les récurrences après ajout
      const response = await recurringService.getRecurringByAccountId(1, { maxDate: dateRange });
      setRecurrings(response);
      setFilteredRecurrings(response);
      show('Récurrence ajoutée avec succès', 'success');
    } catch (err) {
      setError("Erreur lors de l'ajout de la récurrence");
      console.error('Erreur lors du chargement des récurrences:', err);
      show(err?.message || 'Erreur lors de l\'ajout', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUpdateRecurringModal = () => {
    setIsUpdateModalOpen(true);
    setActionAnchor(null);
  };

  const handleUpdateRecurring = async (data) => {
    try {
      setLoading(true);
      setError(null);
      await recurringService.updateRecurrings(
        selectedRecurring.id,
        data.type,
        data.description,
        data.amount,
        data.recurrence,
        data.recurrenceDate || null
      );
      setIsUpdateModalOpen(false);
      setSelectedRecurring(null);
      // Recharge les récurrences après modification
      const response = await recurringService.getRecurringByAccountId(1, { maxDate: dateRange });
      setRecurrings(response);
      setFilteredRecurrings(response);
      show('Récurrence modifiée avec succès', 'success');
    } catch (err) {
      setError("Erreur lors de la modification de la récurrence");
      console.error('Erreur lors de la modification de la récurrence:', err);
      show(err?.message || 'Erreur lors de la modification', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecurring = async () => {
    try {
      setLoading(true);
      setError(null);
      await recurringService.deleteRecurring(selectedRecurring.id);
      setRecurrings(recurrings.filter(r => r.id !== selectedRecurring.id));
      setFilteredRecurrings(filteredRecurrings.filter(r => r.id !== selectedRecurring.id));
      handleCloseMenus();
      show('Récurrence supprimée', 'success');
    } catch (err) {
      setError('Erreur lors de la suppression de la récurrence');
      console.error('Erreur lors de la suppression de la récurrence:', err);
      show(err?.message || 'Erreur lors de la suppression', 'error');
    } finally {
      setLoading(false);
    }
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
      {/* recurring modal */}
      <AddRecurringModal
        open={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setSelectedRecurring(null);
        }}
        onSubmit={handleAddRecurring}
      />
      <AddRecurringModal
        open={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedRecurring(null);
        }}
        onSubmit={handleUpdateRecurring}
        initialData={selectedRecurring}
        title="Modifier la récurrence"
      />

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
            onClick={() => setIsAddModalOpen(true)}
            sx={{ 
              boxShadow: 'none', 
              textTransform: 'none', 
              width: { xs: '100%', sm: 'auto' }, 
              mb: { xs: 1, sm: 0 } 
            }}
          >
            Ajouter une récurrence
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
              dateRange ? `recurrences_${dateRange}j_of_${Date.now()}.csv` : `recurrences_of_${Date.now()}.csv`,
              filteredRecurrings
            )}
          >
            Exporter
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
                  Créé le: <span style={{ color: textColor }}>{new Date(rec.created_at).toLocaleDateString('fr-FR')} à {new Date(rec.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
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
        <MenuItem onClick={handleOpenUpdateRecurringModal}>Modifier</MenuItem>
        <MenuItem onClick={handleDeleteRecurring}>Supprimer</MenuItem>
      </Menu>
    </div>
  );
}