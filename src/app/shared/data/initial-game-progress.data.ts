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
    },
    speed: {
        enabled: false,
        activities: {
            activity1: true,
            activity2: false
        }
    },
    acceleration: {
        enabled: false,
        activities: {
            activity1: true
        }
    },
    vector: {
        enabled: false,
        activities: {
            activity1: true
        }
    }
});
