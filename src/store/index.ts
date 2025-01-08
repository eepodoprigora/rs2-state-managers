import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  AnyAction,
} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk"; // Импорт по умолчанию

import { contactReducer, favoriteReducer, groupReducer } from "./reducers";
import { apiMiddleware } from "./middlewares/apiMiddleware";

import { ContactsState } from "./reducers/contactReducer";
import { FavoriteState } from "./reducers/favouriteReducer";
import { GroupState } from "./reducers/groupReducer";

export interface RootState {
  contacts: ContactsState;
  favorites: FavoriteState;
  groups: GroupState;
}

const rootReducer = combineReducers({
  contacts: contactReducer,
  favorites: favoriteReducer,
  groups: groupReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, apiMiddleware))
);

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
