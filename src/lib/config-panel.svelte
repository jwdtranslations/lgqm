<script lang="ts">
	import { mode } from 'mode-watcher';
	import SelectWrapper from './components/select-wrapper.svelte';
	import ConfigItem from './config-item.svelte';
	import { appConfig, fonts, modes } from './config.svelte';
	import ModePicker from './mode-picker.svelte';
</script>

{#snippet label(name: string)}
	<span class="text-sm font-medium leading-none">{name}</span>
{/snippet}

<div class="flex flex-col gap-2">
	<ConfigItem>
		{@render label('Font')}
		<SelectWrapper values={fonts} bind:value={appConfig.value.font} class="w-32" />
	</ConfigItem>
	<ConfigItem>
		{@render label('Theme')}
		<ModePicker />
	</ConfigItem>
</div>
