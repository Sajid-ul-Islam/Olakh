module.exports = function (api) {
  api.cache.using(() => process.env.BABEL_ENV || process.env.NODE_ENV || 'development');

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for react-native-reanimated
      // https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#babel-configurator
      'react-native-reanimated/plugin',
    ],
  };
};
