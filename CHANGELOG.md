# Changelog

Also see the **[release page]( https://github.com/dominique-mueller/angular-notifier/releases )**.

<br>

## [2.0.0](https://github.com/dominique-mueller/angular-notifier/releases/tag/2.0.0) / 2017-05-11

### Bug Fixes

* **notifier-config:** Fix notifier config injection error, refactor notifier module ([#22](https://github.com/dominique-mueller/angular-notifier/issues/22)) ([67f09f5](https://github.com/dominique-mueller/angular-notifier/commit/67f09f5)), closes [#17](https://github.com/dominique-mueller/angular-notifier/issues/17)

### Chores

* **build:** Upgrade build process ([#21](https://github.com/dominique-mueller/angular-notifier/issues/21)) ([37ea7c9](https://github.com/dominique-mueller/angular-notifier/commit/37ea7c9))
* **config:** Enable TSC strict mode, add editorconfig file ([#24](https://github.com/dominique-mueller/angular-notifier/issues/24)) ([596f18a](https://github.com/dominique-mueller/angular-notifier/commit/596f18a))
* **release:** Update automatic release process ([#20](https://github.com/dominique-mueller/angular-notifier/issues/20)) ([e494fe3](https://github.com/dominique-mueller/angular-notifier/commit/e494fe3))
* **travis:** Fix post automatic-release deploy ([#29](https://github.com/dominique-mueller/angular-notifier/issues/29)) ([a286b9c](https://github.com/dominique-mueller/angular-notifier/commit/a286b9c))
* **tslint:** Add tslint language service & update dependencies ([#23](https://github.com/dominique-mueller/angular-notifier/issues/23)) ([47c0e57](https://github.com/dominique-mueller/angular-notifier/commit/47c0e57))

### Documentation

* **preview:** Update animated GIF preview showing the new colors ([#18](https://github.com/dominique-mueller/angular-notifier/issues/18)) ([571b098](https://github.com/dominique-mueller/angular-notifier/commit/571b098))
* **README, MIGRATION:** Update README, add MIGRATION-GUIDE ([#28](https://github.com/dominique-mueller/angular-notifier/issues/28)) ([f2c7781](https://github.com/dominique-mueller/angular-notifier/commit/f2c7781))

### Features

* **angular:** Upgrade to Angular 4 and its new APIs ([#19](https://github.com/dominique-mueller/angular-notifier/issues/19)) ([0a0be99](https://github.com/dominique-mueller/angular-notifier/commit/0a0be99))

### Refactoring

* **animations:** Refactor usage of Web Animations API, add typings ([#27](https://github.com/dominique-mueller/angular-notifier/issues/27)) ([d34f9f3](https://github.com/dominique-mueller/angular-notifier/commit/d34f9f3))
* **naming:** Refactor namings to no longer use the "x-" prefix ([#26](https://github.com/dominique-mueller/angular-notifier/issues/26)) ([d2158bd](https://github.com/dominique-mueller/angular-notifier/commit/d2158bd))


### BREAKING CHANGES

* **naming:** Compontent selectors and class name no longer have the "x-" prefix (see MIGRATION GUIDE).
* **notifier-config:** The forRoot() method of the NotifierModule is now called withConfig() (see MIGRATION GUIDE).
* **build:** Change paths & names of build output files (see MIGRATION GUIDE).
* **angular:** The upgrade to Angular 4 and its APIs breaks compatibility with all Angular 2 based applications.

<br>

## [1.0.6](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.6) / 2017-04-04

### Styles

* **type-colors:** Use bootstrap colors for notification types ([18eb1d2](https://github.com/dominique-mueller/angular-notifier/commit/18eb1d2)), closes [#11](https://github.com/dominique-mueller/angular-notifier/issues/11)

<br>

## [1.0.5](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.5) / 2017-04-03

### Bug Fixes

* **notification-container:** Fix wrong ngFor trackby implementation ([f086ae4](https://github.com/dominique-mueller/angular-notifier/commit/f086ae4)), closes [#12](https://github.com/dominique-mueller/angular-notifier/issues/12)

### Chores

* **dependencies:** Update NPM dependencies ([af51222](https://github.com/dominique-mueller/angular-notifier/commit/af51222))

<br>

## [1.0.4](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.4) / 2017-03-21

### Bug Fixes

* **aot:** Fixed Angular AoT compilation issue ([e5ed9bb](https://github.com/dominique-mueller/angular-notifier/commit/e5ed9bb)), closes [#7](https://github.com/dominique-mueller/angular-notifier/issues/7)

<br>

## [1.0.3](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.3) / 2017-02-05

### Bug Fixes

* **aot:** Fixed error occuring when using NotifierModule.forRoot with ([a501f40](https://github.com/dominique-mueller/angular-notifier/commit/a501f40)), closes [#5](https://github.com/dominique-mueller/angular-notifier/issues/5)

### Chores

* **dependencies:** Updated dev dependencies, fixed SystemJS config ([85051b9](https://github.com/dominique-mueller/angular-notifier/commit/85051b9))
* **tslint:** Updated linting rules, fixed linting issues ([53091cf](https://github.com/dominique-mueller/angular-notifier/commit/53091cf))

<br>

## [1.0.2](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.2) / 2016-12-21

### Bug Fixes

* **config:** Fixed broken configuration merge ([9793773](https://github.com/dominique-mueller/angular-notifier/commit/9793773))

### Chores

* **gulp:** Added test coverage generator ([6c142c8](https://github.com/dominique-mueller/angular-notifier/commit/6c142c8))
* **gulp:** Fixed coveralls, fixed wrong dependencies ([ebfb393](https://github.com/dominique-mueller/angular-notifier/commit/ebfb393))
* **test:** Added codecov to Travis config, added badge to README file^ ([923488a](https://github.com/dominique-mueller/angular-notifier/commit/923488a))

### Tests

* **library:** Added unit tests for the whole source code ([3624eef](https://github.com/dominique-mueller/angular-notifier/commit/3624eef))

<br>

## [1.0.1](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.1) / 2016-12-05

### Bug Fixes

* **dependencies:** Fixed wrong type dependencies in definition files ([#2](https://github.com/dominique-mueller/angular-notifier/issues/2)) ([a986e66](https://github.com/dominique-mueller/angular-notifier/commit/a986e66)), closes [#1](https://github.com/dominique-mueller/angular-notifier/issues/1)
* **gulp:** Fixed broken release task ([#3](https://github.com/dominique-mueller/angular-notifier/issues/3)) ([cdee2d8](https://github.com/dominique-mueller/angular-notifier/commit/cdee2d8))

### Chores

* **gulp:** Fixed git tag for release ([f1fae3c](https://github.com/dominique-mueller/angular-notifier/commit/f1fae3c))

<br>

## [1.0.0](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.0) / 2016-12-04

### Bug Fixes

* **gulp:** Fixed build process to make it work on Travis CI again ([0e21209](https://github.com/dominique-mueller/angular-notifier/commit/0e21209))

### Chores

* **gulp:** Added build workflow and CI configuration, prepared demo ([e42dda9](https://github.com/dominique-mueller/angular-notifier/commit/e42dda9))
* **gulp:** Added bundles and sourcemaps, added AoT support, refactored build process ([0c89039](https://github.com/dominique-mueller/angular-notifier/commit/0c89039))
* **gulp:** Optimized overall Gulp watcher performance ([9ca8342](https://github.com/dominique-mueller/angular-notifier/commit/9ca8342))
* **release:** Added fake breaking change ([8fef1f8](https://github.com/dominique-mueller/angular-notifier/commit/8fef1f8))

### Documentation

* **readme:** Added docs with image, updated demo ([1ee2ca2](https://github.com/dominique-mueller/angular-notifier/commit/1ee2ca2))

### Features

* **config:** Added new options, docs improbement, refactoring ([745e47e](https://github.com/dominique-mueller/angular-notifier/commit/745e47e))
* **library:** Added animations ([bdec4ab](https://github.com/dominique-mueller/angular-notifier/commit/bdec4ab))
* **library:** Added minimal feature implementation ([36aa4e3](https://github.com/dominique-mueller/angular-notifier/commit/36aa4e3))
* **library:** Extended API ([4fcab3b](https://github.com/dominique-mueller/angular-notifier/commit/4fcab3b))


### BREAKING CHANGES

* **release:** First stable release

<br>

---

<sup>*Changelog generated automatically by [automatic-release](https://github.com/dominique-mueller/automatic-release).*</sup>
