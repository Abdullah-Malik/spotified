import {
    OptionalPlaylistParams ,
    Playlist as PlaylistDetails,
    
} from '../types';
import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';

export class Playlist extends ReadWriteBaseClient {
    /**
     * Get a playlist owned by a Spotify user.
     * https://developer.spotify.com/documentation/web-api/reference/get-playlist
     */
    getPlaylist(playlist_id: string, optionalParams?: OptionalPlaylistParams) {
        this.get<PlaylistDetails>(`/playlists/${playlist_id}`, optionalParams);
    }


}