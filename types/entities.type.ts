export interface IPlayer {
  playerId: number;
  name: string;
  health: number;
  strength: number;
  attack: number;
}
export interface IResult {
  winner: number;
  looser: number;
}
export interface IArena {
  total_players: number;
  hasPlayer(playerId: number): boolean;
  getPlayersCount(): number;
  addNewPlayer(
    name: string,
    health: number,
    strength: number,
    attack: number
  ): number;
  eliminatePlayer(id: number): void;
  showPlayers(): void;
  play(id_first_player: number, id_second_player: number): number | IResult;
}
