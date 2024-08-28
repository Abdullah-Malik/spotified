# User Class

This class provides methods to interact with the Spotify Web API and retrieve information about users.

## Methods

### getCurrentUserProfile()

This method is used to get detailed profile information about the current user (including the current user's username).

#### Endpoint: [/me](https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile)

#### Returns: `CurrentUserProfile`

The `CurrentUserProfile` interface extends `UserProfile` and contains the following properties:
- `country`: A string representing the user's country.
- `email`: A string representing the user's email address.
- `product`: A string representing the user's Spotify subscription level.
- `explicit_content`: An `ExplicitContent` object containing information about the user's explicit content settings.
- `display_name`: A string or null object
- `external_urls`: A `ExternalUrls` object
- `followers`: A `Followers` object
- `href`: A string
- `id`: A string
- `images`: An array of Images;
- `type`: A string;
- `uri`: A string;

#### Example

```typescript
const userProfile = await spotified.user.getCurrentUserProfile();
console.log(`Username: ${userProfile.display_name}`);
console.log(`Email: ${userProfile.email}`);
console.log(`Product: ${userProfile.product}`);
```

### getUserTopItems(type: UsersTopItemsType, optionalParams?: TopItemsOptionalParams)

This method is used to get the current user's top artists or tracks based on calculated affinity.

#### Endpoint: [/me/top/{type}](https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks)

#### Parameters:

- `type` (required): A string representing the type of items to retrieve, either `'artists'` or `'tracks'`.
- `time_range`: A string representing over what time frame the affinities are computed. Valid values: long_term (calculated from ~1 year of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks).
- `limit`: The maximum number of items to return.
- `offset`: The index of the first item to return.

#### Returns: `UsersTopItems`

The `UsersTopItems` interface extends `PaginationResponseProps` and contains:
- `href`: A string URL
- `limit`: A number
- `next`: A string URL
- `offset`: A number
- `previous`: A string URL
- `total`: A number representing the total number of saved tracks
- `items`: An array of `Artists` or `Tracks` objects, depending on the `type` parameter.

#### Example

```typescript
const topArtists = await spotified.user.getUserTopItems('artists', { limit: 10, time_range: 'medium_term' });
topArtists.items.forEach(artist => {
    console.log(`${artist.name} - Popularity: ${artist.popularity}`);
});
```

### getUserProfile(userId: string)

This method is used to get public profile information about a Spotify user.

#### Endpoint: [/users/{userId}](https://developer.spotify.com/documentation/web-api/reference/get-users-profile)

#### Parameters:

- `userId` (required): A string representing the Spotify ID of the user.

#### Returns: `UserProfile`

The `UserProfile` interface contains the following properties:
- `display_name`: The user's display name.
- `external_urls`: An `ExternalUrls` object.
- `followers`: A `Followers` object.
- `href`: A string URL.
- `id`: A string representing the user's Spotify ID.
- `images`: An array of `Image` objects.
- `type`: A string representing the object type (always "user").
- `uri`: A string URI.

#### Example

```typescript
const userProfile = await spotified.user.getUserProfile('userId');
console.log(`Display name: ${userProfile.display_name}`);
console.log(`Followers: ${userProfile.followers.total}`);
```

### followPlaylist(playlistId: string, optionalParams?: { public: boolean })

This method is used to add the current user as a follower of a playlist.

#### Endpoint: [/playlists/{playlistId}/followers](https://developer.spotify.com/documentation/web-api/reference/follow-playlist)

#### Parameters:

- `playlistId` (required): A string representing the Spotify ID of the playlist.
- `optionalParams` (optional): An object containing optional parameters:
  - `public`: A boolean indicating whether the playlist should be followed publicly or not.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.user.followPlaylist('playlistId', { public: true });
console.log('Playlist followed successfully');
```

### unfollowPlaylist(playlistId: string)

This method is used to remove the current user as a follower of a playlist.

#### Endpoint: [/playlists/{playlistId}/followers](https://developer.spotify.com/documentation/web-api/reference/unfollow-playlist)

#### Parameters:

- `playlistId` (required): A string representing the Spotify ID of the playlist.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.user.unfollowPlaylist('playlistId');
console.log('Playlist unfollowed successfully');
```

### getFollowedArtists(type: FollowedArtistType, optionalParams?: FollowedArtistOptionalParams)

This method is used to get the current user's followed artists.

#### Endpoint: [/me/following](https://developer.spotify.com/documentation/web-api/reference/get-followed)

#### Parameters:

- `type` (required): A string representing the type of followed entity, which must be `'artist'`.
- `optionalParams` (optional): An object of type `FollowedArtistOptionalParams` containing:
    - `after`: A string representing the last artist ID retrieved from the previous request.
    - `limit`: The maximum number of items to return.

#### Returns: `FollowedArtist`

The `FollowedArtist` interface contains:
- `artists`: An object with the following properties:
  - `href`: A string URL.
  - `limit`: A number.
  - `next`: A string URL.
  - `cursors`: An object with `after` and `before` string properties.
  - `total`: A number.
  - `items`: An array of `Artist` objects.

#### Example

```typescript
const followedArtists = await spotified.user.getFollowedArtists('artist', { limit: '20' });
followedArtists.artists.items?.forEach(artist => {
    console.log(`${artist.name} - Followers: ${artist.followers.total}`);
});
```

### followArtistsOrUsers(type: ArtistsUsersType, ids: string[])

This method is used to add the current user as a follower of one or more artists or other Spotify users.

#### Endpoint: [/me/following](https://developer.spotify.com/documentation/web-api/reference/follow-artists-users)

#### Parameters:

- `type` (required): A string representing the type of entity to follow, either `'artist'` or `'user'`.
- `ids` (required): An array of strings representing the Spotify IDs of the entities to follow.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.user.followArtistsOrUsers('artist', ['artistId1', 'artistId2']);
console.log('Artists followed successfully');
```

### unfollowArtistsUsers(type: ArtistsUsersType, ids: string[])

This method is used to remove the current user as a follower of one or more artists or other Spotify users.

#### Endpoint: [/me/following](https://developer.spotify.com/documentation/web-api/reference/unfollow-artists-users)

#### Parameters:

- `type` (required): A string representing the type of entity to unfollow, either `'artist'` or `'user'`.
- `ids` (required): An array of strings representing the Spotify IDs of the entities to unfollow.

#### Returns: This endpoint doesn't return any data.

#### Example

```typescript
await spotified.user.unfollowArtistsUsers('artist', ['artistId1', 'artistId2']);
console.log('Artists unfollowed successfully');
```

### checkIfUserFollowsArtistsOrUsers(type: ArtistsUsersType, ids: string[])

This method is used to check if the current user is following one or more artists or other Spotify users.

#### Endpoint: [/me/following/contains](https://developer.spotify.com/documentation/web-api/reference/check-current-user-follows)

#### Parameters:

- `type` (required): A string representing the type of entity to check, either `'artist'` or `'user'`.
- `ids` (required): An array of strings representing the Spotify IDs of the entities to check.

#### Returns: An array of boolean values

Each boolean in the array corresponds to the entity ID in the same position in the request. `true` indicates that the user is following the entity.

#### Example

```typescript
const followStatus = await spotified.user.checkIfUserFollowsArtistsOrUsers('artist', ['artistId1', 'artistId2']);
followStatus.forEach((isFollowed, index) => {
    console.log(`Artist ${index + 1} is followed: ${isFollowed}`);
});
```

### checkIfCurrentUserFollowsPlaylist(playlistId: string, currentUserId: string)

This method is used to check if the current user is following a specified playlist.

#### Endpoint: [/playlists/{playlistId}/followers/contains](https://developer.spotify.com/documentation/web-api/reference/check-if-user-follows-playlist)

#### Parameters:

- `playlistId` (required): A string representing the Spotify ID of the playlist.
- `currentUserId` (required): A string representing the Spotify ID of the current user.

#### Returns: An array of boolean values

The array will contain a single boolean value indicating whether the current user is following the specified playlist.

#### Example

```typescript
const isFollowed = await spotified.user.checkIfCurrentUserFollowsPlaylist('playlistId', 'currentUserId');
console.log(`Current user is following the playlist: ${isFollowed[0]}`);
```
