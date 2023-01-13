import { SpotifiedSubClient } from '../client/client.subclient';
import { ArtistProfile } from '../types';

export class Artist extends SpotifiedSubClient {
  getArtist(id: string) {
    return this.get<ArtistProfile>(`/artists/${id}`);
  }
}

export default Artist;
