import { writable } from 'svelte/store';

export const sw = writable<ServiceWorkerRegistration>();