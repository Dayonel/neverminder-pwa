<script>
    import { Button } from "$lib";

    const allow = () => {
        console.log("allow");
    };
</script>

<svelte:head>
    <title>Neverminder</title>
    <meta
        name="description"
        content="Reminders app that sends notifications for your plans."
    />
</svelte:head>

<div class="home">
    <Button on:click={allow} variant="outline">
        <span>Allow</span>
    </Button>
</div>

<style>
    .home {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100dvw;
        height: 100dvh;
        position: fixed;
    }
</style>
