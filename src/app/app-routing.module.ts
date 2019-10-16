import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { InitialDataResolver } from './shared/resolvers/initial-data.resolver';
const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        resolve: {
            init: InitialDataResolver
        }
    },
    {
        path: 'learn',
        loadChildren: './learn-physics/learn-physics.module#LearnPhysicsModule',
        resolve: {
            init: InitialDataResolver
        }
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'top' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
