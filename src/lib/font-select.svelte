<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { fontMap, fonts } from './config.svelte';

	type Props = {
		placeholder?: string;
		value?: string;
		class?: string;
	};
	let { value = $bindable(), class: className, placeholder }: Props = $props();

	const values = fonts;
	const capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
	export const valuesToOptions = (values: Readonly<string[]>) =>
		values.map((value) => ({ value, label: capitalise(value) }));
	const options = $derived(valuesToOptions(values));
	const triggerContent = $derived(options.find((f) => f.value === value)?.label ?? placeholder);
</script>

<Select.Root type="single" bind:value>
	<Select.Trigger class={className}>
		{triggerContent}
	</Select.Trigger>
	<Select.Content>
		{#each options as o}
			<Select.Item value={o.value} style={`font-family: ${fontMap[o.value]};`}
				>{o.label}</Select.Item
			>
		{/each}
	</Select.Content>
</Select.Root>
