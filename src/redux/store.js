import { createStore } from 'redux';
import rootReducer from './reducers'; // ваш корневой редюсер

const store = createStore(rootReducer);

export default store