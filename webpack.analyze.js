const config = require('./webpack.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  ...config,
  plugins: [
    ...config.plugins,
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: 'bundle-analysis.html',
      generateStatsFile: true,
      statsFilename: 'bundle-stats.json'
    })
  ]
};
