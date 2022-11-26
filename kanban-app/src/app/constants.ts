export const APP_URL = 'https://radiant-earth-37235.herokuapp.com';

export const TOKEN = 'token';

export const BOARDS = 'Boards';

export const BASKET = 'Basket';

export const LAST_SEARCH = 'lastSearch';

export const user2 = {
  name: 'Alex',
  login: 'user002',
  password: 'userpass@123',
};

export const TIME_SHOW_NOTIFICATION = 10000;

export const COLUMN_TITLE_HEIGHT = 64;
export const COLUMN_BOTTOM_HEIGHT = 85;
export const MAX_HUE_RANGE = 360;
export const START_GRADIENT = 300;
export const END_GRADIENT = 200;
export const GRADIENT_CHANGE_RATIO = 25;

export const MAX_CIRCLE_TRANSFORM = 20;
export const TRANSFORM_SPEED = 2;
export const ROTATE_SPEED = 10;
export const MS_IN_S = 1000;

export const ANIMATION_DURATION = 300;

export const ANIMATIONS = {
  bottomTopIn: {
    translateY: [100, 0],
    opacity: [0, 1],
    easing: 'easeOutQuad',
    duration: ANIMATION_DURATION,
  },
  topBottomIn: {
    translateY: [-100, 0],
    opacity: [0, 1],
    easing: 'easeOutQuad',
    duration: ANIMATION_DURATION,
  },
  leftRightIn: {
    translateX: [-100, 0],
    opacity: [0, 1],
    easing: 'easeOutQuad',
    duration: ANIMATION_DURATION,
  },
  rightLeftIn: {
    translateX: [100, 0],
    opacity: [0, 1],
    easing: 'easeOutQuad',
    duration: ANIMATION_DURATION,
  },
  bottomTopOut: {
    translateY: [0, -100],
    opacity: [1, 0],
    easing: 'easeOutQuad',
    duration: ANIMATION_DURATION,
  },
  topBottomOut: {
    translateY: [0, 100],
    opacity: [1, 0],
    easing: 'easeOutQuad',
    duration: ANIMATION_DURATION,
  },
  leftRightOut: {
    translateX: [0, 100],
    opacity: [1, 0],
    easing: 'easeOutQuad',
    duration: ANIMATION_DURATION,
  },
  rightLeftOut: {
    translateX: [0, -100],
    opacity: [1, 0],
    easing: 'easeOutQuad',
    duration: ANIMATION_DURATION,
  },
};

export const BOARD_HEIGHT = 200;
export const BOARD_BOTTOM_PADDING = 90;
export const FOOTER_HEIGHT = 50;

export const PICTURES_PER_CATEGORY = 10;
