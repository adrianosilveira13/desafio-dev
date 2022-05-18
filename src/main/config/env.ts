export default {
  postgresUrl: process.env.POSTGRES_URL || 'http://localhost',
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET || 'asUFG978T(&*%'
}
