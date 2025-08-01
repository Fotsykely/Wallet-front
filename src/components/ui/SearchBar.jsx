/* eslint-disable no-unused-vars */
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

export const SearchBar = ({
  searchTerm,
  onSearchChange,
  placeholder = "Rechercher...",
  mutedColor,
  searchBgColor,
  textColor,
  borderColor,
  ...props
}) => {
  return (
    <TextField
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
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
      {...props}
    />
  );
};