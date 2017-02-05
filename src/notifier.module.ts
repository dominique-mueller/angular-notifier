import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, OpaqueToken } from '@angular/core';

import { NotifierContainerComponent } from './components/notifier-container.component';
import { NotifierNotificationComponent } from './components/notifier-notification.component';
import { NotifierConfig, NotifierOptions } from './models/notifier-config.model';
import { NotifierAnimationService } from './services/notifier-animation.service';
import { NotifierQueueService } from './services/notifier-queue.service';
import { NotifierService } from './services/notifier.service';

// tslint:disable variable-name
/**
 * Dependency Injection token for custom notifier options
 */
export const CustomNotifierOptions: OpaqueToken = new OpaqueToken( 'NotifierOptions' );
// tslint:enable variable-name

/**
 * Factory for creating a notifier configuration object
 *
 * Sidenote:
 * This functionality had to be extracted from the NotifierModule.forRoot function, described below. Otherwhise, the Angular AoT compiler
 * would throw errors. For further details, also see:
 * - Angular issue #11262 <https://github.com/angular/angular/issues/11262>
 * - Angular issue #10789 <https://github.com/angular/angular/issues/10789>
 */
export function notifierConfigFactory( options: NotifierOptions ): NotifierConfig {
	return new NotifierConfig( options );
}

/**
 * Notifier module
 */
@NgModule( {
	declarations: [
		NotifierContainerComponent,
		NotifierNotificationComponent
	],
	exports: [
		NotifierContainerComponent
	],
	imports: [
		CommonModule
	],
	providers: [
		NotifierAnimationService,
		NotifierService,
		NotifierQueueService
	]
} )
export class NotifierModule {

	/**
	 * Setup custom module (service) configuration
	 */
	public static forRoot( options: NotifierOptions ): ModuleWithProviders {
		return {
			ngModule: NotifierModule,
			providers: [
				{
					provide: CustomNotifierOptions,
					useValue: options
				},
				{
					deps: [
						CustomNotifierOptions
					],
					provide: NotifierConfig,
					useFactory: notifierConfigFactory
				}
			]
		};
	}

}
