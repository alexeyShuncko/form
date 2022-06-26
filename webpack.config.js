const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.jsx',
    },
  plugins: [
   new HTMLWebpackPlugin({
    template: '../public/index.html'
   })
  ],
    resolve: {
        extensions: ['.js', '.json', '.png'],
      },

    devServer: {
        port: 4444,
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader']
            },
            
            {
                test: /\.jsx$/, 
                exclude: /node_modules/,  
                loader: "babel-loader",  
                options:{
                    presets:['@babel/preset-env',"@babel/preset-react"] ,
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                      ] 
                }
            }
        ]
    }
}