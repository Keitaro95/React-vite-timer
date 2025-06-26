import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface EditState {
    isEditing: boolean,
    inputValue: string,
};

const initialState: EditState = {
    isEditing: false,
    inputValue: '',
};

const editSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        startEdit(state, action: PayloadAction<number>) {
            state.isEditing = true;
            state.inputValue = action.payload.toString();
        },
        updateInput(state, action: PayloadAction<string>) {
            state.inputValue = action.payload;
        },
        cancelEdit(state) {
            state.isEditing = false;
        },
    },
});

export const { startEdit, updateInput, cancelEdit } = editSlice.actions;
export default editSlice.reducer;