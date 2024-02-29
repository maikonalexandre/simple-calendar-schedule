import { app } from './app'
import { env } from './src/env'

app.listen({ host: '0.0.0.0', port: env.PORT }).then((address) => {
  console.log(`✅ Server is running in port: ${address}`)
})
