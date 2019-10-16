export interface IntroProgress {
    animation: {
        enabled: boolean;
        activities: {
            bubble: boolean,
            particleSystem: boolean
        }
    };
    games: {
        enabled: boolean;
        activities: {
            flappyBird: boolean,
            catchTheApple: boolean,
            pong: boolean
        }
    };
}

