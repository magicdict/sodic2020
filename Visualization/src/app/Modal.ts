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
    ScoreCnt: number;
}

export interface ZYStreetBook {
    Date: Date;
    WeekDay: number;
    TotalBook: number;
}

export interface BigMeiShaBook {
    Date: Date;
    WeekDay: number;
    TotalBook: number;
    InCount: number;
}

export interface SearchKey {
    Spot: { name: string, value: number }[];
    Food: { name: string, value: number }[];
    Hotel: { name: string, value: number }[];
}    