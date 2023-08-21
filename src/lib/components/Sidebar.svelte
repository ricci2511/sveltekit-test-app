<script>
	import { HomeIcon, InfoIcon } from "lucide-svelte";
</script>

<nav class="list-nav">
	<ul>
		<li>
			<a href="/">
                <span class="badge bg-primary-500">
                    <HomeIcon class="w-5 h-5" />
                </span>
                <span class="flex-auto">Home</span>
            </a>
		</li>
		<li>
			<a href="/about">
                <span class="badge bg-primary-500">
                    <InfoIcon class="w-5 h-5" />
                </span>
                <span class="flex-auto">About</span>
            </a>
		</li>
	</ul>
</nav>
