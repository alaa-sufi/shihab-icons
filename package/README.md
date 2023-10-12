<h1 align="center">shihab-icons for React and figma</h1>

<p align="center">
  230 icons in 2 different styles,24px grid-based
<p>

<p align="center">
  <a href="https://shihab-icons.vercel.app/"><strong>Browse icons at site</strong></a>
</p>
<br>
<br>

> ©️ shihab-icons [github](https://github.com/alaa-sufi/shihab-icons) and
> [official website](https://shihab-icons.vercel.app/) (other format and platform available)

## Installation

### React

```bash
npm i react-shihab-icons
# or
yarn add react-shihab-icons
```

## Usage

```jsx
import React from 'react';
import { Home1Icon } from 'react-shihab-icons';

const Example = () => {
  // then use it as a normal React Component
  return <Home1Icon />;
};
````

You can configure Icons with inline props:

```jsx
<Home1Icon color="#eee" variant="Line" size={54} />
```

## Props

| Prop      | Type              | Default        | Note                   |
| --------- | ----------------- | -------------- | ---------------------- |
| `color`   | `string`          | `currentColor` | css color              |
| `size`    | `number` `string` | 24px           | size={24} or size="24" |
| `variant` | `Line` `TwoTone`  | `Line`         | icons styles           |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

[MIT](./LICENSE)
