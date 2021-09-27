# Ethos UI

This package holds the design system and the complex components and widgets.

It should grow with all the components needed by the application.

## Components

The available sample components are:

- [ConnectWidget](./src/ConnectWidget/README.md)

## Styling

All the components are styled with [postcss-modules](https://github.com/css-modules/postcss-modules).

Let's take the `Button` component as an example.

The stylesheet is in the `button.modules.scss` SASS file.
The name of all stylesheet files needs to be `COMPONENT.modules.scss`, where `COMPONENT` is the name of the component.
Every stylesheet should have a `.root` selector for the component, for example:

```scss
.root {
  font-size: 15px;
  font-weight: bold;

  &.primary {
    background-color: $color-primary;
  }

  &.secondary {
    background-color: $color-secondary;
  }
}
```

To use this stylesheet, you need to import it and reference it as follows:

```jsx
import classNames from 'classnames'
import style from './button.module.scss'

const Button = ({ text, onClick, variant, className }) => (
  <button className={classNames(style['root'], style[variant], className)}>
    Hello!
  </button>
)
```

To reference a stylesheet class from the component use `style[CLASS]`.
The postcss-modules build will convert it into a class named `'dfo-ds_COMPONENT_CLASS`, as defined in the `rollup.config.js` file.
So, for our button component, the name will be `dfo-ds_button_root`.

The `classNames` function imported by the [classnames](https://www.npmjs.com/package/classnames) module converts the arguments into a string of space-separated classes.
The arguments can be of different types: see the module documentation for more information.

## Storybook

Every component includes the stories for [Storybook](https://storybook.js.org/).

You can build Storybook with:

```shell script
npm run build-storybook
```

You can launch Storybook with:

```shell script
npm run storybook
```

## Build

This package uses [rollup](https://rollupjs.org/guide/en/) to create the bundle.

To build the package, you can use the `lerna` scripts in the root project (`build` and `build-dev`), as stated in the root project documentation.

If you prefer to build only this package, just run:

```shell script
npm run build
```

To build and keep watching for changes:

```shell script
npm run build:dev
```

## Development with `Interfaces-framework`

To use `interfaces-ui` for development (so using a checked-out version instead of the `npm` dependencies) some steps must be followed.

Assuming that we have cloned [Interfaces-framework](https://github.com/EthereansOS/Interfaces-framework) in the same folder where we cloned this repo, we need to:

- `npm install` (only if you don't already have the deps installed)
- `npm link ../Interfaces-framework/node_modules/react`
- `npm build` (or build:dev to develop in watch mode. See below)
- `npm link`

The first `npm link` links the `react` used by `Interfaces-framework` to avoid [this problem](https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react).

Then, enter in `Interface-Framework` and link it to the ui:

- `cd ../Interfaces-framework`
- `npm link @ethereansos/interfaces-ui`

After this, you're using the checked-out version for all the apps or plugins in the `packages` folder.

PS: Remember to execute **just** the linkings every time you install a new dependency in either of the two projects.

### Development in watch mode

To start build the core at each file change, after having followed the above instructions, just run `npm run build:dev` and if you've linked this package with the Interfaces-Framework package, you'll see live changes as soon as you edit the code.
