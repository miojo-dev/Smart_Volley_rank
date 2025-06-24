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

        const existingPlayer = await this.playerModel.findOne({email}).exec();

        if (existingPlayer) {
            await this.refresh(createPlayerDto);
        }
        else {
            this.logger.log(`Creating new player with email ${email}`);
            await this.create(createPlayerDto);
        }
    }

    async getAllPlayers(): Promise<Player[]> {
        this.logger.log('Fetching all players');
        return await this.playerModel.find().exec();
    }

    async getAllPlayersByEmail(email: string): Promise<Player[]> {

        this.logger.log('Fetching all players');

        const existingPlayer = this.players.find(player => player.email === email);

        if (!existingPlayer) {
            throw new NotFoundException('Player not found');
        }
        return [existingPlayer];
    }

    private async delete(email: string): Promise<any> {
        return await this.playerModel.findOneAndDelete({email}).exec();
    }

    private async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const createdPlayer = new this.playerModel(createPlayerDto);
        return await createdPlayer.save();
    }

    private async refresh(createPlayerDto): Promise<Player | null> {
        return await this.playerModel.findOneAndUpdate(
            {email: createPlayerDto.email}, 
            {$set: createPlayerDto},
            { new: true }
        ).exec();
    }
}
