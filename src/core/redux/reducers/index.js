// Imports: Dependencies
import {combineReducers} from 'redux';

// Imports: Reducers
import authReducer from '@reducers/authReducer';
import customerReducer from '@reducers/customerReducer';
import productReducer from '@reducers/productReducer';
import orderReducer from '@reducers/orderReducer';
// Redux: Root Reducer
const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  product: productReducer,
  order: orderReducer,
});

// Exports
export default rootReducer;
