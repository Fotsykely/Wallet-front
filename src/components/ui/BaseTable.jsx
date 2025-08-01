/* eslint-disable no-unused-vars */
import { Box, Typography, Paper, IconButton } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export function BaseTable({
  columns,
  rows,
  textColor,
  mutedColor,
  borderColor,
  hoverColor,
  onActionClick,
  getRowKey = (row) => row.id,
}) {
  return (
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
          {columns.map((col, idx) => (
            <div key={col.key} className={`col-span-${col.colSpan || 2}`}>
              <Typography variant="body2" sx={{ color: mutedColor, fontWeight: 600 }}>
                {col.label}
              </Typography>
            </div>
          ))}
          <div className="col-span-1" />
        </div>
      </Box>
      {/* Lignes */}
      <div>
        {rows.map((row, index) => (
          <motion.div
            key={getRowKey(row)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="hover:bg-opacity-50 transition-colors duration-200"
            sx={{
              '&:hover': { backgroundColor: hoverColor }
            }}
          >
            <Box sx={{
              p: 2,
              borderBottom: index < rows.length - 1 ? `1px solid ${borderColor}` : 'none',
              '&:hover': { backgroundColor: hoverColor }
            }}>
              <div className="grid grid-cols-12 gap-4 items-center">
                {columns.map((col, idx) => (
                  <div key={col.key} className={`col-span-${col.colSpan || 2}`}>
                    {col.render ? col.render(row) : (
                      <Typography variant="body2" sx={{ color: textColor }}>
                        {row[col.key]}
                      </Typography>
                    )}
                  </div>
                ))}
                <div className="col-span-1 flex justify-end">
                  <IconButton
                    size="small"
                    onClick={e => onActionClick?.(e, row)}
                    sx={{ color: mutedColor }}
                  >
                    <MoreVert fontSize="small" />
                  </IconButton>
                </div>
              </div>
            </Box>
          </motion.div>
        ))}
      </div>
    </Paper>
  );
}

BaseTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    colSpan: PropTypes.number,
    render: PropTypes.func, // (row) => ReactNode
  })).isRequired,
  rows: PropTypes.array.isRequired,
  textColor: PropTypes.string,
  mutedColor: PropTypes.string,
  borderColor: PropTypes.string,
  hoverColor: PropTypes.string,
  onActionClick: PropTypes.func,
  getRowKey: PropTypes.func,
};