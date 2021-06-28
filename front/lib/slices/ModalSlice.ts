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
      console.log("떠라떠라떠라 제발ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ", action.payload);
      state.show = true;
      state.modalList = action.payload;
    },
    /* Modal OFF */
    deleteModal(state) {
      state.show = false;
      state.modalList = null;
    },
    clearModal(state) {
      state.show = false;
      state.modalList = null;
    },
  },
});

export const { popModal, deleteModal, clearModal } = ModalSlice.actions;

export default ModalSlice.reducer;
