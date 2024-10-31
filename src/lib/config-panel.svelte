<script lang="ts">
	import ConfigItem from './config-item.svelte';
	import { appConfig } from './config.svelte';
	import FontSelect from './font-select.svelte';
	import ModePicker from './mode-picker.svelte';
</script>

{#snippet label(name: string)}
	<span class="text-sm font-medium leading-none">{name}</span>
{/snippet}

<div class="flex flex-col gap-2">
	<ConfigItem>
		{@render label('Font')}
		<FontSelect bind:value={appConfig.value.font} class="w-32" />
	</ConfigItem>
	<ConfigItem>
		{@render label('Theme')}
		<ModePicker />
	</ConfigItem>
</div>
