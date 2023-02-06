import * as path from 'path';
import * as webpack from 'webpack';
import { readFileSync } from 'fs';
import 'webpack-dev-server';

const isDevServer = !!process.argv.find((it) => it.includes('webpack-dev-server'));
const packageJson = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));

const userScriptHeader = `// ==UserScript==
// @name         ${packageJson.name}
// @namespace    http://tampermonkey.net/
// @version      ${packageJson.version}
// @description  ${packageJson.description}
${packageJson.userscript.includes.map((it: string) => `// @include ${it}`).join('\n')}
// ==/UserScript==
`;

const config: webpack.Configuration = {
  mode: 'development',
  entry: isDevServer ? './src/misc/devMode.ts' : './src/misc/prodMode.ts',
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  plugins: [new webpack.BannerPlugin(userScriptHeader)],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    publicPath: 'http://localhost:1234/',
    filename: 'script.user.js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'document',
    chunkLoadingGlobal: packageJson.name,
  },
  devServer: {
    host: 'localhost',
    port: 1234,
    allowedHosts: 'all',
    hot: false,
    liveReload: false,
  },
};

export default config;
