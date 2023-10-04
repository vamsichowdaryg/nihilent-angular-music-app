import { Injectable } from '@angular/core';
import { Music } from './app.component';
import { HttpClient, HttpParams } from '@angular/common/http';
const API = `https://650dc568a8b42265ec2cae6f.mockapi.io/music`;
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
    // return this.http.delete<Music>(
    //   `https://650dc568a8b42265ec2cae6f.mockapi.io/music/${id}`
    // );
    return this.http.delete<Music>(`${API}/${id}`);
  }
  getMusicListFromMockAPI() {
    // return this.http.get<Music[]>(
    //   `https://650dc568a8b42265ec2cae6f.mockapi.io/music`
    // );
    return this.http.get<Music[]>(API);
  }
  addMusic(newMusic: Music) {
    // return this.http.post(`https://650dc568a8b42265ec2cae6f.mockapi.io/music`,
    //   newMusic);
    return this.http.post(`${API}`, newMusic);
  }
  // getMusicListPagination(page: number, limit: number, searchTerm?: string) {
  //   let url = `${API}?limit=${limit}&page=${page}`;
  //   if (searchTerm) {
  //     url += `&search=${searchTerm}`;
  //   }

  //   return this.http.get<Music[]>(url);
  // }
  getMusicListPagination(
    page: number,
    limit: number,
    search: string = '',
    sortBy: string = '',
    order = ''
  ) {
    let params = new HttpParams()
      .set('limit', limit)
      .set('page', page)
      .set('search', search)
      .set('sortBy', sortBy)
      .set('order', order);

    return this.http.get<Music[]>(API, { params });
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
    // return this.http.get<Music[]>(
    //   `https://650dc568a8b42265ec2cae6f.mockapi.io/music?songname=${songname}`
    // );
    return this.http.get<Music[]>(`${API}?songname=${songname}`);
  }
}
