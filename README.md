[![npm version](https://img.shields.io/npm/v/angular-notifier.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/angular-notifier)
[![dependency status](https://img.shields.io/david/dominique-mueller/angular-notifier.svg?maxAge=2592000&style=flat-square)](https://david-dm.org/dominique-mueller/angular-notifier)
[![dev dependency status](https://img.shields.io/david/dev/dominique-mueller/angular-notifier.svg?maxAge=2592000&style=flat-square)](https://david-dm.org/dominique-mueller/angular-notifier?type=dev)
[![peer dependency status](https://img.shields.io/david/peer/dominique-mueller/angular-notifier.svg?maxAge=2592000&style=flat-square)](https://david-dm.org/dominique-mueller/angular-notifier?type=peer)
[![travis ci build status](https://img.shields.io/travis/dominique-mueller/angular-notifier/master.svg?maxAge=2592000&style=flat-square)](https://travis-ci.org/dominique-mueller/angular-notifier)
[![license](https://img.shields.io/npm/l/angular-notifier.svg?maxAge=2592000&style=flat-square)](https://github.com/dominique-mueller/angular-notifier/LICENSE)

# angular-notifier

A well designed, fully animated, highly customizable, and easy-to-use notification library for your Angular 2+ application.

<br>

## Demo

You can play around with this library with **[this Plunker right here](https://plnkr.co/edit/b3xiPr?p=preview)**.

![Angular Notifier Animated Preview GIF](/docs/angular-notifier-preview.gif?raw=true)

<br>

## Table of Contents

* **[How to install](#how-to-install)**<br>Download via npm, configuration for SystemJS, bundles, polyfills.
* **[How to setup](#how-to-setup)**<br>Use library in Angular applications, include CSS / SASS styles.
* **[How to use](#how-to-use)**<br>Inject Notifier Service, showing notifications, hiding notifications.
* **[How to configure](#how-to-configure)**<br>Customize how notifications look, behave, and get animated.
* **[What's next?](#whats-next)**<br>Braindump of feature and enhancement ideas.

Moreover, you can take a look at the **[Changelog](/CHANGELOG.md)** as well as at the **[MIT License](/LICENSE)**. Or **[learn about me](#creator)**.

<br><br>

## How to install

To get this library via **npm**, we simply have to add it as a new dependency to our `package.json` file, or alternatively run:

``` bash
npm install angular-notifier --save
```

<br>

### Setup for module loaders / bundlers

If we're using **SystemJS**, we should extend our configuration with the following details:

``` javascript
System.config( {
	map: {
		'angular-notifier': 'node_modules/angular-notifier'
	},
	packages: {
		'angular-notifier': {
			defaultExtension: 'js',
			main: 'index.js'
		}
	}
} );
```

We can also use the bundles coming along with the library, either the default UMD bundle (in `bundles/angular-notifier.umd.js`), or the
minified one (in `bundles/angular-notifier.umd.min.js`).

> **Note about modules:**<br>
> All bundles are compiled to ES5, using the ES5-compatible UMD module syntax. All the single modules / files, on the other hand, are also
> compiled to ES5 - but use the ES6 module syntax (in order to allow tree shaking). Thus, when using the single modules / files (e.g. within
> your SystemJS configuration), you might need to include a Transpiler (e.g. Babel) which then converts those ES6 modules in ES5-compatible
> ones (e.g. CommonJS) at runtime.

<br>

### Polyfills

Depending on the browser support we're aiming for, we might also need to bring in some of the following polyfills:

* To be able to use newer JavaScript features in older browsers (e.g. Promises), we can use **[core-js](https://github.com/zloirock/core-js)**.
* For animation support (in particular, for **[Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)** support), we can use **[web-animations-js](https://github.com/web-animations/web-animations-js)**.

> Both of these polyfills are also official recommendations by the Angular team.

<br><br>

## How to setup

Before actually being able to use the **angular-notifier** library within our code, we have to first set it up within Angular, and also
bring the styles into our project,

<br>

### Using angular-notifier in our Angular application

First of all, we need to make the **angular-notifier** library globally available to our Angular application. To accomplish this, we can
import the `NotifierModule` and add it to the imports of our root Angular module, like:

``` typescript
import { NotifierModule } from 'angular-notifier';

@NgModule( {
	imports: [
		NotifierModule
	]
} )
export class AppModule {}
```

However, we probably might want to customize our notifications' look and behaviour according to our needs. To do so, we can call the
`forRoot` method on the `NotifierModule` and pass in the options, like:

``` typescript
import { NotifierModule } from 'angular-notifier';

@NgModule( {
	imports: [
		NotifierModule.forRoot( {
			// Custom options in here
		} )
	]
} )
export class AppModule {}
```

> This syntax is similar to the one used for configuring the *(new new)* Angular Router.

In addition, we have to setup the notification container component **once**; later on, it will containg and manage all notifications. Simply
insert the `x-notifier-container` tag somewhere in your **root component** (e.g. at the end), like:

``` typescript
@Component( {
	selector: 'app',
	template: `
		<h1>Hello World</h1>
		<x-notifier-container></x-notifier-container>
	`
} )
export class AppComponent {}
```

<br>

### Using the angular-notifier styles

In addition, we need to bring in the **angular-notifier** styles into our application. Depending on how we built and structured our Angular
application, we can either use the original SASS files, or the already compiled CSS files - or even none of them if we want to write all
the styles by ourselves.

#### The simple way: Bring in all the styles

We can use all **angular-notifier** styles by simply including one file into our main HTML file:

``` html
<!-- Using all styles at once -->
<link rel="stylesheet" href="[...]/node_modules/angular-notifier/bundles/style.css">

<!-- Using all (already minified) styles at once -->
<link rel="stylesheet" href="[...]/node_modules/angular-notifier/bundles/style.min.css">
```

Alternatively, we can also import the main SASS file (`style.scss`) into our own SASS project styles:

``` scss
// Using the SASS entry file (don't forget the file extension)
@import "[...]/node_modules/angular-notifier/style.scss";
```

#### The advanced way: Only use the styles actually needed

To keep the size if our CSS as small as possible (in order to optimize overall performance, and thus increase the User Experience), we can
also decide to only include the styles we actually need within our application. All styles of **angular-notifier** are modular:

* The `core` styles are required; they set basic styles (e.g. the layout).
* Then, we can import the themes we need from the `src/styles/theme` folder.
* Finally, we can import the styles for required notification types from the `src/styles/types` folder.

For example, if we want to use the `material` theme, and we know for sure that we're only displaying `success` and `error` notifications, we
can only include the files we'll actually need in our HTML file:

``` html
<!-- Using only the styles we actually need -->
<link rel="stylesheet" href="[...]/node_modules/angular-notifier/src/styles/core.css">
<link rel="stylesheet" href="[...]/node_modules/angular-notifier/src/styles/themes/material-theme.css">
<link rel="stylesheet" href="[...]/node_modules/angular-notifier/src/styles/types/type-success.css">
<link rel="stylesheet" href="[...]/node_modules/angular-notifier/src/styles/types/type-error.css">
```

Or, alternatively, we can also import all the SASS files we need into our own SASS project styles:

``` scss
// Using only the SASS files we actually need (don't forget the file extension)
@import "[...]/node_modules/angular-notifier/src/styles/core.scss";
@import "[...]/node_modules/angular-notifier/src/styles/themes/material-theme.scss";
@import "[...]/node_modules/angular-notifier/src/styles/types/type-success.scss";
@import "[...]/node_modules/angular-notifier/src/styles/types/type-error.scss";
```

<br><br>

## How to use

Using **angular-notifier** is as simple as it can get. Before actually using the notifier, we have to import and inject the
`NotifierService` into every component (or service, or ...) we want to use it, like:

``` typescript
import { NotifierService } from 'angular-notifier';

@Component( {
	// Implementation details ...
} )
export class MyAwesomeComponent {

	private notifier: NotifierService;

	public constructor( notifierService: NotifierService ) {
		this.notifier = notifierService;
	}

}
```

<br>

### Showing notifications

Showing a notification is easy - all we need is a type, and a message we want to display:

``` typescript
this.notifier.notify( 'success', 'You are awesome! I mean it!' );
```

We can further pass in a notification ID. This notification ID is nothing more but a simply (yet unique) string, which we can use later on
to have access to this specific notification (for example to hide this notification).

``` typescript
this.notifier.notify( 'success', 'You are awesome! I mean it!', 'THAT_NOTIFICATION_ID' );
```

> Under the hood, angular-notifier will always create its own notification ID if none is provided. However, there's no way to get this
> notification ID from outside, and there's no way to change the notification ID later on.

As an alternative, you can also show a new notification with the following, more generic syntax:

``` typescript
this.notifier.show( {
	type: 'success',
	message: 'You are awesome! I mean it!',
	id: 'THAT_NOTIFICATION_ID' // Similar to above, this key is optional
} );
```

<br>

### Hiding notifications

We can hide a specific notification. However, this is only possible if we know its notification ID. This ID  needs to be set when initially
showing the notification. If we did, then we can hide a specific notification from anywhere within our application:

``` typescript
this.notifier.hide( 'THAT_NOTIFICATION_ID' );
```

Furthermore, We can only hide the newest notification:

``` typescript
this.notifier.hideNewest();
```

Or, we can only hide the oldest notification:

``` typescript
this.notifier.hideOldest();
```

Finally, we can also hide all notification at once:

``` typescript
this.notifier.hideAll();
```

<br><br>

## How to configure

The **angular-notifier** library is fully customizable, so it works the way we want it to, and we can make it blend perfectly into the
rest of our application. The default configuration already tries to provide the best User Experience possible.

It's important to keep in mind that **angular-notifier** can be configured only once - which is at the time we import the `NotifierModule`
into our own app module. For details on how to use our own custom configuration, go back and read the
**[guide for using angular-notifier in our angular application](#using-angular-notifier-in-our-angular-application)**.

<br>

### Position

With the `position` object we can define where exactly notification will appear on the screen:

``` typescript
position: {

	horizontal: {

		/**
		 * Defines the horizontal position on the screen
		 * @type {'left' | 'middle' | 'right'}
		 */
		position: 'left',

		/**
		 * Defines the horizontal distance to the screen edge (in px)
		 * @type {number}
		 */
		distance: 12

	},

	vertical: {

		/**
		 * Defines the vertical position on the screen
		 * @type {'top' | 'bottom'}
		 */
		position: 'bottom',

		/**
		 * Defines the vertical distance to the screen edge (in px)
		 * @type {number}
		 */
		distance: 12

		/**
		 * Defines the vertical gap, existing between multiple notifications (in px)
		 * @type {number}
		 */
		gap: 10

	}

}
```

<br>

### Theme

With the `theme` object we can define the look and feel of our notifications:

``` typescript
/**
 * Defines the notification theme, responsible for the Visual Design of notifications
 * @type {string}
 */
theme: 'material';
```

How does theming work? The value of the `theme` property will be part of a class added to each notification when being created. For example,
using the `material` theme means that all notifications get an additional class named `x-notifier__notification--material`.

> Everyone (yes, I'm looking at you) can use this mechanism to write a custom notification theme in CSS, and aply it via the `theme` option.
> Take a look at the themes coming along with this library (right now only `material`) for an example of how to create custom themes from
> scratch.

<br>

### Behaviour

With the `behaviour` object we can define how notifications will behave in different situations:

``` typescript
behaviour: {

	/**
	 * Defines whether each notification will hide itself automatically after a timeout passes
	 * @type {number | false}
	 */
	autoHide: 5000,

	/**
	 * Defines what happens when someone clicks on a notification
	 * @type {'hide' | false}
	 */
	onClick: false,

	/**
	 * Defines what happens when someone hovers over a notification
	 * @type {'pauseAutoHide' | 'resetAutoHide' | false}
	 */
	onMouseover: 'pauseAutoHide',

	/**
	 * Defines whether the dismiss button is visible or not
	 * @type {boolean}
	 */
	showDismissButton: true,

	/**
	 * Defines whether multiple notification will be stacked, and how high the stack limit is
	 * @type {number | false}
	 */
	stacking: 4

}
```

<br>

### Animations

With the `animations` object we can define whether and how notification will be animated:

``` typescript
animations: {

	/**
	 * Defines whether all (!) animations are enabled or disabled
	 * @type {boolean}
	 */
	enabled: true,

	show: {

		/**
		 * Defines the animation preset that will be used to animate a new notification in
		 * @type {string}
		 */
		preset: 'slide', // Right now: 'slide' or 'fade'

		/**
		 * Defines how long it will take to animate a new notification in (in ms)
		 * @type {number}
		 */
		speed: 300,

		/**
		 * Defines which easing method will be used when animating a new notification in
		 * @type {string}
		 */
		easing: 'ease' // All standard CSS easing methods work

	},

	hide: {

		/**
		 * Defines the animation preset that will be used to animate a new notification out
		 * @type {string}
		 */
		preset: 'fade', // Right now: 'slide' or 'fade'

		/**
		 * Defines how long it will take to animate a new notification out (in ms)
		 * @type {number}
		 */
		speed: 300,

		/**
		 * Defines which easing method will be used when animating a new notification out
		 * @type {string}
		 */
		easing: 'ease', // All standard CSS easing methods work

		/**
		 * Defines the animation offset used when hiding multiple notifications at once (in ms)
		 * @type {number | false}
		 */
		offset: 50

	},

	shift: {

		/**
		 * Defines how long it will take to shift a notification around (in ms)
		 * @type {number}
		 */
		speed: 300,

		/**
		 * Defines which easing method will be used when shifting a notification around
		 * @type {string}
		 */
		easing: 'ease' // All standard CSS easing methods work

	},

	/**
	 * Defines the overall animation overlap, allowing for much smoother looking animations (in ms)
	 * @type {number | false}
	 */
	overlap: 150

}
```

<br>

### In short - the default configuration

To sum it up, this is the default configuration *(copy-paste-friendly)*:

``` typescript
const notifierDefaultOptions: NotifierOptions = {
	position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
	theme: 'material',
	behaviour: {
		autoHide: 5000,
		onClick: false,
		onMouseover: 'pauseAutoHide',
		showDismissButton: true,
		stacking: 4
	},
	animations: {
		enabled: true,
		show: {
			preset: 'slide',
			speed: 300,
			easing: 'ease'
		},
		hide: {
			preset: 'fade',
			speed: 300,
			easing: 'ease',
			offset: 50
		},
		shift: {
			speed: 300,
			easing: 'ease'
		},
		overlap: 150
	}
};
```

<br><br>

## What's next?

There is an endless number of features, enhancements, and optimizations that would be possible (and awesome to have) in the
**angular-notifier** library. Some ideas:

* Automated testing (in particular, unit tests)
* Extended options for all / single notifications
	* Symbol for notifications (e.g. checkmark, cross, or even images)
	* Custom buttons (with callback functionality)
	* Callback functions for specific events / global events
	* Enhanced sacking (e.g. negative values, document size as implicit stacking limit)
	* Custom CSS classes
* Allowing the change of content from outside
* Custom animation presets, configurable from outside
* More themes coming along
* Custom HTML templates as notification content
* Update when document size changes (full responsiveness)
* Pull Request Templates, Contributing Guidelines

> You can't wait for one of these features? Or have some new ideas? Let me know by **[creating an issue](https://github.com/dominique-mueller/angular-notifier/issues/new)**.

<br><br>

## Creator

**Dominique Müller**

- E-Mail: [dominique.m.mueller@gmail.com](mailto:dominique.m.mueller@gmail.com)
- Website: [www.devdom.io](https://www.devdom.io)
- Twitter: [@itsdevdom](https://twitter.com/itsdevdom)
