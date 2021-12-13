// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.js', './public/index.html'],
  },
  darkMode: false,
  theme: {
    minWidth: {
      full: '100%',
    },
    extend: {
      colors: {
        black: '#000000',
        charcoal: '#333941',
        blazeOrange: '#FF5C00',
        woodyBrown: '#3F322E',
        matBrown: '#4A4A4A',
        dullBrown: '#4B4B4B',
        white: '#FFFFFF',
        mercuryGray: '#E4E4E4',
        gray: '#D6D6D6',
        codGray: '#181818',
        lightestGray: '#FAFAFA',
        darkGray: '#909090',
        inactiveGray: '#EDEDEC',
        albescentWhite: '#F7DFD3',
        yellowBadge: {
          100: '#FFF1BE',
          200: '#B67A07'
        },
        navy: {
          100: '#3A6186',
          200: '#314D67',
          300: '#292D32',
        },
        greenAlert: {
          100: '#E4FFF2',
          200: '#AEE8D6',
        },
        greenBadge: {
          100: '#D1FFCD',
          200: '#0B8600',
        },
        lightGray: '#F0F0F0',
        ShuttleGray: '#606366',
        menuImageBg: '#E7E7E7',
        red: '#FF0000',
        redOrange: '#FF3636',
        green: '#3EC032',
        lightRed: '#FFEADA',
        lightYellow: '#FFF9E3',
        yellow: '#EBB700',
        yellowLight: '#FFC700',
        silver: '#C4C4C4',
        info: {
          100: '#C2FFFF',
          300: '#04A1D2',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      flexGrow: {
        0: 0,
        DEFAULT: 1,
        2: 2,
      },
    },
    borderColor: (theme) => ({ ...theme('colors') }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
}