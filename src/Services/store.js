import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import productSlice  from './Reducers/productReducer'
import singleProductSlice from './Reducers/singleProductReducer'
import wishlistSlice from './Reducers/wishlistReducer'
import cartlistSlice from '../lib/features/cartReducer/index'
import authSlice from '../lib/features/authReducer/index'
import purchasedSlice from '../lib/features/purchasedReducer/index'

const persistConfig = {
    key: 'root',
    storage,
}

export default configureStore({
  reducer: {
    productReducer:productSlice,
    singleProductReducer:singleProductSlice,
    wishlistReducer:wishlistSlice,
    cartlistReducer:cartlistSlice,
    authReducer:authSlice,
    purchasedReducer:purchasedSlice
  },
})


