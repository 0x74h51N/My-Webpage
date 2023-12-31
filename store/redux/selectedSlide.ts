import { slide } from "@/app/common.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SelectedSlideState {
  selectedSlide: slide | undefined;
  slideSelected: boolean | undefined;
}

const initialState: SelectedSlideState = {
  selectedSlide: undefined,
  slideSelected: undefined,
};

const selectedSlideSlice = createSlice({
  name: "selectedSlide",
  initialState,
  reducers: {
    setSlide: (state, action: PayloadAction<slide>) => {
      state.selectedSlide = action.payload;
      state.slideSelected = true;
    },
    clearSlide: (state) => {
      state.selectedSlide = undefined;
      state.slideSelected = false;
    },
  },
});

export const { setSlide, clearSlide } = selectedSlideSlice.actions;
export default selectedSlideSlice.reducer;
