/**POI */
export interface POIInfo {
    Name: string;
    Address: string;
    Item: string[];
    Price: number;
    lat: number;
    lng: number;
    Comments: string[];
    CommentCount: number;
    ALevel: string;
    Type: string;
}

export interface SpotInfo extends POIInfo {
    Scenery: number;
    Funny: number;
    PriceValue: number;
    ScoreCnt:number;
}