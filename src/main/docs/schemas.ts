import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  signupParamsSchema,
  storesSchema,
  transactionSchema,
  transactionsSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema,
  error: errorSchema,
  transactions: transactionsSchema,
  transaction: transactionSchema,
  stores: storesSchema
}
