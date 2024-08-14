import { ReadWriteBaseClient } from '../client/ReadWriteBaseClient';
import {
    Album as AlbumDetails,
    Albums as AlbumsDetails,
    AlbumTracks,
    GetTrackParams as GetMarketParams,
    OptionalUserSavedTrackParams as OptionalAlbumParams,
    PagedAlbums,
    PaginationParams,
    UserSavedAlbum
} from '../types';
import { joinIdsArrayToString } from '../utils';

export class Album extends ReadWriteBaseClient {
    /**
     * Get Spotify catalog information for a single album.
     * https://developer.spotify.com/documentation/web-api/reference/get-an-album
     */
    getAlbum(albumId: string, optionalParams?: GetMarketParams) {
        return this.get<AlbumDetails>(`/albums/${albumId}`, optionalParams);
    }

    /**
     * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
     * https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums
     */
    getAlbums(albumIds: string[], optionalParams?: GetMarketParams) {
        return this.get<AlbumsDetails>(`/albums`, {albumIds: joinIdsArrayToString(albumIds), ...optionalParams})
    }

    /**
     * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
     * https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks
     */
    getAlbumTracks(albumId: string, optionalParams?: OptionalAlbumParams) {
        return this.get<AlbumTracks>(`/albums/${albumId}/tracks`, optionalParams);
    }

    /**
     * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
     * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-albums
     */
    getUsersSavedAlbum(optionalParams?: OptionalAlbumParams){
        return this.get<UserSavedAlbum>(`/me/albums`, optionalParams);
    }

    /**
     * Save one or more albums to the current user's 'Your Music' library.
     * https://developer.spotify.com/documentation/web-api/reference/save-albums-user
     */
    saveAlbumsforCurrentUser(albumIds: string[]) {
        return this.put(`/me/albums`, {albumIds: joinIdsArrayToString(albumIds)});
    }

    /**
     * Remove one or more albums from the current user's 'Your Music' library.
     * https://developer.spotify.com/documentation/web-api/reference/remove-albums-user
     */
    removeUsersSavedAlbum(albumIds: string[]) {
        return this.delete(`/me/albums`, {albumIds: joinIdsArrayToString(albumIds)});
    }

    /**
     * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
     * https://developer.spotify.com/documentation/web-api/reference/check-users-saved-albums
     */
    checkUsersSavedAlbums(albumIds: string[]) {
        return this.get<Array<boolean>>(`/me/albums/contains`, { albumIds: joinIdsArrayToString(albumIds) });
    }

    /**
     * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
     * https://developer.spotify.com/documentation/web-api/reference/get-new-releases
     */
    getNewReleases(optionalParams?: PaginationParams) {
        return this.get<PagedAlbums>(`/broese/new-releases`, optionalParams);
    }
}