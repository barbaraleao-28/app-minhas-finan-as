module.exports = ({ config }) => {
  if (process.env.FINANCAS_ORIGINAL === '1') return config;
  return {
    ...config,
    plugins: config.plugins.map(plugin =>
      plugin === 'expo-router' ? [plugin, { root: './design/app' }] : plugin
    ),
  };
};
