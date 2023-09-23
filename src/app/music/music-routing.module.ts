import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicAlbumCounterComponent } from '../music-album-counter/music-album-counter.component';
import { AddMusicComponent } from '../add-music/add-music.component';
import { EditMusicComponent } from '../edit-music/edit-music.component';
import { MusicDetailsComponent } from '../music-details/music-details.component';

const routes: Routes = [
  { path: '', component: MusicAlbumCounterComponent, pathMatch: 'full' },
  { path: 'add', component: AddMusicComponent },
  { path: 'edit/:id', component: EditMusicComponent },
  { path: ':id', component: MusicDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
