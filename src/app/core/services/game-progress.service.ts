import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { GameProgress } from 'src/app/shared/models/game-progress.model';
import { InitialGameProgressData } from 'src/app/shared/data/initial-game-progress.data';

@Injectable({
    providedIn: 'root'
})
export class GameProgressService {

    private GAME_PROGRESS_NAME = 'gameProgress';
    private gameProgress$: BehaviorSubject<GameProgress> = new BehaviorSubject(null);

    constructor(private localStorageService: LocalStorageService) { }

    init(): void {
        return Observable.create(observer => {
            this.initializeProgressData();
            observer.next(null);
            observer.complete();
        });
    }

    getGameProgress$(): Observable<GameProgress> {
        return this.gameProgress$;
    }

    getGameProgress(): GameProgress {
        return this.gameProgress$.getValue();
    }

    updateProgress(gameProgress: GameProgress): void {
        this.localStorageService.setItem('gameProgress', gameProgress);
        this.gameProgress$.next(gameProgress);
    }

    private initializeProgressData(): void {
        const gameProgress = this.localStorageService.getItem(this.GAME_PROGRESS_NAME);
        if (gameProgress) {
            this.gameProgress$.next(gameProgress);
        } else {
            this.gameProgress$.next({ ...InitialGameProgressData });
            this.localStorageService.setItem(this.GAME_PROGRESS_NAME, InitialGameProgressData);
        }
    }

}
