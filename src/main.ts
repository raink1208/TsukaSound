import { createApp } from 'vue'
import './assets/normalize.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import {definePreset} from "@primevue/themes";
import {router} from "./router";


const app = createApp(App);

app.use(router);

app.use(PrimeVue, {
    theme: {
        preset: definePreset(Aura, {
            semantic: {
                primary: {
                    50: "{red.50}",
                    100: "{red.100}",
                    200: "{red.200}",
                    300: "{red.300}",
                    400: "{red.400}",
                    500: "{red.500}",
                    600: "{red.600}",
                    700: "{red.700}",
                    800: "{red.800}",
                    900: "{red.900}",
                    950: "{red.950}"
                }
            }}),
        options: {
            darkModeSelector: 'darkModeSelector'
        }
    }
})

app.mount('#app')
