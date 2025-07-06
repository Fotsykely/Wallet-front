/* eslint-disable no-unused-vars */
import { Box, Typography, Paper, Chip, Avatar, IconButton } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export const TransactionTable = ({
  transactions,
  getTypeIcon,
  getTypeColor,
  getPaymentIcon,
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
                AMOUNT
                </Typography>
            </div>
            <div className="col-span-2">
                <Typography variant="body2" sx={{ color: mutedColor, fontWeight: 600 }}>
                PAYMENT METHOD
                </Typography>
            </div>
            <div className="col-span-1 text-center">
                <Typography variant="body2" sx={{ color: mutedColor, fontWeight: 600 }}>
                STATUS
                </Typography>
            </div>
            <div className="col-span-3">
                <Typography variant="body2" sx={{ color: mutedColor, fontWeight: 600 }}>
                ACTIVITY
                </Typography>
            </div>
            <div className="col-span-2">
                <Typography variant="body2" sx={{ color: mutedColor, fontWeight: 600 }}>
                PEOPLE
                </Typography>
            </div>
            <div className="col-span-1 text-right">
                <Typography variant="body2" sx={{ color: mutedColor, fontWeight: 600 }}>
                DATE
                </Typography>
            </div>
        </div>
    </Box>
    {/* Lignes de transactions */}
    <div>
      {transactions.map((transaction, index) => {
        const TypeIcon = getTypeIcon(transaction.type);
        const PaymentIcon = getPaymentIcon(transaction.paymentMethod);
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
                        backgroundColor: getTypeColor(transaction.type),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}
                    >
                        <TypeIcon sx={{ fontSize: 16, color: 'white' }} />
                    </Box>
                    </div>

                    {/* Montant */}
                    <div className="col-span-2">
                    <div className="flex flex-col">
                        <Typography 
                        variant="body2" 
                        sx={{ 
                            fontWeight: 600,
                            color: transaction.type === 'sent' ? '#f44336' : transaction.type === 'received' ? '#4caf50' : textColor
                        }}
                        >
                        {transaction.type === 'sent' ? '-' : transaction.type === 'received' ? '+' : ''}{formatAmount(transaction.amount, transaction.currency)}
                        </Typography>
                        {transaction.originalAmount && (
                        <Typography variant="caption" sx={{ color: mutedColor }}>
                            {transaction.originalAmount.toLocaleString()} {transaction.originalCurrency}
                        </Typography>
                        )}
                    </div>
                    </div>

                    {/* Méthode de paiement */}
                    <div className="col-span-2">
                    <div className="flex items-center gap-2">
                        <PaymentIcon sx={{ fontSize: 16, color: mutedColor }} />
                        <div>
                        <Typography variant="body2" sx={{ color: textColor, fontWeight: 500 }}>
                            {transaction.paymentMethod}
                        </Typography>
                        <Typography variant="caption" sx={{ color: mutedColor }}>
                            {transaction.paymentDetails}
                        </Typography>
                        </div>
                    </div>
                    </div>

                    {/* Statut */}
                    <div className="col-span-1 flex justify-center">
                    <Chip
                        label={getStatusText(transaction.status)}
                        size="small"
                        sx={{
                        backgroundColor: getStatusColor(transaction.status),
                        color: 'white',
                        fontSize: '0.75rem',
                        height: 24,
                        fontWeight: 500
                        }}
                    />
                    </div>

                    {/* Activité */}
                    <div className="col-span-3">
                    <Typography variant="body2" sx={{ color: textColor }}>
                        {transaction.activity}
                    </Typography>
                    </div>

                    {/* Personne */}
                    <div className="col-span-2">
                    <div className="flex items-center gap-2">
                        <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: transaction.avatarColor,
                            fontSize: '0.875rem',
                            fontWeight: 600
                        }}
                        >
                        {transaction.avatar}
                        </Avatar>
                        <Typography variant="body2" sx={{ color: textColor }}>
                        {transaction.recipient}
                        </Typography>
                    </div>
                    </div>

                    {/* Date et actions */}
                    <div className="col-span-1 flex items-center justify-end gap-2">
                    <Typography variant="caption" sx={{ color: mutedColor }}>
                        {new Date(transaction.date).toLocaleDateString()}
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
  getTypeIcon: PropTypes.func.isRequired,
  getTypeColor: PropTypes.func.isRequired,
  getPaymentIcon: PropTypes.func.isRequired,
  getStatusText: PropTypes.func.isRequired,
  getStatusColor: PropTypes.func.isRequired,
  formatAmount: PropTypes.func.isRequired,
  textColor: PropTypes.string.isRequired,
  mutedColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  onActionClick: PropTypes.func.isRequired,
};