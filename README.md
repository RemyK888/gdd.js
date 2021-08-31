<h1 align="center">
  <br>
  <a href="https://www.gdd.js.remyk.net/"><img src="https://cdn.discordapp.com/attachments/774598287712845864/882287483587534898/guildedjs.png" alt="gdd.js" width="300"></a>
  <br>
    <strong>Gdd.Js</strong>
  <br>
</h1>

<p align="center">
  <a href="https://badge.fury.io/js/gdd.js">
    <img src="https://badge.fury.io/js/gdd.js.svg"
         alt="Gitter">
  </a>
  <a href="https://www.npmjs.com/package/gdd.js"><img src="https://img.shields.io/npm/dt/gdd.js.svg?maxAge=3600" alt="NPM downloads" /></a>
</p>

<p align="center">
<a href="#-about">About</a> •
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-code-example">Code example</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-links">Links</a> •
  <a href="#-related">Other</a> •
  <a href="#-license">License</a>
</p>

<br>

## 🔎 About

gdd.js allows you to interact with the Guilded.gg API with ease and flexibility.

## 📌 Features
- Easy to use
- Latest Guilded API version and latest additions 
- 100% coverage of Guilded API
- Lightweight
- Very similar to [Foxcord](https://github.com/Foxcord/foxcord)

## 🌠 Installation

**Node.Js v12.0.0 is required at least**

```
$ npm install gdd.js
$ yarn add gdd.js
```

## 🔩 Code example

```js
const { Client } = require('gdd.js');

const client = new Client();

client.on('chatMessageCreated', async (message) => {
    if(message.content === 'ping') {
        return message.channel.send(`My ping is ${client.ping}ms`);
    }
});

client.connect('Authentification token');
```

## 🔧 Contributing

Before creating an issue, be sure that it has not already been deferred and try to come up with a simple approach to the issue so that deferral is accessible to all.

In order to submit a PR, make sure you have read the [contribution guide](https://github.com/RemyK888/gdd.js/blob/main/.github/CONTRIBUTING.md)

## 🔗 Links
- [Github](https://github.com/RemyK888/gdd.js)
- [NPM](https://www.npmjs.com/package/gdd.js)
- [Documentation](https://www.gddjs.remyk.net/)
- [Guilded community](https://www.guilded.gg/i/LExlQr3E)

## 🚀 Other
*Note: Make a request to Guilded-API to have access to the bot creation and their documentation*

This package is not affiliated with [Guilded.gg](https://guilded.gg)

[![Server banner](https://cdn.discordapp.com/attachments/774598287712845864/882296134813515796/2021-08-31_18h09_47.png)](https://www.guilded.gg/i/LExlQr3E)

You can join the official gdd.js community using [this invite](https://www.guilded.gg/i/LExlQr3E)

## 🧪 License
Apache-2.0