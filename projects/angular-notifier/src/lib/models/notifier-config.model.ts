/**
 * Notifier options
 */
export interface NotifierOptions {
  animations?: {
    enabled?: boolean;
    hide?: {
      easing?: string;
      offset?: number | false;
      preset?: string;
      speed?: number;
    };
    overlap?: number | false;
    shift?: {
      easing?: string;
      speed?: number;
    };
    show?: {
      easing?: string;
      preset?: string;
      speed?: number;
    };
  };
  behaviour?: {
    autoHide?: number | false;
    onClick?: 'hide' | false;
    onMouseover?: 'pauseAutoHide' | 'resetAutoHide' | false;
    showDismissButton?: boolean;
    stacking?: number | false;
  };
  position?: {
    horizontal?: {
      distance?: number;
      position?: 'left' | 'middle' | 'right';
    };
    vertical?: {
      distance?: number;
      gap?: number;
      position?: 'top' | 'bottom';
    };
  };
  theme?: string;
}

/**
 * Notifier configuration
 *
 * The notifier configuration defines what notifications look like, how they behave, and how they get animated. It is a global
 * configuration, which means that it only can be set once (at the beginning), and cannot be changed afterwards. Aligning to the world of
 * Angular, this configuration can be provided in the root app module - alternatively, a meaningful default configuration will be used.
 */
export class NotifierConfig implements NotifierOptions {
  /**
   * Customize animations
   */
  public animations: {
    enabled: boolean;
    hide: {
      easing: string;
      offset: number | false;
      preset: string;
      speed: number;
    };
    overlap: number | false;
    shift: {
      easing: string;
      speed: number;
    };
    show: {
      easing: string;
      preset: string;
      speed: number;
    };
  };

  /**
   * Customize behaviour
   */
  public behaviour: {
    autoHide: number | false;
    onClick: 'hide' | false;
    onMouseover: 'pauseAutoHide' | 'resetAutoHide' | false;
    showDismissButton: boolean;
    stacking: number | false;
  };

  /**
   * Customize positioning
   */
  public position: {
    horizontal: {
      distance: number;
      position: 'left' | 'middle' | 'right';
    };
    vertical: {
      distance: number;
      gap: number;
      position: 'top' | 'bottom';
    };
  };

  /**
   * Customize theming
   */
  public theme: string;

  /**
   * Constructor
   *
   * @param [customOptions={}] Custom notifier options, optional
   */
  public constructor(customOptions: NotifierOptions = {}) {
    // Set default values
    this.animations = {
      enabled: true,
      hide: {
        easing: 'ease',
        offset: 50,
        preset: 'fade',
        speed: 300,
      },
      overlap: 150,
      shift: {
        easing: 'ease',
        speed: 300,
      },
      show: {
        easing: 'ease',
        preset: 'slide',
        speed: 300,
      },
    };
    this.behaviour = {
      autoHide: 7000,
      onClick: false,
      onMouseover: 'pauseAutoHide',
      showDismissButton: true,
      stacking: 4,
    };
    this.position = {
      horizontal: {
        distance: 12,
        position: 'left',
      },
      vertical: {
        distance: 12,
        gap: 10,
        position: 'bottom',
      },
    };
    this.theme = 'material';

    // The following merges the custom options into the notifier config, respecting the already set default values
    // This linear, more explicit and code-sizy workflow is preferred here over a recursive one (because we know the object structure)
    // Technical sidenote: Objects are merged, other types of values simply overwritten / copied
    if (customOptions.theme !== undefined) {
      this.theme = customOptions.theme;
    }
    if (customOptions.animations !== undefined) {
      if (customOptions.animations.enabled !== undefined) {
        this.animations.enabled = customOptions.animations.enabled;
      }
      if (customOptions.animations.overlap !== undefined) {
        this.animations.overlap = customOptions.animations.overlap;
      }
      if (customOptions.animations.hide !== undefined) {
        Object.assign(this.animations.hide, customOptions.animations.hide);
      }
      if (customOptions.animations.shift !== undefined) {
        Object.assign(this.animations.shift, customOptions.animations.shift);
      }
      if (customOptions.animations.show !== undefined) {
        Object.assign(this.animations.show, customOptions.animations.show);
      }
    }
    if (customOptions.behaviour !== undefined) {
      Object.assign(this.behaviour, customOptions.behaviour);
    }
    if (customOptions.position !== undefined) {
      if (customOptions.position.horizontal !== undefined) {
        Object.assign(this.position.horizontal, customOptions.position.horizontal);
      }
      if (customOptions.position.vertical !== undefined) {
        Object.assign(this.position.vertical, customOptions.position.vertical);
      }
    }
  }
}
