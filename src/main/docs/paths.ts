import { loginPath, signUpPath, storesPath, transactionsPath } from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/stores': storesPath,
  '/transactions/{storeId}': transactionsPath
}
