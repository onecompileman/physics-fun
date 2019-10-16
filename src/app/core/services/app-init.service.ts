import { Injectable } from '@angular/core';
import { GameProgressService } from './game-progress.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppInitService {

    constructor(private gameProgressService: GameProgressService) { }

    preload(): void { }

    init(): any | Promise<any> | Observable<any> {
        return this.gameProgressService.init();
    }
}
