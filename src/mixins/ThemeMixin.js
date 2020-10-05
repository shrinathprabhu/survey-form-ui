import store from '../store';

export default {
    data: () => ({
        colors: store.state.colors,
        changeTheme: false,
    }),
    methods: {
        generateRandomColor() {
            return this.colors[Math.round(Math.random() * this.colors.length)];
        },
        createSessionTheme() {
            let prefs = sessionStorage.getItem("prefs");
            if (prefs) {
                prefs = JSON.parse(prefs);
                if (prefs.theme && prefs.theme.value) {
                    // Do nothing
                } else {
                    prefs.theme = this.generateRandomColor();
                    sessionStorage.setItem("prefs", prefs);
                }
            } else {
                prefs = {
                    theme: this.generateRandomColor(),
                };
                sessionStorage.setItem("prefs", JSON.stringify(prefs));
            }
            store.commit("changeThemeColor", prefs.theme);
            document.querySelector("link[rel*='icon']").href = "favicons/" + prefs.theme.icon;
            return prefs.theme.value;
        },
        changeThemeColor(theme) {
            let prefs = localStorage.getItem("prefs");
            let prefsSession = sessionStorage.getItem("prefs");
            if (prefs) {
                prefs = JSON.parse(prefs);
                prefs.theme = theme;
            } else {
                prefs = { theme };
            }
            localStorage.setItem("prefs", JSON.stringify(prefs));
            if (prefsSession) {
                prefsSession = JSON.parse(prefsSession);
                prefsSession.theme = theme;
            } else {
                prefsSession = { theme };
            }
            sessionStorage.setItem("prefs", JSON.stringify(prefsSession));
            store.commit("changeThemeColor", prefs.theme);
            document.querySelector("link[rel*='icon']").href = "/favicons/" + prefs.theme.icon;
        },
        captureThemeMode() {
            store.commit("changeThemeMode", this.$vuetify.theme.dark);
            let prefs = localStorage.getItem("prefs");
            if (prefs) {
                prefs = JSON.parse(prefs);
                prefs.dark = this.$vuetify.theme.dark;
            } else {
                prefs = { dark: this.$vuetify.theme.dark };
            }
            localStorage.setItem("prefs", JSON.stringify(prefs));
        },
    },
    computed: {
        themeColor() {
            let theme = store.state.theme;
            if (theme && theme.value) {
                if (theme.icon) {
                    document.querySelector("link[rel*='icon']").href = "/favicons/" + theme.icon;
                }
                return theme.value;
            }
            let prefs = localStorage.getItem("prefs");
            if (prefs) {
                prefs = JSON.parse(prefs);
                if (prefs.theme && prefs.theme.name && prefs.theme.value) {
                    if (this.colors.find((color) => color.value === prefs.theme.value)) {
                        store.commit("changeThemeColor", prefs.theme);
                        document.querySelector("link[rel*='icon']").href = "/favicons/" + prefs.theme.icon;
                        return prefs.theme.value;
                    }
                }
            }
            return this.createSessionTheme();
        },
    }
}