<script>
	import { drawerStore } from "@skeletonlabs/skeleton";
	import { HomeIcon, InfoIcon } from "lucide-svelte";
    
    const navEntries = [
        {
            name: "Home",
            icon: HomeIcon,
            href: "/",
        },
        {
            name: "About",
            icon: InfoIcon,
            href: "/about",
        },
    ];
</script>

<nav class="list-nav p-4">
	<ul>
        {#each navEntries as { name, icon, href}}
            <li class="mb-2">
                <a href={href} on:click={() => drawerStore.close()}>
                    <span class="badge variant-ghost-primary">
                        <svelte:component this={icon} class="w-4 h-4" />
                    </span>
                    <span class="flex-auto">{name}</span>
                </a>
            </li>
        {/each}
	</ul>
</nav>
