import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/cratePlayer.dtos';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.schema';

@Controller('api/v1/players')
export class playersController {

    constructor(private readonly playersService: PlayersService) {}

    @Post()
    async createRefreshPlayer(
        @Body() createPlayerDto: CreatePlayerDto, ) {
            await this.playersService.createRefreshPlayer(createPlayerDto);
            const { phone, email, name } = createPlayerDto;
            return ({
            "E-Mail": email,
            "Phone": phone,
            "Name": name
        })
    }

    @Get()
    async getPlayers(@Query('email') email: string): Promise<Player[] | Player> {
        if (email) {
            return await this.playersService.getAllPlayersByEmail(email);
        } else {
            return await this.playersService.getAllPlayers();
        }
    }
}