<script lang="ts">
    import { Header } from "$lib";
    import "./styles.css";
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { sw } from "../store";

    onMount(async () => {
        navigator.serviceWorker.register("/service-worker.js", {
            type: dev ? "module" : "classic",
        });

        $sw = await navigator.serviceWorker.ready;
    });
</script>

<ModeWatcher />
<main class="grid grid-rows-[56px,1fr] h-dvh">
    <Header></Header>
    <slot />
</main>
