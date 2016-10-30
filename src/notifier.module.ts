import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifierAnimationService } from './services/notifier-animation.service';
import { NotifierService } from './services/notifier.service';
import { NotifierQueueService } from './services/notifier-queue.service';
import { NotifierConfig, NotifierOptions } from './models/notifier-config.model';
import { NotifierContainerComponent } from './components/notifier-container.component';
import { NotifierNotificationComponent } from './components/notifier-notification.component';

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
					provide: NotifierConfig,
					useValue: new NotifierConfig( options )
				}
			]
		};
	}

}
