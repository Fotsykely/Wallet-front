import { BaseTable } from "@/components/ui/BaseTable";
import { Typography, Chip } from '@mui/material';

export function RecurringTable(props) {
  const columns = [
    { key: 'description', label: 'DESCRIPTION', colSpan: 3 },
    { 
      key: 'type', 
      label: 'TYPE', 
      colSpan: 2,
      render: (row) => (
        <Chip
          label={row.type === 'income' ? 'Revenu' : 'Dépense'}
          size="small"
          sx={{
            backgroundColor: row.type === 'income' ? '#4caf5020' : '#f4433620',
            color: row.type === 'income' ? '#4caf50' : '#f44336',
            fontWeight: 600,
            minWidth: '80px'
          }}
        />
      )
    },
    { 
      key: 'amount', 
      label: 'MONTANT', 
      colSpan: 2,
      render: (row) => (
        <Typography variant="body2" sx={{ 
          fontWeight: 600,
          color: row.type === 'income' ? '#4caf50' : '#f44336'
        }}>
          {row.amount.toLocaleString('fr-FR')} MGA
        </Typography>
      )
    },
    { 
      key: 'recurrence', 
      label: 'RÉCURRENCE', 
      colSpan: 2,
      render: (row) => (
        <Chip
          label={row.recurrence === 'monthly' ? 'Mensuel' : 
                row.recurrence === 'daily' ? 'Quotidien' : 
                row.recurrence === 'weekly' ? 'Hebdomadaire' : 
                row.recurrence === 'yearly' ? 'Annuel' : row.recurrence}
          size="small"
          variant="outlined"
          sx={{ minWidth: '80px' }}
        />
      )
    },
    { 
      key: 'recurrence_date', 
      label: 'DATE RÉC.', 
      colSpan: 1,
      render: (row) => (
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {row.recurrence_date || '-'}
        </Typography>
      )
    },
    { 
      key: 'created_at', 
      label: 'CRÉÉ LE', 
      colSpan: 1,
      render: (row) => {
        const date = new Date(row.created_at);
        const formattedDate = date.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        });
        return (
          <div>
            <Typography variant="body2" sx={{ 
              fontSize: '0.875rem',
              lineHeight: 1.2,
              fontWeight: 500
            }}>
              {formattedDate}
            </Typography>
            <Typography variant="caption" sx={{ 
              fontSize: '0.75rem', 
              opacity: 0.7,
              lineHeight: 1
            }}>
              {formattedTime}
            </Typography>
          </div>
        );
      }
    },
  ];
  return <BaseTable {...props} columns={columns} />;
}