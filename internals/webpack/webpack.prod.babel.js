// Important modules this config uses
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const {HashedModuleIdsPlugin} = require('webpack');

module.exports = require('./webpack.base.babel')({
    mode: 'production',

    // In production, we skip all hot-reloading stuff
    entry: [path.join(process.cwd(), 'app/app.js')],

    // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js',
    },

    optimization: {
        minimize: true,
        nodeEnv: 'production',
        sideEffects: true,
        concatenateModules: true,
        splitChunks: {chunks: 'all'},
        runtimeChunk: true,
    },

    plugins: [
        // Minify and optimize the index.html
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            chunksSortMode: 'none', // because of Error('Cyclic dependency' + nodeRep)
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,
        }),

        // Put it in the end to capture all the HtmlWebpackPlugin's
        // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
        new OfflinePlugin({
            relativePaths: false,
            publicPath: '/',
            appShell: '/',

            // No need to cache .htaccess. See http://mxs.is/googmp,
            // this is applied before any match in `caches` section
            excludes: ['.htaccess'],

            caches: {
                main: [':rest:'],

                // All chunks marked as `additional`, loaded after main section
                // and do not prevent SW to install. Change to `optional` if
                // do not want them to be preloaded at all (cached only when first loaded)
                additional: ['*.chunk.js'],
            },

            // Removes warning for about `additional` section usage
            safeToUseOptionalCaches: true,
        }),

        new WebpackPwaManifest({
            name: 'test denteez',
            short_name: 'test denteez',
            description: 'test denteez',
            background_color: '#fafafa',
            theme_color: '#87b448',
            icons: [
                {
                    src: path.resolve('app/images/icon-48x48.png'),
                    sizes: [48],
                },
            ],
        }),

        new HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20,
        }),
    ],

    performance: {
        assetFilter: assetFilename =>
            !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
    },
});
