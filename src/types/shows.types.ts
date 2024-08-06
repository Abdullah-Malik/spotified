import { Copyright, ExternalUrls, Image } from "./shared.types";

export interface SimplifiedShow {
    availableMarkets : string[];
    copyrights: Copyright[];
    description: string;
    HTMLdescription: string;
    explicit: boolean;
    externalUrls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    isExternallyHosted: boolean;
    languages: string[];
    mediaType: string;
    name: string;
    publisher: string;
    type: string;
    uri: string;
    totalEpisodes: number;
}