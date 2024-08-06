import { Copyright, ExternalUrls, Image } from "./shared.types";

export interface Show {
    availableMarkets: string[];
    copyrights: Copyright[];
    description: string;
    HTMLDescription: string;
    explicit: boolean;
    externalUrls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    isExternallyHosted: boolean;
    languages: string[];
    name: string;
    mediaType: string;
    publisher: string;
    type: string;
    uri: string;
    totalEpisodes: number[]
}
