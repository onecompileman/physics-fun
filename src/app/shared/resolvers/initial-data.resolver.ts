import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GameProgress } from '../models/game-progress.model';
import { AppInitService } from 'src/app/core/services/app-init.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InitialDataResolver implements Resolve<GameProgress> {
    constructor(private appInitService: AppInitService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.appInitService.init();
    }
}
