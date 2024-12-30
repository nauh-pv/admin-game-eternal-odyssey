import {
  Config,
  Identity,
  PageManager,
  Procedure,
} from "@/shared/types/commonTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListState {
  listProcedure: Procedure[];
  listIdentity: Identity[];
  listConfig: Config[];
  listPage: PageManager[];
}

const initialState: ListState = {
  listProcedure: [],
  listIdentity: [],
  listConfig: [],
  listPage: [],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setListProcedure(state, action: PayloadAction<Procedure[]>) {
      state.listProcedure = action.payload;
    },
    setListIdentity(state, action: PayloadAction<Identity[]>) {
      state.listIdentity = action.payload;
    },
    setListConfig(state, action: PayloadAction<Config[]>) {
      state.listConfig = action.payload;
    },
    setListPageManager(state, action: PayloadAction<PageManager[]>) {
      state.listPage = action.payload;
    },
  },
});

export const {
  setListProcedure,
  setListIdentity,
  setListConfig,
  setListPageManager,
} = listSlice.actions;
export default listSlice.reducer;
