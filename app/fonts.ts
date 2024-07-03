// Import font CSS
import '@/styles/local-fonts.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/600.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/dm-mono/400.css';
import '@fontsource/dm-mono/500.css';
import '@fontsource/sono/400.css';
import '@fontsource/sono/600.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/600.css';
import '@fontsource/karla/500.css';
import '@fontsource/karla/600.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/archivo/400.css';
import '@fontsource/archivo/600.css';
import '@fontsource/pt-mono';
import '@fontsource/iosevka/400.css';
import '@fontsource/iosevka/700.css';
import '@fontsource/iosevka-curly-slab/400.css';
import '@fontsource/iosevka-curly-slab/600.css';
import '@fontsource/sora/400.css';
import '@fontsource/sora/600.css';

// Define the font configurations
const fontConfigs = [
  { name: 'Lotion', value: 'lotion', fontFamily: '"Lotion", monospace', weights: [700, 800] },
  { name: 'Archivo', value: 'archivo', fontFamily: '"Archivo", sans-serif', weights: [400, 600] },
  { name: 'Karla', value: 'karla', fontFamily: '"Karla", sans-serif', weights: [400, 600] },
  { name: 'DM Sans', value: 'dm-sans', fontFamily: '"DM Sans", sans-serif', weights: [400, 600] },
  { name: 'Poppins', value: 'poppins', fontFamily: '"Poppins", sans-serif', weights: [400, 600] },
  { name: 'JetBrains Mono', value: 'jetbrains-mono', fontFamily: '"JetBrains Mono", monospace', weights: [400, 600, 700] },
  { name: 'DM Mono', value: 'dm-mono', fontFamily: '"DM Mono", monospace', weights: [400, 500] },
  { name: 'Sono', value: 'sono', fontFamily: '"Sono", monospace', weights: [400, 600] },
  { name: 'Sora', value: 'sora', fontFamily: '"Sora", sans-serif', weights: [400, 600] },
  { name: 'Manrope', value: 'manrope', fontFamily: '"Manrope", sans-serif', weights: [400, 600] },
  { name: "Space Grotesk", value: 'space-grotesk', fontFamily: '"Space Grotesk", sans-serif', weights: [500, 600] },
  { name: "PT Mono", value: 'pt-mono', fontFamily: '"PT Mono", monospace', weights: [400] },
  { name: "Iosevka", value: 'iosevka', fontFamily: '"Iosevka", monospace', weights: [400, 700] },
  { name: "Iosevka Curly Slab", value: 'iosevka-curly-slab', fontFamily: '"Iosevka Curly Slab", monospace', weights: [400, 600] },
];

export const fontOptions = fontConfigs.map(({ name, value, fontFamily }) => ({
  name,
  value,
  fontFamily,
}));

export type FontOptionKey = typeof fontConfigs[number]['value'];
