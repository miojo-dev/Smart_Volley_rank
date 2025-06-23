import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/cratePlayer.dtos';


@Controller('api/v1/players')
export class playersController {

    @Post()
    async createRefreshPlayer(
        @Body() createPlayerDto: CreatePlayerDto, ) {
        const { phone, email, name } = createPlayerDto;
            return ({
            "E-Mail": email,
            "Phone": phone,
            "Name": name
        })
    }
}