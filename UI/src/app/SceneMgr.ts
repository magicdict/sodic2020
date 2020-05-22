import { Injectable } from '@angular/core';

@Injectable()
export class SceneMgr {
    constructor() { }

    SceneInfoList: SceneInfo[];
    sceneName: string = "菜单";    //场景编号
    lineIdx: number = 0;    //台词位置

    public getSceneInfoByName(SceneName: string): SceneInfo {
        return this.SceneInfoList.find(x => x.Name === SceneName);
    }

    getSceneInfoByName_Debug(SceneName: string): SceneInfo {
        switch (SceneName) {
            case "菜单":
                return 菜单;
            case "深圳速览":
                return 深圳速览;
            case "最佳旅行时间":
                return 最佳旅行时间;
            case "消费水平":
                return 消费水平;
            case "穿衣指南":
                return 穿衣指南;
            case "觅食深圳":
                return 觅食深圳;
            case "主题公园游览":
                return 主题公园游览;
            case "海滨休闲时光":
                return 海滨休闲时光;
            case "江门速览":
                return 江门速览;
            case "江门骑楼":
                return 江门骑楼;
            case "小鸟天堂":
                return 小鸟天堂;
            case "音乐喷泉":
                return 音乐喷泉;
            case "开平碉楼":
                return 开平碉楼;
            case "台山碉楼":
                return 台山碉楼;
            case "浪琴湾半岛":
                return 浪琴湾半岛;
            case "江门美食":
                return 江门美食;
            default:
                break;
        }
    }
}

export interface SceneInfo {
    Name: string;
    Title: string;
    Lines: string[];
    Background: string;
    NextScene?: string;
    Branch?: [string, string][]
}


export const 菜单: SceneInfo = {
    Name: "菜单",
    Title: "菜单",
    Background: "消费水平",
    Lines: [
        "深深@深圳一年四季如春，比邻香港，也是是一座新的不夜城，也是旅行购物的天堂。",
        "圳圳@广东江门是著名的华侨之乡，那里有世界文化遗产开平碉楼和村落",
    ],
    Branch: [
        ["深圳", "深圳速览"],
        ["江门", "江门速览"]
    ]
};

export const 深圳速览: SceneInfo = {
    Name: "深圳速览",
    Title: "深圳速览",
    Background: "消费水平",
    Lines: [
        "深深@深圳一年四季如春，比邻香港，也是是一座新的不夜城，也是旅行购物的天堂。",
        "圳圳@或许你是这个家园的繁忙居民，但却身在此城不识真面目；",
        "深深@或许你曾是这座城市的匆匆过客，对之投来惊鸿一瞥；或许，你从未抵达。",
        "圳圳@那么，从此刻起，拿起攻略，以一个崭新的视角，用眼睛去发现深圳之美，用心灵感受深圳之魅。",
    ],
    NextScene: "最佳旅行时间"
};

export const 最佳旅行时间: SceneInfo = {
    Name: "最佳旅行时间",
    Title: "最佳旅行时间",
    Background: "最佳旅行时间",
    Lines: [
        "深深@深圳雨季集中在 5-9 月，最冷 1 月，最低气温 1.5℃，8-9 月为夏天，气温约 35℃。游深圳以冬天和早春最佳。。",
        "深深@如果怕热，11-5 月来深圳较为适合；如果想去海滨浴场玩，6-10 月份很适合，8-9 月份的海边也很好玩，但天气很热。",
        "深深@每年的 6 月 28 日 -7 月 8 日，深圳会举办荔枝节，节日期间会有很多活动，还可以到荔枝公园吃荔枝。",
        "深深@春节也是深圳较为冷清的时候，深圳“移民”大多会回家过年，当地人也会去香港或其他地方度假。",
    ],
    NextScene: "消费水平"
};

export const 消费水平: SceneInfo = {
    Name: "消费水平",
    Title: "消费水平",
    Background: "消费水平",
    Lines: [
        "圳圳@深圳的消费较高，住宿、吃饭、交通价格和广州差不多，",
        "圳圳@简单的一顿午餐一般人均20-30 元左右，一般的住宿酒店价格在 200-300元左右。",
    ],
    NextScene: "穿衣指南"
};

export const 穿衣指南: SceneInfo = {
    Name: "穿衣指南",
    Title: "穿衣指南",
    Background: "穿衣指南",
    Lines: [
        "深深@深圳常年平均气温 20℃，最高气温37℃（6-9 月都有可能），最低气温 7℃（一般出现在 1-2 月），",
        "深深@衣物 4-10 月可穿短袖，5-9 月建议出门带雨具，10 月以后气温略有下降，",
        "深深@可以穿长衫、外套。最冷的 1 月份可以穿厚大衣。",
    ],
    NextScene: "觅食深圳"
};

export const 觅食深圳: SceneInfo = {
    Name: "觅食深圳",
    Title: "觅食深圳",
    Background: "觅食深圳",
    Lines: [
        "圳圳@深圳是是一座美食城，拥有上万个美食场所，无论你是多么“挑剔”的食客，在这里都能得到最大的满足，这里是美食家的天下。",
    ],
    NextScene: "主题公园游览"
};

export const 主题公园游览: SceneInfo = {
    Name: "主题公园游览",
    Title: "主题公园游览",
    Background: "主题公园游览",
    Lines: [
        "深深@有着无限热情与活力的鹏城，各种主题公园分布在座城市中，这里有世界之窗、锦绣中华，让人了解世界和中国 ;",
        "深深@有华侨城，可以寄身心于娱乐，度过美好的休闲假期；有欢乐谷，可以让人回归童真，重拾童趣。",
    ],
    NextScene: "海滨休闲时光"
};

export const 海滨休闲时光: SceneInfo = {
    Name: "海滨休闲时光",
    Title: "海滨休闲时光",
    Background: "海滨休闲时光",
    Lines: [
        "圳圳@深圳这座靠海的城市，自然少不了浪漫的海岛风情，无论是海滨度假，还是寻找乏人问津的美丽海岛，吃海鲜、看日出、日落，海边露营都是永远不变的主题。",
    ],
    Branch: [
        ["深圳", "深圳速览"],
        ["江门", "江门速览"]
    ]
};


export const 江门速览: SceneInfo = {
    Name: "江门速览",
    Title: "江门速览",
    Background: "江门速览",
    Lines: [
        "深深@广东江门是著名的华侨之乡，那里有世界文化遗产开平碉楼和村落，那里有独木成林的百年水榕树和巴金笔下的小鸟天堂，那里有半小时无间歇的音乐喷泉",
        "深深@那里有两块钱一壶茶的广式茶楼，那里有可以捡到白贝的黑色沙滩，那里有怪石嶙峋的海洋地质公园。",
    ],
    NextScene: "江门骑楼"
};

export const 江门骑楼: SceneInfo = {
    Name: "江门骑楼",
    Title: "江门骑楼",
    Background: "江门骑楼",
    Lines: [
        "圳圳@蓬江河畔800米长的骑楼建筑群，想象着她昔日的繁华和热闹；",
    ],
    NextScene: "小鸟天堂"
};

export const 小鸟天堂: SceneInfo = {
    Name: "小鸟天堂",
    Title: "小鸟天堂",
    Background: "小鸟天堂",
    Lines: [
        "深深@坐船慢慢荡近小鸟天堂，偶遇晚归的白鹭和美丽夕阳；",
    ],
    NextScene: "音乐喷泉"
};

export const 音乐喷泉: SceneInfo = {
    Name: "音乐喷泉",
    Title: "音乐喷泉",
    Background: "音乐喷泉",
    Lines: [
        "圳圳@在东湖公园欣赏音乐喷泉，在清凉夜色中环湖徒步。",
    ],
    NextScene: "开平碉楼"
};


export const 开平碉楼: SceneInfo = {
    Name: "开平碉楼",
    Title: "开平碉楼",
    Background: "江门速览",
    Lines: [
        "深深@在铭石楼顶俯瞰自力村碉楼群，羡慕立园主人挖掘运河泛舟其上的逍遥，隔河眺望正在封闭维修的赤坎古镇，",
        "深深@马降龙碉楼竹林里品尝泥焗鸡，锦江里堤坝上遥望瑞石楼，重温姜文电影《让子弹飞》。",
    ],
    NextScene: "台山碉楼"
};

export const 台山碉楼: SceneInfo = {
    Name: "台山碉楼",
    Title: "台山碉楼",
    Background: "台山碉楼",
    Lines: [
        "圳圳@相比于开平碉楼的声名远播，台山碉楼则需要细细寻访。有因为电影出名但破落不堪的冈宁圩，",
        "圳圳@有隐藏在深山中的水上碉楼，有建筑立面外形貌似三国刘关张的翁家楼，有干净整洁的浮云村碉楼群。",
    ],
    NextScene: "浪琴湾半岛"
};


export const 浪琴湾半岛: SceneInfo = {
    Name: "浪琴湾半岛",
    Title: "浪琴湾半岛",
    Background: "浪琴湾半岛",
    Lines: [
        "深深@傍晚在浪琴湾黑色沙滩上散步，原本只是想捡些贝壳玩玩，没想到居然捡到了几十个活着的白贝，当地大排档老板都惊呆了。",
        "深深@那琴半岛海洋地质公园有六公里海滨栈道，记得要爬到陡峭的山顶俯瞰整个半岛。",
    ],
    NextScene: "江门美食"
};

export const 江门美食: SceneInfo = {
    Name: "江门美食",
    Title: "江门美食",
    Background: "江门美食",
    Lines: [
        "圳圳@旅行和美食是相伴同行的好闺蜜，江门酒店下面偶遇便宜实惠的茶楼，粤菜早茶物美价廉，冰皮鸡水晶虾饺黄金豆腐排骨陈村粉中山咸茶果；",
        "圳圳@开平美食排行榜第一名的牛肉火锅；那琴半岛品尝特色美食五味鹅和鳝鱼饭。",
    ],
    Branch: [
        ["深圳", "深圳速览"],
        ["江门", "江门速览"]
    ]
};

