<h2 align="center">
  <a href="https://github.com/devboldly/react-use-window-localstorage">React Use Window.localStorage</a>
</h2>
<h3 align="center">
  React hooks for accessing the localStorage <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API">Web Storage API</a>.
</h3>
<p align="center">
  <a href="https://badge.fury.io/js/react-use-window-localstorage">
    <img src="https://badge.fury.io/js/react-use-window-localstorage.svg" alt="npm Version"/>
  </a>
  <a href="https://github.com/devboldly/react-use-window-localstorage/actions?query=workflow%3ATests">
    <img src="https://github.com/devboldly/react-use-window-localstorage/workflows/Tests/badge.svg" alt="Tests Status"/>
  </a>
  <a href="https://github.com/devboldly/react-use-window-localstorage/actions?query=workflow%3ADeploy">
    <img src="https://github.com/devboldly/react-use-window-localstorage/workflows/Deploy/badge.svg" alt="Deploy Status"/>
  </a>
</p>

## Documentation

Read the **[official documentation](https://devboldly.github.io/react-use-window-localstorage/)**.

[![Demo](./src/__docz__/images/demo.gif "Demo")](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageString#example)

👁️ **[Live Demo](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageString#example)**

*For sessionStorage, see [react-use-window-sessionstorage](https://devboldly.github.io/react-use-window-sessionstorage).*

## Overview

A set of hooks to easily store and retrieve data from [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

Encoding is handled for common data types, including [booleans](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageBoolean), [numbers](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageNumber), [strings](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageString), and [objects](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageObject), or you can [encode data yourself](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageItem) if you'd like.

Changes to localStorage are synchronized across all hooks automatically.

> **What is localStorage?** The `localStorage` property allows you to store `{key: value}` string data that is saved across browser sessions. Data stored in `localStorage` has no expiration time.

> For sessionStorage, check out the companion project [react-use-window-sessionstorage](https://devboldly.github.io/react-use-window-sessionstorage).

### Features include:

- **💪 Easily add `localStorage` support**
  - Store data across browser sessions with ease.
- **🔢 Support for primitives and objects**
  - Store and retrieve strings, booleans, numbers, and objects effortlessly.
- **💁 Default values**
  - Optional support for defaults is baked right in.
- **🔄 Automatic synchronization**
  - Changes are synchronized across hooks automatically.
- **👾 Customizable**
  - Want to store something unusual? Just provide your own encoder.
- **⛔ Storage availability detection**
  - Detects if `localStorage` is available for use and lets you know otherwise.
- **🧼 Clearing support**
  - Clear all localStorage values and reset hooks to defaults with one simple call.

## Installation

```
npm i react-use-window-localstorage
```

## Quick Start

### Storing Strings

Use the [useLocalStorageString](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageString) hook:

```jsx
import { useLocalStorageString } from 'react-use-window-localstorage';
```

In your function component:

```jsx
const defaultValue = 'cyan';
const [value, setValue] = useLocalStorageString('favColor', defaultValue);
```

### Storing Objects

Use the [useLocalStorageObject](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageObject) hook:

```jsx
import { useLocalStorageObject } from 'react-use-window-localstorage';
```

In your function component:

```jsx
const defaultValue = { a: 'hello', b: 123 };
const [value, setValue] = useLocalStorageObject('myObj', defaultValue);
```

Note that your objects must be compatible with [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). Use [useLocalStorageItem](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageItem) otherwise.

### Storing Booleans

Use the [useLocalStorageBoolean](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageBoolean) hook:

```jsx
import { useLocalStorageBoolean } from 'react-use-window-localstorage';
```

In your function component:

```jsx
const defaultValue = true;
const [value, setValue] = useLocalStorageBoolean('swordEquipped', defaultValue);
```

### Storing Numbers

Use the [useLocalStorageNumber](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageNumber) hook:

```jsx
import { useLocalStorageNumber } from 'react-use-window-localstorage';
```

In your function component:

```jsx
const defaultValue = 3.14159;
const [value, setValue] = useLocalStorageNumber('importantNumber', defaultValue);
```

> Note: All value defaults are optional. Hooks will return `null` if none is provided.

### Storing Everything Else

If you'd like to store something other than the data types above, define your own encoding using the [useLocalStorageItem](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageItem) hook.

Here's a starting point:

```jsx
import { useLocalStorageItem } from 'react-use-window-localstorage';
```

In your function component:

```jsx
const defaultValue = 'something custom';
const encode = value => JSON.stringify(value);
const decode = itemString => JSON.parse(itemString);
const [value, setValue] = useLocalStorageItem('name', defaultValue, encode, decode);
```

Provide `null` for no default value.

### Additional Features

All hooks provide additional features in their return arrays, should you be interested:

```jsx
const [value, setValue, loading, available, reset] = useLocalStorageString('favColor', 'cyan');
```

- A `loading` value of `true` indicates that the value is being loaded from localStorage.
- An `available` value of `true` indicates that `localStorage` is supported and available for use. 
- The `reset()` function sets the value back to the provided default, or `null` if none was given.

### Clearing `localStorage`

```jsx
import { useClearLocalStorage } from 'react-use-window-localstorage';
```

```jsx
const clearLocalStorage = useClearLocalStorage();
```

Call `clearLocalStorage()` to clear all values in localStorage using [localStorage.clear()](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 
and reset all hooks to their defaults (or `null` if none provided).

## TypeScript

Type definitions have been included for [TypeScript](https://www.typescriptlang.org/) support.

## Logo Attribution

Logo graphics by [Twemoji](https://github.com/twitter/twemoji), licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/). Favicon by [favicon.io](https://favicon.io/emoji-favicons/).

## Contributing

Open source software is awesome and so are you. 😎

Feel free to submit a pull request for bugs or additions, and make sure to update tests as appropriate. If you find a mistake in the docs, send a PR! Even the smallest changes help.

For major changes, open an issue first to discuss what you'd like to change.

See [Kindling](https://tinyurl.com/kindlingscripts) for npm script documentation.

## ⭐ Found It Helpful? [Star It!](https://github.com/devboldly/react-use-window-localstorage/stargazers)

If you found this project helpful, let the community know by giving it a [star](https://github.com/devboldly/react-use-window-localstorage/stargazers): [👉⭐](https://github.com/devboldly/react-use-window-localstorage/stargazers)

## MIT License

```
Copyright © 2020 DevBoldly https://devboldly.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```