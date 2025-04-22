import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { config } from "src/config";

@Module({
  imports: [
    JwtModule.register({
      secret: config.jwt_token,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  exports: [JwtModule],
})
export class JwtCoreModule {}
