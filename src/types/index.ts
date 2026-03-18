/**
 * Application screen types for the game flow
 */
export enum ScreenType {
  WELCOME = 'WELCOME',
  SETUP = 'SETUP',
}

export type Screen = ScreenType

/**
 * Room environment/visual style options for the game
 */
export enum RoomEnvironment {
  MIDNIGHT_MANSION = 'MIDNIGHT_MANSION',
  FOGGY_HARBOR = 'FOGGY_HARBOR',
  CRIMSON_LOUNGE = 'CRIMSON_LOUNGE',
}

/**
 * Role card style/aesthetic options
 */
export enum RoleCardStyle {
  VINTAGE_SKETCH_ART = 'VINTAGE_SKETCH_ART',
  NEON_NOIR = 'NEON_NOIR',
  CLASSIC_PORTRAITS = 'CLASSIC_PORTRAITS',
}

/**
 * Game settings configured in the setup wizard
 */
export interface GameSettings {
  totalPlayers: number
  mafiaCount: number
  detectiveEnabled: boolean
  doctorEnabled: boolean
  roomEnvironment: RoomEnvironment
  roleCardStyle: RoleCardStyle
}

/**
 * Default game settings for new games
 */
export const DEFAULT_GAME_SETTINGS: GameSettings = {
  totalPlayers: 6,
  mafiaCount: 2,
  detectiveEnabled: true,
  doctorEnabled: true,
  roomEnvironment: RoomEnvironment.MIDNIGHT_MANSION,
  roleCardStyle: RoleCardStyle.VINTAGE_SKETCH_ART,
}
