import { Module } from '@nestjs/common';
import { playersModule } from './players/players.module';

@Module({
  imports: [playersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
