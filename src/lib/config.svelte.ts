import { persistedState } from './persisted-state.svelte';

export const fonts = ['roboto', 'sans', 'serif'] as const;
export const fontMap = {
	roboto: 'Roboto',
	sans: 'Noto Sans',
	serif: 'Noto Serif'
} as any;
export const modes = ['light', 'dark', 'system'] as const;

export type AppConfig = {
	font: (typeof fonts)[number];
	mode: (typeof modes)[number];
};

const defaultConfig: AppConfig = {
	font: 'sans',
	mode: 'light'
};

export const appConfig = persistedState('app-config', defaultConfig);
