/* eslint-disable no-unused-vars */
import { Box, Typography, Paper, Chip, Avatar, IconButton } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export const TransactionTable = ({
  transactions,
  getCategoryIcon,
  getCategoryColor,
  getStatusText,
  getStatusColor,
  formatAmount,
  textColor,
  mutedColor,
  borderColor,
  hoverColor,
  onActionClick,
}) => (
  <Paper
    sx={{
      backgroundColor: 'inherit',
      color: textColor,
      borderRadius: 2,
      overflow: 'hidden',
      border: `1px solid ${borderColor}`
    }}
  >
    {/* En-têtes */}
    <Box sx={{ p: 2, borderBottom: `1px solid ${borderColor}` }}>
        <div className="grid grid-cols-12 gap-4 items-center font-medium text-sm">
            <div className="col-span-1 text-center">
                <Typography variant="body2" sx={{ color: mutedColor, fontWeight: 600 }}>
                TYPE
                </Typography>
            </div>
            <div className="col-span-2">
                <Typography variant="body2" sx={{ color: mutedColor, fontWeight: 600 }}>
                MONTANT
                </Typography>
            </div>
            <div className="col-span-2">
                <Typography variant="body2" sx={{ color: mutedColor, fontWeight: 600 }}>
                CATÉGORIE
                </Typography>
            </div>
            <div className="col-span-4">
                <Typography variant="body2" sx={{ color: mutedColor, fontWeight: 600 }}>
                DESCRIPTION
                </Typography>
            </div>
            <div className="col-span-2">
                <Typography variant="body2" sx={{ color: mutedColor, fontWeight: 600 }}>
                DATE
                </Typography>
            </div>
        </div>
    </Box>
    {/* Lignes de transactions */}
    <div>
      {transactions.map((transaction, index) => {
        const CategoryIcon = getCategoryIcon(transaction.category);
        return (
            <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-opacity-50 transition-colors duration-200"
                sx={{
                '&:hover': {
                    backgroundColor: hoverColor
                }
                }}
            >
                <Box sx={{ 
                p: 2, 
                borderBottom: index < transactions.length - 1 ? `1px solid ${borderColor}` : 'none',
                '&:hover': {
                    backgroundColor: hoverColor
                }
                }}>
                <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Type */}
                    <div className="col-span-1 flex justify-center">
                    <Box
                        sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: getCategoryColor(transaction.category),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}
                    >
                        <CategoryIcon sx={{ fontSize: 16, color: 'white' }} />
                    </Box>
                    </div>

                    {/* Montant */}
                    <div className="col-span-2">
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            fontWeight: 600,
                            color: transaction.amount > 0 ? '#4caf50' : '#f44336'
                        }}
                        >
                        {transaction.amount > 0 ? '+' : ''}{formatAmount(transaction.amount)}
                    </Typography>
                    </div>

                    {/* Catégorie */}
                    <div className="col-span-2">
                        <Chip
                            label={getStatusText(transaction.category)}
                            size="small"
                            sx={{
                            backgroundColor: getStatusColor(transaction.category),
                            color: 'white',
                            fontSize: '0.75rem',
                            height: 24,
                            fontWeight: 500
                            }}
                        />
                    </div>

                    {/* Description */}
                    <div className="col-span-4">
                    <Typography variant="body2" sx={{ color: textColor }}>
                        {transaction.description}
                    </Typography>
                    </div>

                    {/* Date et actions */}
                    <div className="col-span-3 flex items-center justify-between">
                    <Typography variant="caption" sx={{ color: mutedColor }}>
                        {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={(e) => onActionClick(e, transaction)}
                        sx={{ color: mutedColor }}
                    >
                        <MoreVert fontSize="small" />
                    </IconButton>
                    </div>
                </div>
                </Box>
            </motion.div>
            );
      })}
    </div>
  </Paper>
);

TransactionTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  getCategoryIcon: PropTypes.func.isRequired,
  getCategoryColor: PropTypes.func.isRequired,
  getStatusText: PropTypes.func.isRequired,
  getStatusColor: PropTypes.func.isRequired,
  formatAmount: PropTypes.func.isRequired,
  textColor: PropTypes.string.isRequired,
  mutedColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  onActionClick: PropTypes.func.isRequired,
};