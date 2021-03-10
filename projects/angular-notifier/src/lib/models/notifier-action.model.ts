/**
 * Notifier action
 *
 * In general, API calls don't get processed right away. Instead, we have to queue them up in order to prevent simultanious API calls
 * interfering with each other. This, at least in theory, is possible at any time, primarily due to overlapping animations.
 *
 * Technical sidenote:
 * An action looks pretty similar to the ones within the Flux / Redux pattern.
 */
export interface NotifierAction {
  /**
   * Action payload containing all information necessary to process the action (optional)
   */
  payload?: any;

  /**
   * Action type
   */
  type: 'SHOW' | 'HIDE' | 'HIDE_ALL' | 'HIDE_NEWEST' | 'HIDE_OLDEST';
}
