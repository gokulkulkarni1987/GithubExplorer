import {createStore, compose, applyMiddleware} from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const enhancers = compose(applyMiddleware(sagaMiddleware));
  let store = createStore(reducers, enhancers);
  sagaMiddleware.run(sagas);

  return {store};
}
