import { createSlice } from "@reduxjs/toolkit";
import { IModal } from "@typings/db";

const initialState: IModal = {
  modalList: {
    title: "",
  },
  show: false,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    /* Modal pop */
    popModal(state, action) {
      state.show = true;
      state.modalList = action.payload;
    },
    /* Modal OFF */
    deleteModal(state) {
      state.show = false;
      state.modalList = null;
    },
  },
});

export const { popModal, deleteModal } = ModalSlice.actions;

export default ModalSlice.reducer;
