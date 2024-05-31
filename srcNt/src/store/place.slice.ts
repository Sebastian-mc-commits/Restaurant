import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import PlaceModel from "../../models/places";

interface PlaceState {
  places: PlaceModel[]
}
const initialState: PlaceState = {
  places: []
}

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    addPlace: (state, action: PayloadAction<PlaceModel>) => {
      const { id, title } = action.payload
      state.places.push(new PlaceModel(id, title))
    }
  }
})

export const { addPlace } = placeSlice.actions
export default placeSlice.reducer
