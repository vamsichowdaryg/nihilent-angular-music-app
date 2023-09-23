import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AddMusicComponent } from './add-music/add-music.component';
import { EditMusicComponent } from './edit-music/edit-music.component';
import { MusicAlbumCounterComponent } from './music-album-counter/music-album-counter.component';
import { MusicDetailsComponent } from './music-details/music-details.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: WelcomePageComponent },
  // { path: 'music', component: MusicAlbumCounterComponent },
  // { path: 'add ', component: AddMusicComponent },
  // { path: 'edit/:id', component: EditMusicComponent },
  // { path: 'music/:id', component: MusicDetailsComponent },
  { path: 'music', loadChildren: () => import('./music/music.module').then(m => m.MusicModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
