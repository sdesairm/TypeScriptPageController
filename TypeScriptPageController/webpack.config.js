const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                context: 'src/UserControls/',
                from:'**/*',
                to: 'UserControls/',
                ignore: ['*.ts', '*.js'],
            },
            {
                context: './src/Views/',
                from: '**/*',
                to: 'Views/',
                ignore: ['*.ts', '*.js'],
            },
            { from: './src/default.html', to: 'default.html', toType: 'file' }
        ])
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'wwwroot')
    }
};