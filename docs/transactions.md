# Stores

> ## Success

1. ✅ Receives a **GET** request on **/api/transactions/:store-id**
2. ✅ Validate if the provided store id exists
3. ✅ Retruns **200** with an array of transactions

> ## Exception

1. ✅ Returns a **404** error if there is no transactions
2. ✅ Returns a **403** error if user doesn't provid an access token
3. ✅ Returns a **500** error if something goes wrong when trying to access data
