# Playlist Class

This class provides methods to interact with the Spotify Web API and retrieve information about playlist.

## Methods

### getPlaylist(playlistId: string, optionalParams?: GetPlaylistOptionalParams)

This method is used to get a playlist owned by a Spotify user.

#### Endpoint: [/playlists/{playlistId}](https://developer.spotify.com/documentation/web-api/reference/get-playlist)

#### Parameters:
- `playlistId` (required): A string representing the Spotify ID of the playlist.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".
  - `fields`: A comma-separated list of the fields to return.
  - `additional_types`: A comma-separated list of item types that your client supports.

#### Returns: `Playlist`

The `Playlist` interface extends `SimplifiedPlaylist` and is defined as follows:
- `collaborative`: (Optional) A boolean
- `description`: (Optional) A string 
- `external_urls`: (Optional) An `ExternalUrls` object
- `href`: (Optional) A string
- `id`: (Optional) A string
- `images`: (Optional) An array of Images
- `name`: (Optional) A string
- `owner`: (Optional) A Owner
- `public`: (Optional) A boolean
- `snapshot_id`: (Optional) A string
- `tracks`: (Optional) An array of `PlaylistTrack` object which extends PaginationResponseProps 
- `type`: (Optional) A string
- `uri`: (Optional) A string
- `followers`: (Optional) A `Followers` object

#### Example

```typescript
const playlist = await client.playlist.getPlaylist('playlistId', { market: 'US', fields: 'name,owner,tracks.total' });
console.log(playlist.name);
console.log(playlist.owner.display_name);
console.log(`Total tracks: ${playlist.tracks.total}`);
```

### changePlaylistDetails(playlistId: string, optionalParams?: ChangePlaylistDetailsOptionalParams)

This method is used to change a playlist's name and public/private state. The user must own the playlist.

#### Endpoint: [/playlists/{playlistId}](https://developer.spotify.com/documentation/web-api/reference/change-playlist-details)

#### Parameters:
- `playlistId` (required): A string representing the Spotify ID of the playlist.
- `optionalParams` (optional): An object containing optional parameters:
  - `name`: The new name for the playlist.
  - `public`: A boolean indicating whether the playlist is public.
  - `collaborative`: A boolean indicating whether the playlist is collaborative.
  - `description`: A string representing the new description for the playlist.


#### Returns: This endpoint does not return any data.

#### Example

```typescript
await client.playlist.changePlaylistDetails('playlistId', { name: 'New Playlist Name', public: false });
console.log('Playlist details updated successfully');
```

### getPlaylistItems(playlistId: string, optionalParams?: GetPlaylistItemsOptionalParams)

This method is used to get full details of the items of a playlist owned by a Spotify user.

#### Endpoint: [/playlists/{playlistId}/tracks](https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks)

#### Parameters: 
- `playlistId` (required): A string representing the Spotify ID of the playlist.
- `optionalParams` (optional): An object containing optional parameters:
  - `market`: An ISO 3166-1 alpha-2 country code or the string "from_token".
  - `fields`: A comma-separated list of the fields to return.
  - `additional_types`: A comma-separated list of item types that your client supports.
  - `limit`: The maximum number of items to return.
  - `offset`: The index of the first item to return.

#### Returns: `PlaylistItems`

The `PlaylistItems` interface extends `PaginationResponseProps` and is defined as follows:
- `href`: A string URL
- `limit`: A number
- `next`: A string URL
- `offset`: A number
- `previous`: A string URL
- `total`: A number representing the total number of saved tracks
- `items`: An array of `PlaylistTrack` objects

#### Example

```typescript
const playlistItems = await client.playlist.getPlaylistItems('playlistId', { limit: 50, offset: 0 });
console.log(`Total tracks: ${playlistItems.total}`);
playlistItems.items.forEach(item => {
    console.log(`${item.track?.name} added by ${item.added_by?.display_name}`);
});
```

### updatePlaylistItems(playlistId: string, optionalParams?: UpdatePlaylistItemsOptionalParams)

This method is used to either reorder or replace items in a playlist depending on the request's parameters.

#### Endpoint: [/playlists/{playlistId}/tracks](https://developer.spotify.com/documentation/web-api/reference/reorder-or-replace-playlists-tracks)

#### Parameters:
- `playlistId` (required): A string representing the Spotify ID of the playlist.
- `uris` (optional): A array of strings of Spotify URIs to set, can be track or episode URIs
- `optionalParams` (optional): An object containing optional parameters:
  - `uris`: An array of strings representing the URIs of the items to include in the playlist.
  - `range_start`: The position of the first item to be reordered.
  - `insert_before`: The position where the items should be inserted.
  - `range_length`: The number of items to be reordered.
  - `snapshot_id`: A string representing the playlist snapshot to modify.

#### Returns: ``

#### Example

```typescript
const response = await client.playlist.updatePlaylistItems('playlistId', {
  uris: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'],
  range_start: 0,
  insert_before: 5,
  range_length: 1,
  snapshot_id: 'abc123',
});
console.log(`New snapshot ID: ${response.snapshot_id}`);
```

### addItemsToPlaylist(playlistId: string, optionalParams: AddItemsToPlaylistOptionalParams)

This method is used to add one or more items to a user's playlist.

#### Endpoint: [/playlists/{playlistId}/tracks](https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist)

#### Parameters:
- `playlistId` (required): A string representing the Spotify ID of the playlist.
- `optionalParams` (optional): An object containing optional parameters:
  - `uris`: An array of strings representing the URIs of the items to add to the playlist.
  - `position`: The position to insert the items; if omitted, the items are added to the end of the playlist.

#### Returns: ``

#### Example

```typescript
const response = await client.playlist.addItemsToPlaylist('playlistId', {
  uris: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh'],
  position: 0,
});
console.log(`New snapshot ID: ${response.snapshot_id}`);
```

### removePlaylistItems(playlistId: string, bodyParams: RemovePlaylistItemsParams)

This method is used to remove one or more items from a user's playlist.

#### Endpoint: [/playlists/{playlistId}/tracks](https://developer.spotify.com/documentation/web-api/reference/remove-tracks-playlist)

#### Parameters:
- `playlistId` (required): A string representing the Spotify ID of the playlist.
- `bodyParams` (required): An object containing the parameters:
  - `tracks`: An array of objects, each containing a `uri` of the track to remove.
  - `snapshot_id`: (optional) A string representing the playlist snapshot to modify.

#### Returns: ``

#### Example

```typescript
const response = await client.playlist.removePlaylistItems('playlistId', {
  tracks: [{ uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh' }],
  snapshot_id: 'abc123',
});
console.log(`New snapshot ID: ${response.snapshot_id}`);
```

### getCurrentUserPlaylists(optionalParams?: GetUserSavedPlaylistsOptionalParams)

This method is used to get a list of the playlists owned or followed by the current Spotify user.

#### Endpoint: [/me/playlists](https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists)

#### Parameters:
- `optionalParams` (optional): An object containing optional parameters:
  - `limit`: The maximum number of items to return.
  - `offset`: The index of the first item to return.

#### Returns: ``

#### Example

```typescript
const userPlaylists = await client.playlist.getCurrentUserPlaylists({ limit: 50, offset: 0 });
console.log(`Total playlists: ${userPlaylists.total}`);
userPlaylists.items.forEach(playlist => {
    console.log(`${playlist.name} by ${playlist.owner.display_name}`);
    console.log(`Total tracks: ${playlist.tracks.total}`);
});
```

### getUserPlaylists(userId: string, optionalParams?: GetUserSavedPlaylistsOptionalParams)

This method is used to get a list of the playlists owned or followed by a Spotify user.

#### Endpoint: [/users/{userId}/playlists](https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists)

#### Parameters:
- `userId` (required): A string representing the Spotify ID of the user.
- `optionalParams` (optional): An object containing optional parameters:
  - `limit`: The maximum number of items to return.
  - `offset`: The index of the first item to return.

#### Returns: ``

#### Example

```typescript
const userPlaylists = await client.playlist.getUserPlaylists('userId', { limit: 50, offset: 0 });
console.log(`Total playlists: ${userPlaylists.total}`);
userPlaylists.items.forEach(playlist => {
    console.log(`${playlist.name} by ${playlist.owner.display_name}`);
    console.log(`Total tracks: ${playlist.tracks.total}`);
});
```

### createPlaylist(userId: string, playlistName: string, optionalParams: CreatePlaylistOptionalParams)

This method is used to create a playlist for a Spotify user.

#### Endpoint: [/users/{userId}/playlists](https://developer.spotify.com/documentation/web-api/reference/create-playlist)

#### Parameters:
- `userId` (required): A string representing the Spotify ID of the user.
- `playlistName` (required): A string representing the name of the playlist to be created.
- `optionalParams` (optional): An object containing optional parameters:
  - `public`: A boolean indicating whether the playlist should be public.
  - `collaborative`: A boolean indicating whether the playlist should be collaborative.
  - `description`: A string representing the description of the playlist.

#### Returns: ``

#### Example

```typescript
const newPlaylist = await client.playlist.createPlaylist('userId', 'New Playlist', {
  public: false,
  collaborative: true,
  description: 'A new collaborative playlist',
});
console.log(`Created playlist: ${newPlaylist.name}`);
```

### getFeaturedPlaylist(optionalParams?: GetFeaturedPlaylistOptionalParams)

This method is used to get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).

#### Endpoint: [/browse/featured-playlists](https://developer.spotify.com/documentation/web-api/reference/get-featured-playlists)

#### Parameters:
- `optionalParams` (optional): An object containing optional parameters:
  - `locale`: The desired language of the result.
  - `limit`: The maximum number of items to return.
  - `offset`: The index of the first item to return.

#### Returns: ``

#### Example



### getCategoryPlaylist(categoryId: string, optionalParams?: GetCategoryPlaylistOptionalParams)

This method is used to get a list of Spotify playlists tagged with a particular category.

#### Endpoint: [/browse/categories/{category_id}/playlists](https://developer.spotify.com/documentation/web-api/reference/get-a-categories-playlists)

#### Parameters:
- `categoryId` (required): A string representing the Spotify ID of the category.
- `optionalParams` (optional): An object containing optional parameters:
  - `limit`: The maximum number of items to return.
  - `offset`: The index of the first item to return.

#### Returns: ``

#### Example



### getPlaylistCoverImage(playlistId: string)

This method is used to get the current image associated with a specific playlist.

#### Endpoint: [/playlists/{playlist_id}/images](https://developer.spotify.com/documentation/web-api/reference/get-playlist-cover)

#### Parameters:
- `playlistId` (required): A string representing the Spotify ID of the playlist.

#### Returns: ``

#### Example



### addCustomPlaylistCoverImage(playlistId: string, base64EncodedJpeg: string)

This method is used to replace the image used to represent a specific playlist with a custom image.

#### Endpoint: [/playlists/{playlist_id}/images](https://developer.spotify.com/documentation/web-api/reference/upload-custom-playlist-cover)

#### Parameters:
- `playlistId` (required): A string representing the Spotify ID of the playlist.
- `base64EncodedJpeg` (required): A string containing the base64-encoded JPEG image data.

#### Returns: ``

#### Example
