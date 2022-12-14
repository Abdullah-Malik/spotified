import SpotifiedSubClient from '../client/client.subclient';
import { ArtistProfile } from '../types';

export default class Artist extends SpotifiedSubClient {
  getArtist(id: string) {
    return this.get<ArtistProfile>(`/artists/${id}`);
  }
}
