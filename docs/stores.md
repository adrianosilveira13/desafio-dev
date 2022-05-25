# Stores

> ## Success

1. ✅ Receives a **GET** request on **/api/stores**
2. ✅ Validate if the user provided a valid access token
3. ✅ Retruns **200** with an array of valid stores

> ## Exception

1. ✅ Returns a **404** error if there is no stores
2. ✅ Returns a **403** error if user doesn't provid an access token
3. ✅ Returns a **500** error if something goes wrong when trying to access data
