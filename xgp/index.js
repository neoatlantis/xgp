import { createI18n } from "vue-i18n";
import { createApp } from "vue";
import App from "./vue/app.vue";

setTimeout(()=>{
    const i18n = createI18n({
        locale: navigator.language,
        fallbackLocale: "en",
    });

    const app = createApp(App)
        .use(i18n)
        .mount("#app")
    ;
}, 0);
