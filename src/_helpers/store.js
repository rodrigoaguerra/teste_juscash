import { createStore, applyMiddleware, compose } from 'redux';
import { thunk }from 'redux-thunk';
import rootReducer from './reducers';

const configureStore = () => {
  let store = createStore(rootReducer, applyMiddleware(thunk));

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      let store = createStore(
        rootReducer,
        compose(
          applyMiddleware(thunk),
          window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__()
            : (f) => f
        )
      );
      module.hot.accept('./reducers.js', () => {
        store.replaceReducer(rootReducer);
      });
      return store;
    }
  }

  return store;
};

export default configureStore();