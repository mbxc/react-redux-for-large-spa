var path = require('path');
var webpack = require("webpack");
var fs = require("fs");
var util = require('util');
var autoprefixer = require('autoprefixer');

// https://www.npmjs.com/package/assets-webpack-plugin
var AssetsPlugin = require('assets-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({ prettyPrint: true });

var webapp = path.resolve(__dirname, 'webapp');

module.exports = {
  context: webapp, //set the context of your app to be the project directory
  node: {
    __filename: true //Allow use of __filename in modules, based on context
  },
  entry: {
    main: path.join(webapp, 'index.js'),
    vendors: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'react-router-redux',
      'classnames'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'assets/[name].[chunkhash].bundle.js',
    chunkFilename: 'assets/[name].[chunkhash].bundle.js'
  },

  plugins: [
    assetsPluginInstance,
    new CaseSensitivePathsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/vendors.[chunkhash].bundle.js'),

    // https://webpack.github.io/docs/long-term-caching.html
    // todo(eric): refactor by extracting the code below to an individual del tools directory
    function () {

      this.plugin('done', function (stats) {

        // helper function that gets the bundle path from the asset stats
        function getChunkAssetPath(assetsByChunkName, chunkName) {
          if (assetsByChunkName && assetsByChunkName[chunkName]) {
            if (typeof assetsByChunkName[chunkName] === 'string') {
              return assetsByChunkName[chunkName];
            } else {
              return assetsByChunkName[chunkName][0];
            }
          }
          return null;
        }

        function removePreviousChunks(chunkName) {
          const previousChunks = existingBundles.assets.map(asset => asset.name);
          const currentChunks = stats.assets.map(asset => asset.name);

          previousChunks.forEach(chunk => {
            if (currentChunks.indexOf(chunk) >= 0) return;
            // delete the previous asset file.
            try {
              fs.unlinkSync(path.join(__dirname, 'build/', chunk));
              fs.unlinkSync(path.join(__dirname, 'build/', chunk + '.map'));
            } catch (e) {
              console.log('#error: %s', e.message);
            }
          });
        }

        // get the existing bundle assets stats info if exists,
        // otherwise null is returned
        function getExistingAssetStats() {
          try {
            var statsFileContent = fs.readFileSync(
              path.join(__dirname, 'webpack-assets-stats.json'),
              { encoding: 'utf8' }
            );
            return JSON.parse(statsFileContent);
          } catch (e) {
            console.log('#error: %s', e.message);
          }
          return null;
        }

        stats = stats.toJson();

        var existingBundles = getExistingAssetStats() || {};

        var appHtmlSrcPath = path.join(__dirname, 'index.html');
        var appHtmlDstPath = path.join(__dirname, 'build/index.html');

        var contents = fs.readFileSync(appHtmlSrcPath, { encoding: 'utf8' });
        contents = contents.replace(/\{assets\/(.+)\}/gi, function (m, chunkName) {
          return getChunkAssetPath(stats.assetsByChunkName, chunkName) || m;
        });

        removePreviousChunks();

        // update app.html in build/ directory
        fs.writeFileSync(
          appHtmlDstPath,
          contents,
          { encoding: 'utf8' }
        );

        // update the assets stats.
        fs.writeFileSync(
          path.join(__dirname, 'webpack-assets-stats.json'),
          JSON.stringify(stats, null, 2),
          { encoding: 'utf8' }
        );
        console.log('#post-process: webpack assets stats updated at ', new Date());
      });
    },
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': process.env.NODE_ENV === 'production' ? '"production"' : '"development"'
      }
    })
  ],

  resolve: {
    root: webapp,
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components|vendor)/,
      loader: 'babel',
      query: {
        retainLines: true,
        cacheDirectory: true,
        presets: ['react', 'es2015', 'stage-2']
      }
    }, {
      test: /\.less$/,
      exclude: [/theme.less/, /node_modules/],
      loader: "style!css!postcss!less"
    }, {
      test: /\.json$/,
      loader: "json"
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
      loader: "file-loader?name=[path][name].[ext]?[hash]"
    }]
  },

  postcss: [
    autoprefixer({
      browsers: ['last 5 versions']
    })
  ],

  externals: {
    'lodash': '_'
  }
};
