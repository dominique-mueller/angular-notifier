import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifierAnimationService } from './services/notifier-animation.service';
import { NotifierService } from './services/notifier.service';
import { NotifierQueueService } from './services/notifier-queue.service';
import { NotifierConfigGlobal, NotifierOptionsGlobal } from './models/notifier-config-global.model';
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
	public static forRoot( customOptions: NotifierOptionsGlobal ): ModuleWithProviders {
		return {
			ngModule: NotifierModule,
			providers: [
				{
					provide: NotifierConfigGlobal,
					useValue: new NotifierConfigGlobal( customOptions )
				}
			]
		};
	}

}
