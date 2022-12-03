const webpack = require("webpack");
module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://blogs.xiaxianxian.top',  // 后台接口域名
                changeOrigin: true,  //是否跨域
                pathRewrite:{
                    '^/api': '/'
                }
            }
        }
      },
    // devServer: {
    //     proxy: 'http://apis.map.qq.com'
    //   },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                "window.$": "jquery",
                Popper: ["popper.js", "default"]
            })
        ],
        module: {
            rules: [
                // 配置读取 *.md 文件的规则
                {
                    test: /\.md$/,
                     use: [
                        { loader: 'html-loader' },
                        { loader: 'markdown-loader' }
                     ]
                }
            ]
        }
       
    }
};