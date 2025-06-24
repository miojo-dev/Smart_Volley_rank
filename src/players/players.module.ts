import { Module } from '@nestjs/common';
import { playersController } from './players.controller';
import { PlayersService } from './players.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './interfaces/player.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
       name:Player.name,
       schema: PlayerSchema
      }
    ])
  ],
  controllers: [playersController],
  providers: [PlayersService]
})
export class playersModule {}
