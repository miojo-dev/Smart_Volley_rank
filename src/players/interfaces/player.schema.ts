import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type PlayerDocument = HydratedDocument<Player>;

@Schema({
    timestamps:true,
    collection: 'players'
})
export class Player {
    @Prop({ unique: true })
    phone: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    name: string;

    @Prop()
    rank: string;

    @Prop()
    pfpUrl: string;

    @Prop()
    position: number;


    @Prop({ default: Date.now})
    createdAt?: Date;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);

