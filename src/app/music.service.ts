import { Injectable } from '@angular/core';
import { Music } from './app.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MusicService {
  updateMusic(updatedMusic: Music) {

    {
      const id = updatedMusic.id;
      return this.http.put(
        `https://650dc568a8b42265ec2cae6f.mockapi.io/music/${id}`,
        updatedMusic
      );
    }
  }
  constructor(private http: HttpClient) { }

  getMusicById(id: string) {
    return this.http.get<Music>(
      `https://650dc568a8b42265ec2cae6f.mockapi.io/music/${id}`
    );
  }
  deleteMusicById(id: string) {
    return this.http.delete<Music>(
      `https://650dc568a8b42265ec2cae6f.mockapi.io/music/${id}`
    );
  }
  getMusicListFromMockAPI() {
    return this.http.get<Music[]>(
      `https://650dc568a8b42265ec2cae6f.mockapi.io/music`
    );
  }
  addMusic(newMusic: Music) {
    return this.http.post(`https://650dc568a8b42265ec2cae6f.mockapi.io/music`,
      newMusic);
  }

  musiclist: Array<Music> = []
  // constructor() { }
  getMusicList() {
    return this.musiclist;
  }
  setMusicList(newMusic: Music) {
    this.musiclist.push(newMusic);
  }
  searchMusicList(songname: string) {
    return this.http.get<Music[]>(
      `https://650dc568a8b42265ec2cae6f.mockapi.io/music?songname=${songname}`
    );
  }
}
