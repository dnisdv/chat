import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from 'redux'
import thunk from "redux-thunk";
import UserReducer from './user/reducer'
import DialogReducer from './dialogs/reducer'
import MessagesReducer from './messages/reducer'

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleware = [thunk];

const rootReducer = combineReducers({
  user: UserReducer,
  dialog: DialogReducer,
  message: MessagesReducer
})
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);



export default store;

export type RootState = ReturnType<typeof rootReducer>

