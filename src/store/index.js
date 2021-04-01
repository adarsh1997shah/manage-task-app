import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers';

const store = createStore(reducer);

function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
