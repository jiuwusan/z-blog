const path = require('path');
const config = require('./config');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
    publicPath: '/',
    outputDir: './dist/blog',
    lintOnSave: true,
    productionSourceMap: false,
    transpileDependencies: [
        /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
    ],
    configureWebpack: _config => {
        return {
            performance: {
                hints: false
            },
            resolve: {
                alias: {
                    '@jws': path.resolve(__dirname, './jws_modules'),
                    '@config': path.resolve(__dirname, './config')
                }
            },
            plugins: [new CKEditorWebpackPlugin({
                language: 'zh-cn',
                translationsOutputFile: /app/,
                additionalLanguages: 'all'
            })]
        }
    },
    chainWebpack: _config => {
        const svgRule = _config.module.rule('svg');
        svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));
        _config.plugin('html').tap(args => {
            args[0].title = 'Z-Blog'
            return args
        });
        _config.module
            .rule('cke-svg')
            .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
            .use('raw-loader')
            .loader('raw-loader');
        _config.module
            .rule('cke-css')
            .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
            .use('postcss-loader')
            .loader('postcss-loader')
            .tap(() => {
                return styles.getPostCssConfig({
                    themeImporter: {
                        themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                    },
                    minify: true
                });
            });
    },
    devServer: {
        disableHostCheck: true,
        proxy: config.devServerProxy
    }
};
