import { loginPath, signUpPath, storesPath, transactionsPath, persistPath } from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/stores': storesPath,
  '/transactions/{storeId}': transactionsPath,
  '/persist': persistPath
}
