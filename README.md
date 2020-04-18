<div align="center">
  <h1>🔥 kuromoji-hotwords-js 🔥</h1>
</div>

# 概要

Node.jsとkuromoji.jsで形態素解析し、ホットワードを編みだすサンプル。

# セットアップ

## node_modules のインストール
```bash
yarn
```
## posts.jsの準備

解析したい文字列を `posts.js` として作成。

```js
module.exports = `
テキスト
テキスト
テキスト
.
.
.
`
```

# 実行

```zsh
yarn start
```

ファイルに書き出す場合
```zsh
yarn export
```
