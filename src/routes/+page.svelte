<script>
    import { Button } from "$lib";
    import { Bell, PaperPlane } from "radix-icons-svelte";
    import { Toaster } from "$lib/components/ui/sonner";
    import { toast } from "svelte-sonner";
    import { sw } from "../store";
    import { onMount } from "svelte";

    let notificationsEnabled = false;
    let mounted = false;

    onMount(() => {
        notificationsEnabled = Notification.permission === "granted";
        mounted = true;
    });

    const allow = async () => {
        const status = await Notification.requestPermission();
        notificationsEnabled = status === "granted";
        if (!notificationsEnabled)
            toast(
                "Please allow notifications to make sure that the application works.",
            );
    };

    const send = () => {
        //Ask user if we show notifications
        if (window.Notification && Notification.permission === "granted") {
            notification();
        }
        // If the user hasn't told whether he wants to be notified or not
        else if (window.Notification && Notification.permission !== "denied") {
            Notification.requestPermission((status) => {
                if (status === "granted") {
                    notification();
                } else {
                    toast(
                        "You denied or dismissed permissions to notifications.",
                    );
                }
            });
        } else {
            // If the user refuses to get notified
            toast(
                "You denied permissions to notifications. Please go to your browser or phone setting to allow notifications.",
            );
        }
    };

    const notification = () => {
        const options = {
            body: "You got a notification.",
            icon: "./favicon-32x32.png",
        };
        $sw.showNotification("Notification!", options);
    };
</script>

<svelte:head>
    <title>Neverminder</title>
    <meta
        name="description"
        content="Reminders app that sends notifications for your plans."
    />
</svelte:head>

{#if mounted}
    <div class="flex items-center justify-center">
        {#if !notificationsEnabled}
            <Button class="gap-1" on:click={allow} variant="outline">
                <Bell></Bell>
                <span>Enable notifications</span>
            </Button>
        {:else}
            <Button class="gap-1" on:click={send} variant="outline">
                <PaperPlane></PaperPlane>
                <span>Send notification</span>
            </Button>
        {/if}

        <Toaster />
    </div>
{/if}
