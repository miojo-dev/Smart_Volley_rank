import { Module } from '@nestjs/common';
import { playersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:mongo@localhost:27017/nestjs-players?authSource=admin&directConnection=true'),
    playersModule],
  controllers: [],
  providers: []
})
export class AppModule {}
