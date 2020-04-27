<h2 align="center">
  <a href="https://github.com/devboldly/react-use-local-storage">React Local Storage Hook</a>
</h2>
<h3 align="center">
  React hooks for accessing the localStorage Web Storage API.
</h3>
<p align="center">
  <a href="https://badge.fury.io/js/%40devboldly%2Freact-use-local-storage">
    <img src="https://badge.fury.io/js/%40devboldly%2Freact-use-local-storage.svg" alt="npm Version"/>
  </a>
  <a href="https://github.com/devboldly/react-use-local-storage/actions?query=workflow%3ATests">
    <img src="https://github.com/devboldly/react-use-local-storage/workflows/Tests/badge.svg" alt="Tests Status"/>
  </a>
  <a href="https://github.com/devboldly/react-use-local-storage/actions?query=workflow%3ADeploy">
    <img src="https://github.com/devboldly/react-use-local-storage/workflows/Deploy/badge.svg" alt="Deploy Status"/>
  </a>
</p>

## Documentation

Read the **[official documentation](https://devboldly.github.io/react-use-local-storage/)**.

👁️ **[Live Demo](https://devboldly.github.io/react-use-local-storage/useLocalStorageString#example)**

## Overview

A set of hooks to easily store and retrieve data from [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

Encoding is handled for common data types, including [booleans](https://devboldly.github.io/react-use-local-storage/useLocalStorageBoolean), [numbers](https://devboldly.github.io/react-use-local-storage/useLocalStorageNumber), [strings](https://devboldly.github.io/react-use-local-storage/useLocalStorageString), and [objects](https://devboldly.github.io/react-use-local-storage/useLocalStorageObject), or you can [encode data yourself](https://devboldly.github.io/react-use-local-storage/useLocalStorageItem) if you'd like.

Changes to localStorage are synchronized across all hooks automatically.

> **What is localStorage?** The `localStorage` property allows you to store `{key: value}` string data that is saved across browser sessions. Data stored in `localStorage` has no expiration time.

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
- **💥 Contains Web Storage API side-effects**
  - Follows React standard practice of containing [side-effects](https://reactjs.org/docs/hooks-effect.html).

## Installation

```
npm i @devboldly/react-use-local-storage
```

## Quick Start

### Storing Strings

Use the [useLocalStorageString](https://devboldly.github.io/react-use-local-storage/useLocalStorageString) hook:

```jsx
import { useLocalStorageString } from 'react-use-local-storage';
```

In your function component:

```jsx
const defaultValue = 'cyan';
const [value, setValue] = useLocalStorageString('favColor', defaultValue);
```

### Storing Objects

Use the [useLocalStorageObject](https://devboldly.github.io/react-use-local-storage/useLocalStorageObject) hook:

```jsx
import { useLocalStorageObject } from 'react-use-local-storage';
```

In your function component:

```jsx
const defaultValue = { a: 'hello', b: 123 };
const [value, setValue] = useLocalStorageObject('myObj', defaultValue);
```

Note that your objects must be compatible with [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). Use [useLocalStorageItem](https://devboldly.github.io/react-use-local-storage/useLocalStorageItem) otherwise.

### Storing Booleans

Use the [useLocalStorageBoolean](https://devboldly.github.io/react-use-local-storage/useLocalStorageBoolean) hook:

```jsx
import { useLocalStorageBoolean } from 'react-use-local-storage';
```

In your function component:

```jsx
const defaultValue = true;
const [value, setValue] = useLocalStorageBoolean('swordEquipped', defaultValue);
```

### Storing Numbers

Use the [useLocalStorageNumber](https://devboldly.github.io/react-use-local-storage/useLocalStorageNumber) hook:

```jsx
import { useLocalStorageNumber } from 'react-use-local-storage';
```

In your function component:

```jsx
const defaultValue = 3.14159;
const [value, setValue] = useLocalStorageNumber('importantNumber', defaultValue);
```

### Storing Everything Else

If you'd like to store something other than the data types above, define your own encoding using the [useLocalStorageItem](https://devboldly.github.io/react-use-local-storage/useLocalStorageItem) hook.

Here's a starting point:

```jsx
import { useLocalStorageItem } from 'react-use-local-storage';
```

In your function component:

```jsx
const defaultValue = 'something custom';
const encode = value => JSON.stringify(value);
const decode = itemString => JSON.parse(itemString);
const [value, setValue] = useLocalStorageItem('name', defaultValue, encode, decode);
```

### Additional Features

All hooks provide additional features in their return arrays, should you be interested:

```jsx
const [value, setValue, loading, reset, restore] = useLocalStorageString('favColor', 'cyan');
```

- A `loading` value of `true` indicates that the value is being loaded from localStorage.
- The `reset()` function sets the value back to the provided default, or `null` if none was given.
- The `restore()` function retrieves the latest value from localStorage. Use this if the localStorage value changes outside of this hook and you need to restore it to the latest.

## TypeScript

Type definitions have been included for [TypeScript](https://www.typescriptlang.org/) support.

## Logo Attribution

Logo graphics by [Twemoji](https://github.com/twitter/twemoji), licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/). Favicon by [favicon.io](https://favicon.io/emoji-favicons/).

## Contributing

Feel free to submit a pull request for bugs or additions, and make sure to update tests as appropriate. If you find a mistake in the docs, send a PR! Even the smallest changes help.

For major changes, open an issue first to discuss what you'd like to change.

See the [library template](https://tinyurl.com/ya3k258d) for npm script documentation.

## ⭐ Found It Helpful? [Star It!](https://github.com/devboldly/react-use-local-storage/stargazers)

If you found this project helpful, let the community know by giving it a [star](https://github.com/devboldly/react-use-local-storage/stargazers): [👉⭐](https://github.com/devboldly/react-use-local-storage/stargazers)

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