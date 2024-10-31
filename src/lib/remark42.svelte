<script lang="ts">
	import { PUBLIC_REMARK42_SITE_ID, PUBLIC_REMARK42_URL } from '$env/static/public';
	import { mode } from 'mode-watcher';

	const config = $derived({
		host: PUBLIC_REMARK42_URL,
		site_id: PUBLIC_REMARK42_SITE_ID,
		components: ['embed', 'last-comments'],
		max_shown_comments: 100,
		theme: mode,
		page_title: 'My custom title for a page',
		locale: 'en',
		show_email_subscription: false,
		show_rss_subscription: false,
		simple_view: false,
		no_footer: true
	});
	$effect(() => {
		// @ts-ignore
		window.remark_config = config;
	});
	const renderLoadScript = $state(true);
</script>

<svelte:head>
	{#if renderLoadScript}
		<script defer src={`${PUBLIC_REMARK42_URL}/web/embed.js`}></script>
	{/if}
</svelte:head>

<div id="remark42"></div>
