import { Chip } from '@mui/material';

export const FilterChips = ({ 
  filters, 
  activeFilter, 
  onFilterChange, 
  textColor, 
  borderColor, 
  hoverColor 
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Chip
          key={filter.key}
          label={filter.label}
          onClick={() => onFilterChange(filter.key)}
          variant={activeFilter === filter.key ? 'filled' : 'outlined'}
          sx={{
            backgroundColor: activeFilter === filter.key ? filter.color : 'transparent',
            color: activeFilter === filter.key ? 'white' : textColor,
            borderColor: activeFilter === filter.key ? filter.color : borderColor,
            '&:hover': {
              backgroundColor: activeFilter === filter.key ? filter.hoverColor : hoverColor,
            }
          }}
        />
      ))}
    </div>
  );
};