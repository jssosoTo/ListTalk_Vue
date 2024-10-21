import { defineStore } from "pinia";
import { ref } from "vue";

export const useMaskStore = defineStore('mask', () => {
    const isMaskShow = ref(false);

    function toggleMaskShow() {
        isMaskShow.value = !isMaskShow.value;
    }

    function openMask() {
        isMaskShow.value = true;
    }

    function closeMask() {
        isMaskShow.value = false;
    }

    return {
        isMaskShow,
        toggleMaskShow,
        openMask,
        closeMask
    }
})