import { composeWithDevTools } from "@redux-devtools/extension";
import { Store, applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducer, { RootState } from "./reducer";

const logger = createLogger({
  collapsed: true,
  colors: {
    title: () => "#139BFE",
    prevState: () => "#1C5FAF",
    action: () => "#149945",
    nextState: () => "#A47104",
    error: () => "#ff0005",
  },
  titleFormatter: (action) => `ACTION: ${action.type}`,
});

const middlewares = composeWithDevTools(applyMiddleware(thunk, logger));
const store: Store<RootState, any> = createStore(reducer, middlewares);

export type AppDispatch = typeof store.dispatch;

export default store;
