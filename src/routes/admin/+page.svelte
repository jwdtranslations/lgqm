<script lang="ts">
	import { browser } from '$app/environment';
	import CMS from 'decap-cms-app';

	if (browser) {
		CMS.init();
	}
</script>
