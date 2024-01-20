<script lang="ts">
    import { Sun, Moon } from "radix-icons-svelte";
    import { toggleMode } from "mode-watcher";
    import { Button } from "./ui/button";
    import { Logo } from "$lib";
</script>

<header
    class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
    <div class="container flex justify-between h-14 max-w-screen-2xl items-center">
        <div class="mr-4">
            <a href="/" class="mr-6 flex items-center space-x-2" aria-label="Neverminder">
                <div class="logo">
                    <Logo></Logo>
                </div>
                <span class="hidden font-bold sm:inline-block">Neverminder</span
                ></a
            >
        </div>

        <div
            class="flex items-center justify-between space-x-2"
        >
            <nav class="flex items-center">
                <Button on:click={toggleMode} variant="outline" size="icon">
                    <Sun
                        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    />
                    <Moon
                        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                    />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </nav>
        </div>
    </div>
</header>
