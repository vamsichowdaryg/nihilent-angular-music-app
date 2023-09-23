import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicRoutingModule } from './music-routing.module';
import { MusicComponent } from './music.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { AddMusicComponent } from '../add-music/add-music.component';
import { EditMusicComponent } from '../edit-music/edit-music.component';
import { LikeDislikeCounterComponent } from '../like-dislike-counter/like-dislike-counter.component';
import { MusicAlbumCounterComponent } from '../music-album-counter/music-album-counter.component';
import { MusicDetailsComponent } from '../music-details/music-details.component';
import { MusicPageComponent } from '../music-page/music-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStarRatingModule } from 'ngx-star-rating';
// import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  declarations: [
    MusicComponent,
    AddMusicComponent,
    EditMusicComponent,
    LikeDislikeCounterComponent,
    MusicAlbumCounterComponent,
    MusicDetailsComponent,
    MusicPageComponent
  ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    NgxStarRatingModule,
    MatRadioModule,
    MatSelectModule
  ]
})
export class MusicModule { }
