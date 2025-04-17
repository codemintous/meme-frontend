module.exports = {
  theme: {
    extend: {
      // ... other extensions
    },
  },
  variants: {},
  plugins: [
    require('tailwind-scrollbar-hide'),
    // Add a plugin for hiding scrollbars
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
} 