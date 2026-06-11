import { SearchIcon } from '../weather-icons/Icons';
import { styles } from '../../styles/dashboard.styles';

const SearchBar = ({ searchInput, setSearchInput, handleSearch, themeConfig }) => {
  const S = styles;

  // Fallback styling parameters if themeConfig isn't fully populated yet
  const isLightMode = themeConfig?.bg === '#F8FAFC' || themeConfig?.bg === '#FFFFFF';
  const textColor = themeConfig?.textPrimary || (isLightMode ? '#0F172A' : '#FFFFFF');
  const iconMutedColor = themeConfig?.textMuted || (isLightMode ? '#94A3B8' : '#64748B');
  const placeholderColor = isLightMode ? '#94A3B8' : '#475569';
  const containerBg = themeConfig?.cardBg || (isLightMode ? '#FFFFFF' : 'rgba(255, 255, 255, 0.03)');
  const borderColor = themeConfig?.border || (isLightMode ? '#E2E8F0' : 'transparent');

  return (
    <div style={{ ...S.searchRow, gap: 12 }}>
      <div style={{ 
        ...S.searchWrap, 
        background: containerBg,
        border: `1px solid ${borderColor}`,
        boxShadow: isLightMode ? '0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.03)' : 'none',
        borderRadius: 12, // Smoothed corners to match premium cards
        padding: '0 14px',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        transition: 'all 0.3s ease'
      }}>
        {/* Dynamic color override for the icon */}
        <span style={{ ...S.searchIcon, color: iconMutedColor, display: 'flex', alignItems: 'center', marginRight: 10 }}>
          <SearchIcon />
        </span>
        
        <input
          style={{
            ...S.searchInput,
            background: 'transparent',
            color: textColor,
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            fontWeight: '500',
            width: '100%',
            height: '44px',
            // Simple placeholder styling trick using custom attribute logic if needed,
            // but standard text-color fixes the contrast immediately when typing.
          }}
          placeholder="Search city…"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />

        {/* Global CSS injection specifically to target placeholder color dynamically */}
        <style>{`
          input::placeholder {
            color: ${placeholderColor} !important;
            opacity: 1 !important;
          }
        `}</style>
      </div>

      <button 
        onClick={handleSearch} 
        style={{
          ...S.searchBtn,
          height: '44px',
          padding: '0 20px',
          borderRadius: 12,
          fontWeight: '600',
          cursor: 'pointer',
          // Keep your custom purple gradient but add a subtle light-mode shadow for depth
          boxShadow: isLightMode ? '0 4px 12px rgba(79, 70, 229, 0.2)' : 'none', 
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;