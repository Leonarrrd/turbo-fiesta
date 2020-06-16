import { AlextivityGame } from './AlextivityGame';

export class Room {
    id: number;
    creator: string;
    participants: string[];
    game: AlextivityGame = new AlextivityGame();
    // game: 'hello';
    constructor(){}
}
