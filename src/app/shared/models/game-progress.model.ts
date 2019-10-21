import { IntroProgress } from './intro-progress.model';
import { SpeedProgress } from './speed-progress.model';
import { AccelerationProgress } from './acceleration-progress.model';
import { VectorProgress } from './vector-progress.model';

export interface GameProgress {
    intro: IntroProgress;
    speed: SpeedProgress;
    acceleration: AccelerationProgress;
    vector: VectorProgress;
}
