import {reactive, computed, isReactive} from 'vue';

const entryDataModals = window.widjetOuter.modals;
const modals = reactive({ ...entryDataModals });

export const openModal = (key, newData = null) => {
    if (modals.hasOwnProperty(key)) {
        if (newData) {
            console.log(entryDataModals);
            modals[key] = { ...entryDataModals[key], ...newData };
        } else {
            console.log(entryDataModals);
            modals[key] = { ...entryDataModals[key] };
        }
        modals[key].isActive = true;
    }
};

export const closeModal = (key) => {
    if (modals.hasOwnProperty(key)) modals[key].isActive = false;
}

export function getModalData(key) {
    return computed(() => modals.hasOwnProperty(key) ? modals[key] : entryDataModals[key]);
}
