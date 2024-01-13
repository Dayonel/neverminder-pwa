<script lang="ts">
    import { Header } from "$lib";
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<Header></Header>
<slot />
