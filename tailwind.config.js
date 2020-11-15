module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      mediumPrimary: ["sohne", '"Helvetica Neue"', "Helvetica", "Arial", "sans-serif"],
      mediumSecond: ['fell', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mediumParagraphBody: ['charter', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif']
    },
    extend: {
      colors: {
        'accent-1': '#333',
        'mediumPrimary': '#e6f7ef',
        'mediumContent': '#292929'
      },
      height: {
        '90vh': '90vh' 
      },
      minHeight: {
        '90vh': '90vh'
      }
    }
  },
  variants: {},
  plugins: [],
}
