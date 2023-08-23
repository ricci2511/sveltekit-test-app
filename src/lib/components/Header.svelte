<script>
    import { AppBar, LightSwitch, drawerStore } from "@skeletonlabs/skeleton";
	import { MenuSquare } from "lucide-svelte";
</script>

<AppBar>
    <svelte:fragment slot="lead">
        <button class="md:hidden btn-icon mr-3" on:click={() => drawerStore.open()} title="Toggle Sidebar Navigation">
            <MenuSquare class="w-6 h-6" />
        </button>
        <strong class="text-2xl uppercase">Btodoapp</strong>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <LightSwitch />
    </svelte:fragment>
</AppBar>
