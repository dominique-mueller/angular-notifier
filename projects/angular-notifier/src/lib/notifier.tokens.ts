import { InjectionToken } from '@angular/core';

import { NotifierConfig, NotifierOptions } from './models/notifier-config.model';

/**
 * Injection Token for notifier options
 */
export const NotifierOptionsToken: InjectionToken<NotifierOptions> = new InjectionToken<NotifierOptions>(
  '[angular-notifier] Notifier Options',
);

/**
 * Injection Token for notifier configuration
 */
export const NotifierConfigToken: InjectionToken<NotifierConfig> = new InjectionToken<NotifierConfig>('[anuglar-notifier] Notifier Config');
