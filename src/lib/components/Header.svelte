<script>
    import { AppBar, LightSwitch } from "@skeletonlabs/skeleton";
</script>

<AppBar>
    <svelte:fragment slot="lead">
        <strong class="text-2xl uppercase">Btodoapp</strong>
    </svelte:fragment>
    <svelte:fragment slot="trail">
        <LightSwitch />
    </svelte:fragment>
</AppBar>
