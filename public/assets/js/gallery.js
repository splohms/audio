import { preloadImages } from './utils.js';
import { Grid } from './grid.js';

// Preload images then remove loader (loading class) from body
preloadImages('.column__item-img').then(() => {
    document.body.classList.remove('loading');

    // Initialize the grid
    new Grid(document.querySelector('.columns'));
});
