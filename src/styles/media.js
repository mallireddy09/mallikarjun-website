const DESKTOP_MIN_WIDTH = 1201;

export const DESKTOP_QUERY = `(min-width: ${DESKTOP_MIN_WIDTH}px) and (pointer: fine)`;
export const DRAWER_MEDIA = `screen and (max-width: ${DESKTOP_MIN_WIDTH - 1}px), screen and (pointer: coarse)`;
