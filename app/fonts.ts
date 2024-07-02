// Import font CSS
import '@/styles/local-fonts.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/600.css';
import '@fontsource/roboto-mono/700.css';
import '@fontsource/lora/400.css';
import '@fontsource/lora/600.css';
import '@fontsource/lora/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/600.css';
import '@fontsource/jetbrains-mono/700.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/600.css';
import '@fontsource/ibm-plex-mono/700.css';
import '@fontsource/dm-mono/400.css';
import '@fontsource/dm-mono/500.css';
import '@fontsource/sono/400.css';
import '@fontsource/sono/600.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/600.css';
import '@fontsource/zilla-slab/400.css';
import '@fontsource/zilla-slab/600.css';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import '@fontsource/archivo/400.css';
import '@fontsource/archivo/600.css';
import '@fontsource/karla/400.css';
import '@fontsource/karla/600.css';

// Define the font configurations
const fontConfigs = [
  { name: 'Lotion', value: 'lotion', fontFamily: '"Lotion", monospace', weights: [700, 800] },
  { name: 'Archivo', value: 'archivo', fontFamily: '"Archivo", sans-serif', weights: [400, 600] },
  { name: 'Karla', value: 'karla', fontFamily: '"Karla", sans-serif', weights: [400, 600] },
  { name: 'Inter', value: 'inter', fontFamily: '"Inter", sans-serif', weights: [400, 600, 700] },
  { name: 'Roboto Mono', value: 'roboto-mono', fontFamily: '"Roboto Mono", monospace', weights: [400, 600, 700] },
  { name: 'Lora', value: 'lora', fontFamily: '"Lora", serif', weights: [400, 700] },
  { name: 'Poppins', value: 'poppins', fontFamily: '"Poppins", sans-serif', weights: [400, 600, 700] },
  { name: 'JetBrains Mono', value: 'jetbrains-mono', fontFamily: '"JetBrains Mono", monospace', weights: [400, 600, 700] },
  { name: 'IBM Plex Mono', value: 'ibm-plex-mono', fontFamily: '"IBM Plex Mono", monospace', weights: [400, 600, 700] },
  { name: 'DM Mono', value: 'dm-mono', fontFamily: '"DM Mono", monospace', weights: [400, 500] },
  { name: 'Sono', value: 'sono', fontFamily: '"Sono", monospace', weights: [400, 600] },
  { name: 'Manrope', value: 'manrope', fontFamily: '"Manrope", sans-serif', weights: [400, 600] },
  { name: 'Zilla Slab', value: 'zilla-slab', fontFamily: '"Zilla Slab", serif', weights: [400, 600] },
  { name: 'Space Mono', value: 'space-mono', fontFamily: '"Space Mono", monospace', weights: [400, 700] },
];

export const fontOptions = fontConfigs.map(({ name, value, fontFamily }) => ({
  name,
  value,
  fontFamily,
}));

export type FontOptionKey = typeof fontConfigs[number]['value'];
