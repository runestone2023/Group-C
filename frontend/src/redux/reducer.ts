import { Reducer, combineReducers } from "redux";

const rootReducer = combineReducers({});

export type RootState = ReturnType<typeof rootReducer>;

const reducer: Reducer<RootState, any> = (
  state: RootState | undefined,
  action: any
) => rootReducer(state, action);

export default reducer;
