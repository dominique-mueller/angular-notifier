# Changelog

Also see the **[release page](https://github.com/dominique-mueller/angular-notifier.git/releases)**.

<br>

## [6.0.1](https://github.com/dominique-mueller/angular-notifier/releases/tag/6.0.1) (2019-10-20)

### Bug Fixes

* **notifier-container:** Setup notifier-container as early as possible ([#144](https://github.com/dominique-mueller/angular-notifier.git/issues/144)) ([17b5953](https://github.com/dominique-mueller/angular-notifier/commit/17b5953)), closes [#119](https://github.com/dominique-mueller/angular-notifier/issues/119)

### Documentation

* **README:** Add version information to README ([#143](https://github.com/dominique-mueller/angular-notifier.git/issues/143)) ([f838719](https://github.com/dominique-mueller/angular-notifier/commit/f838719))

<br>

## [6.0.0](https://github.com/dominique-mueller/angular-notifier/releases/tag/6.0.0) (2019-10-19)

### Features

* Upgrade to Angular 8 ([#139](https://github.com/dominique-mueller/angular-notifier.git/issues/139)) ([b355287](https://github.com/dominique-mueller/angular-notifier/commit/b355287))

### BREAKING CHANGES

* The upgrade to Angular 8 breaks compatibility with Angular 7 (and previous versions).

<br>

## [5.0.0](https://github.com/dominique-mueller/angular-notifier/releases/tag/5.0.0) (2019-10-19)

### Features

* Upgrade to Angular 7 ([#134](https://github.com/dominique-mueller/angular-notifier.git/issues/134)) ([8f13440](https://github.com/dominique-mueller/angular-notifier/commit/8f13440))

### BREAKING CHANGES

* The upgrade to Angular 7 breaks compatibility with Angular 6 (and previous versions).

<br>

## [4.1.2](https://github.com/dominique-mueller/angular-notifier/releases/tag/4.1.2) (2019-10-18)

### Bug Fixes

* **notifier:** Fix circular dependency issues of injection tokens ([#124](https://github.com/dominique-mueller/angular-notifier.git/issues/124)) ([139d43c](https://github.com/dominique-mueller/angular-notifier/commit/139d43c))

<br>

## [4.1.1](https://github.com/dominique-mueller/angular-notifier/releases/tag/4.1.1) (2018-08-09)

### Bug Fixes

* **package:** Fix artifact ([#99](https://github.com/dominique-mueller/angular-notifier.git/issues/99)) ([7ce901b](https://github.com/dominique-mueller/angular-notifier/commit/7ce901b))

<br>

## [4.1.0](https://github.com/dominique-mueller/angular-notifier/releases/tag/4.1.0) (2018-08-08)

### Features

* **notification:** Allow templateRef as notification content ([#95](https://github.com/dominique-mueller/angular-notifier.git/issues/95)) ([d705180](https://github.com/dominique-mueller/angular-notifier/commit/d705180))

### Documentation

* **README:** Update demo to Stackblitz example ([#93](https://github.com/dominique-mueller/angular-notifier.git/issues/93)) ([1e26507](https://github.com/dominique-mueller/angular-notifier/commit/1e26507))

<br>

## [4.0.0](https://github.com/dominique-mueller/angular-notifier/releases/tag/4.0.0) (2018-07-04)

### Features

* Upgrade to Angular 6, fix breaking changes ([#83](https://github.com/dominique-mueller/angular-notifier.git/issues/83)) ([aae723d](https://github.com/dominique-mueller/angular-notifier/commit/aae723d)), closes [#82](https://github.com/dominique-mueller/angular-notifier/issues/82)

### BREAKING CHANGES

* The upgrade to Angular 6 breaks compatibility with Angular 5.

<br>

## [3.0.0](https://github.com/dominique-mueller/angular-notifier/releases/tag/3.0.0) (2018-01-18)

### Features

* **angular:** Upgrade to Angular 5 ([#38](https://github.com/dominique-mueller/angular-notifier.git/issues/38)) ([355785e](https://github.com/dominique-mueller/angular-notifier/commit/355785e))

### Documentation

* **README:** Add Angular compatibility details, cleanup ([#40](https://github.com/dominique-mueller/angular-notifier.git/issues/40)) ([9286920](https://github.com/dominique-mueller/angular-notifier/commit/9286920))
* **README:** Fix wrong notifier container selector ([#32](https://github.com/dominique-mueller/angular-notifier.git/issues/32)) ([7b82d35](https://github.com/dominique-mueller/angular-notifier/commit/7b82d35)), closes [#30](https://github.com/dominique-mueller/angular-notifier/issues/30)

### BREAKING CHANGES

* **angular:** The upgrade to Angular 5 breaks compatibility with Angular 4.

<br>

## [2.0.0](https://github.com/dominique-mueller/angular-notifier/releases/tag/2.0.0) (2017-05-11)

### Features

* **angular:** Upgrade to Angular 4 and its new APIs ([#19](https://github.com/dominique-mueller/angular-notifier.git/issues/19)) ([0a0be99](https://github.com/dominique-mueller/angular-notifier/commit/0a0be99))

### Bug Fixes

* **notifier-config:** Fix notifier config injection error, refactor notifier module ([#22](https://github.com/dominique-mueller/angular-notifier.git/issues/22)) ([67f09f5](https://github.com/dominique-mueller/angular-notifier/commit/67f09f5)), closes [#17](https://github.com/dominique-mueller/angular-notifier/issues/17)

### Documentation

* **preview:** Update animated GIF preview showing the new colors ([#18](https://github.com/dominique-mueller/angular-notifier.git/issues/18)) ([571b098](https://github.com/dominique-mueller/angular-notifier/commit/571b098))
* **README, MIGRATION:** Update README, add MIGRATION-GUIDE ([#28](https://github.com/dominique-mueller/angular-notifier.git/issues/28)) ([f2c7781](https://github.com/dominique-mueller/angular-notifier/commit/f2c7781))

### Refactoring

* **animations:** Refactor usage of Web Animations API, add typings ([#27](https://github.com/dominique-mueller/angular-notifier.git/issues/27)) ([d34f9f3](https://github.com/dominique-mueller/angular-notifier/commit/d34f9f3)), closes [#6](https://github.com/dominique-mueller/angular-notifier/issues/6) [#10](https://github.com/dominique-mueller/angular-notifier/issues/10)
* **naming:** Refactor namings to no longer use the "x-" prefix ([#26](https://github.com/dominique-mueller/angular-notifier.git/issues/26)) ([d2158bd](https://github.com/dominique-mueller/angular-notifier/commit/d2158bd))

### BREAKING CHANGES

* **naming:** Compontent selectors and class name no longer have the "x-" prefix (see MIGRATION GUIDE).
* **notifier-config:** The forRoot() method of the NotifierModule is now called withConfig() (see MIGRATION GUIDE).
* **angular:** The upgrade to Angular 4 and its APIs breaks compatibility with all Angular 2 based applications.

<br>

## [1.0.6](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.6) (2017-04-04)

### Styles

* **type-colors:** Use bootstrap colors for notification types ([18eb1d2](https://github.com/dominique-mueller/angular-notifier/commit/18eb1d2)), closes [#11](https://github.com/dominique-mueller/angular-notifier/issues/11)

<br>

## [1.0.5](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.5) (2017-04-03)

### Bug Fixes

* **notification-container:** Fix wrong ngFor trackby implementation ([f086ae4](https://github.com/dominique-mueller/angular-notifier/commit/f086ae4)), closes [#12](https://github.com/dominique-mueller/angular-notifier/issues/12)

<br>

## [1.0.4](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.4) (2017-03-21)

### Bug Fixes

* **aot:** Fixed Angular AoT compilation issue ([e5ed9bb](https://github.com/dominique-mueller/angular-notifier/commit/e5ed9bb)), closes [#7](https://github.com/dominique-mueller/angular-notifier/issues/7)

<br>

## [1.0.3](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.3) (2017-02-05)

### Bug Fixes

* **aot:** Fixed error occuring when using NotifierModule.forRoot with ([a501f40](https://github.com/dominique-mueller/angular-notifier/commit/a501f40)), closes [#5](https://github.com/dominique-mueller/angular-notifier/issues/5)

<br>

## [1.0.2](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.2) (2016-12-21)

### Bug Fixes

* **config:** Fixed broken configuration merge ([9793773](https://github.com/dominique-mueller/angular-notifier/commit/9793773))

### Tests

* **library:** Added unit tests for the whole source code ([3624eef](https://github.com/dominique-mueller/angular-notifier/commit/3624eef))

<br>

## [1.0.1](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.1) (2016-12-05)

### Bug Fixes

* **dependencies:** Fixed wrong type dependencies in definition files ([#2](https://github.com/dominique-mueller/angular-notifier.git/issues/2)) ([a986e66](https://github.com/dominique-mueller/angular-notifier/commit/a986e66)), closes [#1](https://github.com/dominique-mueller/angular-notifier/issues/1)
* **gulp:** Fixed broken release task ([#3](https://github.com/dominique-mueller/angular-notifier.git/issues/3)) ([cdee2d8](https://github.com/dominique-mueller/angular-notifier/commit/cdee2d8))

<br>

## [1.0.0](https://github.com/dominique-mueller/angular-notifier/releases/tag/1.0.0) (2016-12-04)

### Features

* **config:** Added new options, docs improbement, refactoring ([745e47e](https://github.com/dominique-mueller/angular-notifier/commit/745e47e))
* **library:** Added animations ([bdec4ab](https://github.com/dominique-mueller/angular-notifier/commit/bdec4ab))
* **library:** Added minimal feature implementation ([36aa4e3](https://github.com/dominique-mueller/angular-notifier/commit/36aa4e3))
* **library:** Extended API ([4fcab3b](https://github.com/dominique-mueller/angular-notifier/commit/4fcab3b))

### Bug Fixes

* **gulp:** Fixed build process to make it work on Travis CI again ([0e21209](https://github.com/dominique-mueller/angular-notifier/commit/0e21209))

### Documentation

* **readme:** Added docs with image, updated demo ([1ee2ca2](https://github.com/dominique-mueller/angular-notifier/commit/1ee2ca2))

<br>

---

<sup>*Changelog generated automatically by [automatic-release](https://github.com/dominique-mueller/automatic-release).*</sup>
