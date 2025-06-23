import { Module } from '@nestjs/common';
import { playersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  controllers: [playersController],
  providers: [PlayersService]
})
export class playersModule {}
