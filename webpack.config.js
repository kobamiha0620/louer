// node.jsの標準モジュールpathの読み込み　適切なパスの書き出しに必要。
const path  = require('path');

const TerserPlugin = require("terser-webpack-plugin");
// MODE変数でmodeの値を設定する。
const MODE = "development";
// MODE変数がdevelopmentならsourceMapStatusをtrueにする。
const sourceMapStatus = MODE === "development";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const CopyWebpackPlugin   = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
const LazyLoadWebpackPlugin = require('lazyload-webpack-plugin');

module.exports = {
    //設定は絶対パスにて行う、デフォルト値はカレントディレクトリ
    //contextはデフォルトとなるディレクトの設定ができる。
    //__dirnameはNode.jsのグローバル変数。絶対パスでディレクトリ名までを取得
    // context: __dirname + "/src", 
    context: path.join(__dirname, "src"),
    entry: `./index.js`,

    //ソースマップを出力するしないはdevtoolプロパティで設定します。hidden-source-map'は出力する。falseは出力しない。
    devtool: "hidden-source-map",
    watch: true,  //watch オプションを有効にする
    watchOptions: {
        ignored: /node_modules/
      },

    //出力内容の設定
    output: {
        //  出力ファイルのディレクト名
        path: `${__dirname}/dist`,
        // 出力ファイル名
    　　// 出力ディレクト内のこの設定場所に書き出される。
        filename: "index.js",

        //cleanプロパティを設定することにより、出力ファルダ内のファイルを全て削除してから、出力します。それによりゴミファイルが残らない
        clean: {
          keep: /index.html/, // index.html をキープ（削除しない）
          keep: /lineup.html/, // index.html をキープ（削除しない）
        },        
      },
      stats: {
        children: true,
      },
    //最適化の設定。本番モードではtrueとなる
    optimization: {
        minimize: false,
        minimizer: [
            "...",
            new ImageMinimizerPlugin({
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminMinify,
                  options: {
                    // Lossless optimization with custom option
                    // Feel free to experiment with options for better result for you
                    plugins: [
                      ["gifsicle", { interlaced: true }],
                      ["jpegtran", { progressive: true }],
                      ["optipng", { optimizationLevel: 5 }],
                      // Svgo configuration here https://github.com/svg/svgo#configuration
                      [
                        "svgo",
                        {
                          plugins: extendDefaultPlugins([
                            {
                              name: "removeViewBox",
                              active: false,
                            },
                            {
                              name: "addAttributesToSVGElement",
                              params: {
                                attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                              },
                            },
                          ]),
                        },
                      ],
                    ],
                  },
                },
              }),
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                // オプションは以下のgithubを参照してください
                //必ずdevtoolオプションを使用する
                //https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                ecma: undefined,
                parse: {},
                compress: {},
                mangle: true, // Note `mangle.properties` is `false` by default.
                module: false,
                // Deprecated
                output: null,
                format: null,
                toplevel: false,
                nameCache: null,
                ie8: false,
                keep_classnames: undefined,
                keep_fnames: false,
                safari10: false,      
              },
            }),
          ],        
    },
    mode: MODE,
    module:{
        rules:[
          {
            test: /\.(sass|scss|css)$/,
            use: [
                // "style-loader",
                {
                loader: MiniCssExtractPlugin.loader,
                },
                {
                  loader: "css-loader",
                  options: {
                    sourceMap: sourceMapStatus,
                  }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: sourceMapStatus,
                        // Prefer `dart-sass`
                        implementation: require.resolve("sass"),
                    }
                }
              ]
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            type: "asset/inline",
            parser: {
                dataUrlCondition: {
                  // これで100KB以上という設定になる。
                  maxSize: 100 * 1024,
                }
              }
          },
          {
            test: /\.ejs$/,
            use: [
              "html-loader", 
              "ejs-plain-loader"
            ],
          }
       ]
      },
      // プラグインの設定
        plugins: [

            new MiniCssExtractPlugin({
            // 出力先の設定
                filename: './css/[name].css',
            }),


            // html-webpack-pluginの設定
            new HtmlWebpackPlugin({
            // 対象のテンプレートを設定
            template: `${__dirname}/src/ejs/index.ejs`,
            // 書き出し先
            filename: `${__dirname}/dist/index.html`,
            // ビルドしたjsファイルを読み込む場所。デフォルトはhead
            inject: 'head'
            }),
            new HtmlWebpackPlugin({
              // 対象のテンプレートを設定
              template: `${__dirname}/src/ejs/lineup.ejs`,
              // 書き出し先
              filename: `${__dirname}/dist/lineup.html`,
              // ビルドしたjsファイルを読み込む場所。デフォルトはhead
              inject: 'head'
              }),
            // new LazyLoadWebpackPlugin({
            //   // you can use other lazyload library which support the same API
            //   lazyloadLib: 'https://LIB_URL',
            // }),
            new CopyWebpackPlugin({
                patterns: [
                  {
                    from: `${__dirname}/src/img/`,
                    to: `${__dirname}/dist/img/`,
                  }
                ]
              }),

  
    ]
  }



