# Migration Guide

Strictly following the principle of semantic versioning, breaking changes only occur between major versions. This Migration Guide gives
developers a more detailed insight into the changes introduced with new major releases, in particular the breaking changes and their
consequences, while also suggesting a migration strategy.

Also see then **[CHANGELOG](./CHANGELOG.md)** and **[GitHub releases](https://github.com/dominique-mueller/angular-notifier/releases)**.

<br>

## Migration from `1.x` to `2.x`

> The amount of breaking changes from `1.x` to `2.x` is rather small, a migration shouldn't take longer than 5 minutes.

#### Compatible with Angular 4+ only

The library is now compatible with Angular 4+, using the all new & improved Angular APIs (such as the new `Renderer2`). Consequently, this
also means that the compatibility with Angualr 2 breaks. If you still want to stick to Angular 2, you can continue using the latest `1.x`
release; however, all new development (inlcuding bug fixes and features) will happen in the new `2.x` releases.

#### Renaming of component selectors and classes

For consistency reasons, all component selectors and CSS class names got renamed to no longer use the `x-` prefix. To migrate your
application, simply rename the `x-notifier-container` tag to `notifier-container`. Also, if you did write custom themes or overwrote the
default styling, you should remove the `x-` prefix from all CSS class names. The SASS variables, however, are still named the same.

#### Renaming of module `forRoot()` method

The `NotifierModule.forRoot()` method was used for passing custom options to the notifier. While the functionality stays the exact same, the
method is now called `NotifierModule.withConfig()` instead. This seemed to be the more semantic, meaningful name here.

#### Names & paths of published files

With Angular 4+, a new recommendation regarding the publishment of Angular libraries has been defined. This includes a different folder
structure, and also different output files. Therefore, the published files now include:

- `angular-notifier.js` as the "rolled up" ES6 FESM (Flat ECMAScript Module) bundle
- `angular-notifier.es5.js` as the "rolled up" ES5 FESM (Flat ECMAScript Module) bundle, however using ES6 import
- `angular-notifier.umd.js` as the ES5 UMD (Universal Module Definition) bundle, here for compatibility reasons
- Both the original `styles.scss` and compiled `styles.css` file exist, yet are available at the root path; sub-files are now located in the
  "styles" folder
- Also, the places of all the sourcemaps and TypeScript definition files changed (which, however, shouldn't affect anyone)

*The only change affecting developers is probably the path change of the SASS / CSS files. When using SystemJS, a path change of JavaScript
files might also be necessary. Most modern frontend build tools (such as Webpack or Rollup) will recognize and understand this library and
its published files automatically.*

#### Web Animations API polyfill

The implementation of animations has been changed slightly, so that now the *default* Web Animations API polyfill should be sufficient to
make this library work in older browsers. This is also the polyfill defined within Angular CLI based projects in the `polyfills.ts` file by
default. While it for sure will save us a few bytes over the network line, it also prevents confusion amongst developers (such as
**[#6](https://github.com/dominique-mueller/angular-notifier/issues/6)**,
**[#10](https://github.com/dominique-mueller/angular-notifier/issues/10)**). In particular:

``` typescript
// With 1.x
import 'web-animations-js/web-animations-next.min.js';

// Now with 2.x
import 'web-animations-js';
// Same as: import 'web-animations-js/web-animations.min.js';
```
