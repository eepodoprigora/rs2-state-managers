import { Middleware, Dispatch, AnyAction } from "redux";
import { ActionType } from "../actions";

export const apiMiddleware: Middleware<{}, any, Dispatch<AnyAction>> =
  (store) => (next) => (action: unknown) => {
    const typedAction = action as ActionType;
    console.log("Dispatching action:", typedAction);
    next(typedAction);
  };
