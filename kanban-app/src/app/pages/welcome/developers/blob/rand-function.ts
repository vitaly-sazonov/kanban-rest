import { MAX_CIRCLE_TRANSFORM } from 'src/app/constants';

export const getRandValue = () =>
  new Array(16)
    .fill(0)
    .map(
      el =>
        (Math.random() * MAX_CIRCLE_TRANSFORM * 2 - MAX_CIRCLE_TRANSFORM) | 0
    );
