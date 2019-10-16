import { GameProgress } from '../models/game-progress.model';

export const InitialGameProgressData: GameProgress = Object.freeze({
    intro: {
        animation: {
            enabled: true,
            activities: {
                bubble: true,
                particleSystem: false
            }
        },
        games: {
            enabled: false,
            activities: {
                flappyBird: false,
                catchTheApple: false,
                pong: false
            }
        }
    }
});
