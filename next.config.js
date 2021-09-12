require('dotenv').config();
const { resolve } = require('path');
// const withImages = require('next-images');

// const nextConfig = withImages({
//   webpack: (config, options) => {
//     config.resolve.alias['~'] = resolve(__dirname, 'src');
//     config.module.rules.push({
//       test: /\.(glsl|frag|vert)$/,
//       include: [resolve(__dirname, 'src')],
//       exclude: /node_modules/,
//       use: 'raw-loader'
//       // use: [
//       //   'raw-loader',
//       //   {
//       //     loader: 'glslify-loader',
//       //     options: {
//       //       transform: [
//       //         ['glslify-hex', { 'option-1': true, 'option-2': 42 }]
//       //       ]
//       //     }
//       //   }
//       // ]
//     });
//     return config;
//   },
// });

//module.exports = nextConfig;

module.exports = {
  webpack: (config, options) => {
    config.resolve.alias['~'] = resolve(__dirname, 'src');
    config.module.rules.push({
      test: /\.(glsl|frag|vert)$/,
      include: [resolve(__dirname, 'src')],
      exclude: /node_modules/,
      use: [
        'raw-loader',
        {
          loader: 'glslify-loader',
          // options: {
          //   transform: [
          //     ['glslify-hex', { 'option-1': true, 'option-2': 42 }]
          //   ]
          // }
        }
      ]
    });
    return config;
  },
}
