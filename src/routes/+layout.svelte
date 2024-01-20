<script lang="ts">
    import { Header } from "$lib";
    import "./styles.css";
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";
    import { dev } from "$app/environment";
    import { sw } from "../store";
    import { Toaster } from "$lib/components/ui/sonner";

    let supported = false;
    const versionMessage =
        "This application requires iOS 16.5 or later. Please run a software update to continue.";

    const load = async () => {
        supported = detectVersion();
        navigator.serviceWorker.register("/service-worker.js", {
            type: dev ? "module" : "classic",
        });

        $sw = await navigator.serviceWorker.ready;
    };

    const detectVersion = (): boolean => {
        // Get the User-Agent string
        var userAgent = navigator.userAgent;
        if (!/iPhone|iPad/.test(userAgent)) return true;

        var iOSVersion = userAgent.match(/OS (\d+_\d+)/);
        if (!iOSVersion) return false;

        // Replace '_' with a '.' to get the actual version number
        const version = +iOSVersion[1].replace("_", ".");
        if (version >= 16.5) return true;

        alert(versionMessage);

        return false;
    };
</script>

<ModeWatcher />
<main class="grid grid-rows-[56px,1fr] h-dvh">
    <Header></Header>
    {#await load() then}
        {#if supported}
            <slot />
        {:else}
            <div class="alert">{versionMessage}</div>
        {/if}
    {/await}
    <Toaster />
</main>

<style>
    .alert {
        padding: 2.5rem;
        text-align: center;
    }
</style>
