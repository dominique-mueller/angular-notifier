import { AppModule } from './app.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Bootstrap app module
platformBrowserDynamic().bootstrapModule( AppModule )
	.then( () => {
		console.log( 'Application bootstrap successful!' );
	} )
	.catch( ( error: any ) => {
		console.error( 'An error occured during the application bootstrap!' );
		console.error( error );
	} );
