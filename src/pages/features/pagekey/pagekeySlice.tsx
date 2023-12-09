import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  page_key: string
}

const initialState: CounterState = {
  page_key: '1',
}


export const pagekeySlice = createSlice({
  name: 'page_key',
  initialState,
  reducers: {
    handleSearchValue: (state,action: PayloadAction<string>) => {
           state.page_key= action.payload as CounterState['page_key'];
    },
  },
})


// Action creators are generated for each case reducer function
export const { handleSearchValue } = pagekeySlice.actions

export default pagekeySlice.reducer


