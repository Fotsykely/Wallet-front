import { FilterChips } from '@/components/ui/FilterChips';
import { SearchBar } from '@/components/ui/SearchBar';

export const PageHeader = ({
  filters,
  activeFilter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  children,
  textColor,
  borderColor,
  hoverColor,
  mutedColor,
  searchBgColor
}) => {
  return (
    <div className="w-full space-y-6 px-2 sm:px-4">
      {/* Filtres */}
      <FilterChips
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        textColor={textColor}
        borderColor={borderColor}
        hoverColor={hoverColor}
      />

      {/* Barre de recherche et contrôles */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center w-full">
        <div className="w-full sm:w-auto flex flex-row gap-2 items-center">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            placeholder={searchPlaceholder}
            mutedColor={mutedColor}
            searchBgColor={searchBgColor}
            textColor={textColor}
            borderColor={borderColor}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto sm:flex-row flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};