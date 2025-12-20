import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { fa } from 'vuetify/locale'


export const vuetify = createVuetify({
    components,
    directives,
    rtl: true,
    icons: {
        defaultSet: "mdi",
    },
    locale: {
        locale: "fa",
        fallback: "en",
        messages: { fa },
    },
});
