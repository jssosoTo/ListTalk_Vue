import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore('theme', () => {
    const theme = ref('dark');

    function toggleTheme() {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
    }

    return {
        theme,
        toggleTheme
    }
})