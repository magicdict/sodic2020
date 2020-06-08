export interface WaitLineInfo {
    Spot: string;
    Items: { name: string, value: number }[];
}

/**景区 */
export interface SpotInfo {
    Name: string;
    Type: string;
    ALevel: string;
    Address: string;
    Description: string;
    Price: number;
    OpenTime: string;
    ServiceTel: string;
    IssueTel: string;
    TrafficGuide: string;
    lat: number;
    lng: number;
    Comments: string[];
    CommentCount: number;
    WordCloud: { name: string, value: number }[];
    City: string;
    ScoreCnt: number;
    Scenery: number;
    Funny: number;
    PriceValue: number;
    NearSpot: { Item1: string, Item2: number, Item3: string }[];
    NearFood: { Item1: string, Item2: number, Item3: string }[];
    NearHotel: { Item1: string, Item2: number, Item3: string }[];
}

/**美食 */
export interface FoodInfo {
    Name: string;
    Address: string;
    Item: string[];
    Price: number;
    lat: number;
    lng: number;
    Comments: string[];
    CommentCount: number;
    WordCloud: { name: string, value: number }[];
    City: string;
}

/**宾馆酒店 */
export interface HotelInfo {
    Name: string;
    Grade: string;
    Distract: string;
    Address: string;
    Description: string;
    ServiceTel: string;
    ServiceFax: string;
    Price: number;
    lat: number;
    lng: number;
    Comments: string[];
    CommentCount: number;
    WordCloud: { name: string, value: number }[],
    Score: number;
    City: string;
}

export interface TourInfo {
    Name: string;
    Price: number;
    Description: string;
    Days: string;
}

export interface GiftInfo {
    Name: string;
    Description: string;
}

export enum enmItemType {
    Spot, Food, Hotel, Gift
}

export interface PlanInfo {
    StartDate: Date;
    EndDate: Date;
    Daily: DailyInfo[];
}

export interface DailyInfo {
    strDate: string;
    strWeek: string;
    citys: string[];
    CompanyWith: string;
    Spot: SpotInfo[];
    Food: FoodInfo[];
    Hotel: HotelInfo;
}

export interface FootprintItem {
    Title: string;
    Address: string;
    Src: string;
    Datetime: string;
    Description: string;
    Rotate: string;
}