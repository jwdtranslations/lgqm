<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { buttonVariants } from './components/ui/button';
	import { Settings } from 'lucide-svelte/icons';
	import ConfigPanel from './config-panel.svelte';
</script>

<Popover.Root>
	<Popover.Trigger class={`${buttonVariants({ variant: 'ghost' })}`}>
		<Settings class="h-6 w-6" />
	</Popover.Trigger>
	<Popover.Content>
		<ConfigPanel />
	</Popover.Content>
</Popover.Root>
