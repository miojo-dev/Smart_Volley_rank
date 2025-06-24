import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dtos/cratePlayer.dtos';
import { Player } from './interfaces/player.schema';

@Injectable()
export class PlayersService {

    private readonly players: Player[] = [];;
    
    constructor(@InjectModel(Player.name) private readonly playerModel: Model<Player>) {}

    private readonly logger = new Logger(PlayersService.name);
    
    async createRefreshPlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
        
        const{ email } = createPlayerDto;

        //const existingPlayer = this.players.find(player => player.email === email);

        const existingPlayer = await this.playerModel.findOne({email}).exec();

        if (existingPlayer) {
            await this.refreshPlayer(existingPlayer, createPlayerDto);
        }
        else {
            this.logger.log(`Creating new player with email ${email}`);
            await this.create(createPlayerDto);
        }
    }

    async getAllPlayers(): Promise<Player[]> {
        this.logger.log('Fetching all players');
        return await this.players;
    }
    async getAllPlayersByEmail(email: string): Promise<Player[]> {
        this.logger.log('Fetching all players');
        const existingPlayer = this.players.find(player => player.email === email);
        if (!existingPlayer) {
            throw new NotFoundException('Player not found');
        }
        return [existingPlayer];
    }

    private create(createPlayerDto: CreatePlayerDto): void {
        const {name, phone, email } = createPlayerDto;
        const player: Player = {
            name,
            phone,
            email,
            rank: 'Unranked',
            pfpUrl: 'https://example.com/default-pfp.png',
            position: this.players.length + 1, // Assign position based on current length of players array    
            
        };
        this.logger.log('Created new player', JSON.stringify(player));
        this.players.push(player);
    }

    private refreshPlayer(existingPlayerplayer: Player, createPlayerDto): void {
        const { name } = createPlayerDto;
        existingPlayerplayer.name = name;
    }
}
