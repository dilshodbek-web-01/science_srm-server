import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app"
import { appConfig } from "./config"

setImmediate(async () => {

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*'
    }
  })

  await app.listen(appConfig.port)

})
