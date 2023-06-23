import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IRootReducer } from "@/types";

const hydrate = createAction(HYDRATE);

const initialState: IRootReducer = {
  conversations: [],
  conversationActive: null,
  menuOpen: false,
};

export const root = createSlice({
  name: "root",
  initialState: initialState,
  reducers: {
    updateConversation(state, action) {
      state.conversations = action.payload;
    },

    setConversationActive(state, action) {
      state.conversationActive = action.payload;
    },
    setMenuOpen(state, action) {
      state.menuOpen = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state) => {
      return {
        ...state,
      };
    });
  },
});

const { actions, reducer } = root;

export const { updateConversation, setConversationActive, setMenuOpen } =
  actions;

export default reducer;
