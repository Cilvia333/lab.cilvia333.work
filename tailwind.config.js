const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'src/**/*.css',
      'src/**/*.js',
      'src/**/*.ts',
      'src/**/*.jsx',
      'src/**/*.tsx',
    ],
  },
  theme: {
    screens: {
      xs: '411px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        default: [
          'Montserrat',
          '游ゴシック',
          'YuGothic',
          '游ゴシック体',
          'Yu Gothic',
          'ヒラギノ角ゴ Pro',
          'Hiragino Kaku Gothic Pro',
          'メイリオ',
          'Meiryo',
          'sans-serif',
        ],
      },
      borderRadius: {
        circle: '50%',
      },
      transitionDelay: {
        0: '0ms',
      },
      spacing: {
        '80px': '80px',
        '72px': '72px',
        '64px': '64px',
        '56px': '56px',
        '48px': '48px',
        '40px': '40px',
        '32px': '32px',
        '24px': '24px',
        '20px': '20px',
        '16px': '16px',
        '12px': '12px',
        '8px': '8px',
        '6px': '6px',
        '4px': '4px',
        '2px': '2px',
        '1px': '1px',
      },
    },
  },
  plugins: [],
};
