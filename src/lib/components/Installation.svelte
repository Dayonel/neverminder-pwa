<script lang="ts">
    import { onMount } from "svelte";
    import { Separator } from "./ui/separator";
    import { Bell, PaperPlane, Download } from "radix-icons-svelte";
    import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
    import { Switch } from "./ui/switch";
    import { Button } from "./ui/button";
    import { toast } from "svelte-sonner";
    import CardDescription from "./ui/card/card-description.svelte";
    import { sw } from "../../store";

    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );
    const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    let isPWA: boolean;
    let pwaInstalled: boolean;
    let notificationsEnabled: boolean;
    let checked = false;
    $: checked, allow();

    onMount(async () => {
        isPWA =
            // @ts-ignore
            window.navigator.standalone ||
            window.matchMedia("(display-mode: standalone)").matches;

        notificationsEnabled = Notification.permission === "granted";
    });

    const allow = () => {
        if (!checked) return;

        Notification.requestPermission().then((status) => {
            notificationsEnabled = status === "granted";
            checked = notificationsEnabled;
            if (!notificationsEnabled) {
                toast(
                    "You denied permissions to notifications. Please go to your browser or phone setting to allow notifications.",
                );
            }
        });
    };

    const installPWA = async () => {
        // @ts-ignore
        if (!window.deferredPrompt) {
            pwaInstalled = true;
            return;
        }
        // @ts-ignore
        window.deferredPrompt.prompt(); // global var
        // @ts-ignore
        const { outcome } = await window.deferredPrompt.userChoice;
        // @ts-ignore
        window.deferredPrompt = null;
        if (outcome === "accepted") {
            pwaInstalled = true;
        }
    };

    const send = () => {
        const options = {
            body: "You got a notification.",
            icon: "./favicon-32x32.png",
        };
        $sw.showNotification("Notification!", options);
    };
</script>

<div class="flex justify-center md:w-[400px] m-auto">
    <!-- Mobile -->
    {#if isMobile && !isPWA}
        <!-- iOS -->
        <div class="flex flex-col align-center justify-center p-6">
            {#if isiOS}
                <p class="uppercase text-center text-sm">
                    Installation instructions
                </p>
                <Separator class="my-4" />
                <div class="flex flex-col gap-4">
                    <p class="text-center text-sm">
                        Step 1: In Safari, click the 'share' button.
                    </p>
                    <img
                        class="rounded-lg"
                        src="installation/step1.png"
                        alt="Add to home screen step 1"
                    />
                    <Separator class="my-4" />
                    <p class="text-center text-sm">
                        Step 2: Add to home screen.
                    </p>
                    <img
                        class="rounded-lg"
                        src="installation/step2.png"
                        alt="Add to home screen step 2"
                    />
                    <Separator class="my-4" />
                    <p class="text-center text-sm">Step 3: Click Add.</p>
                    <img
                        class="rounded-lg"
                        src="installation/step3.png"
                        alt="Add to home screen step 3"
                    />
                    <Separator class="my-4" />
                    <p class="text-center text-sm">
                        Step 4: Launch app from home screen.
                    </p>
                    <img
                        class="rounded-lg"
                        src="installation/step4.png"
                        alt="Add to home screen step 4"
                    />
                </div>
                <!-- Android install PWA shortcut -->
            {:else if !pwaInstalled}
                <Button
                    class="gap-1"
                    on:click={installPWA}
                    variant="outline"
                    hidden
                >
                    <Download></Download>
                    <span>Install PWA</span>
                </Button>
            {:else}
                <!-- Android pwa installed (now open PWA) -->
                <div class="flex flex-col gap-4">
                    <p class="text-center text-sm">
                        Launch app from home screen.
                    </p>
                    <img
                        class="rounded-lg"
                        src="installation/step4.png"
                        alt="Add to home screen step 4"
                    />
                </div>
            {/if}
        </div>
    {:else if !notificationsEnabled}
        <!-- Allow notifications -->
        <div class="flex mx-auto md:my-auto">
            <div class="flex flex-col p-4 gap-4">
                <p class="text-center text-sm">
                    Welcome to Neverminder app! To enhance your experience and
                    keep you informed about your plans and updates, we use
                    notifications.
                </p>
                <Separator class="my-4"></Separator>
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Enable notifications</CardDescription>
                    </CardHeader>
                    <CardContent class="grid gap-4">
                        <div
                            class="flex items-center space-x-4 rounded-md border p-4"
                        >
                            <Bell class="h-[1rem] w-[1rem]" />
                            <div class="flex-1 space-y-1">
                                <p class="text-sm font-medium leading-none">
                                    Push Notifications
                                </p>
                                <p class="text-sm text-muted-foreground">
                                    Send notifications to device.
                                </p>
                            </div>
                            <Switch bind:checked on:click={allow} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    {:else}
        <!-- Ready -->
        <Button class="gap-1" on:click={send} variant="outline">
            <PaperPlane></PaperPlane>
            <span>Send notification</span>
        </Button>
    {/if}
</div>
