<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Button } from './ui/button';

	type Props = {
		values: string[] | ReadonlyArray<string>;
		value?: string;
		placeholder?: string;
		class?: string;
		extraValue?: string;
		onExtraValue?: () => void;
	};
	let {
		values,
		value = $bindable(),
		placeholder = '',
		class: className,
		extraValue,
		onExtraValue
	}: Props = $props();
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
			<Select.Item value={o.value}>{o.label}</Select.Item>
		{/each}
		{#if extraValue}
			<Select.Separator />
			<Button onclick={() => onExtraValue?.()} class="w-full" variant="ghost">{extraValue}</Button>
		{/if}
	</Select.Content>
</Select.Root>
