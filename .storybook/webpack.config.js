module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    use: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader')
      },
    ],
  });
  config.module.rules.push({
    test: /\.stories\.tsx?$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader')
      },
      // Optional
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      }
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};