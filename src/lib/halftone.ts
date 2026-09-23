/** 4×4 ordered-dither threshold matrix — see CLAUDE.md §8. */
export const BAYER4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

/** How far tones are pushed away from mid grey before thresholding. */
export const DITHER_CONTRAST = 1.35;
