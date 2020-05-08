
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace xlsx2json
{
    class Program
    {
        public const string JiangmenDataFolder = @"F:\sodic2020\非JSON数据\江门文旅数据\";
        public const string ShenzhenDataFolder = @"F:\sodic2020\非JSON数据\深圳文旅数据\";
        public const string JsonFolder_AngularAssets = @"F:\sodic2020\UI\src\assets\json\";
        public const string JsonFolder_Visualization_AngularAssets = @"F:\sodic2020\Visualization\src\assets\json\";
        public const string JsonFolder_WepApi = @"F:\sodic2020\json\";

        static void Main(string[] args)
        {
            //CreateFood();
            CreateHotel();
            //return;
            //旅游景点信息.CreateSpotSimple(JsonFolder_WepApi + "深圳市旅游景点信息.json",JsonFolder_Visualization_AngularAssets + "深圳市旅游景点信息.json");
            //旅游景点信息.CreateSpotSimple(JsonFolder_WepApi + "江门市旅游景点信息.json",JsonFolder_Visualization_AngularAssets + "江门市旅游景点信息.json");
        }

        static void CreatePark()
        {
            BaiduApi.DefaultCity = "深圳市";
            停车场信息.CreatePark(ShenzhenDataFolder + "深圳市景点停车场信息.xlsx", JsonFolder_WepApi + "深圳市景点停车场信息.json");
            BaiduApi.DefaultCity = "江门市";
            停车场信息.CreatePark(JiangmenDataFolder + "江门市景点停车场信息.xlsx", JsonFolder_WepApi + "江门市景点停车场信息.json");
        }

        static void FoodPriceSegment()
        {
            POI数据分析.LoadData(JsonFolder_WepApi + "深圳市特色美食信息.json");
            POI数据分析.GetPriceSegment();
            POI数据分析.LoadData(JsonFolder_WepApi + "江门市特色美食信息.json");
            POI数据分析.GetPriceSegment();

            POI数据分析.LoadData(JsonFolder_WepApi + "深圳市宾馆酒店信息.json");
            POI数据分析.GetPriceSegment();
            POI数据分析.LoadData(JsonFolder_WepApi + "江门市宾馆酒店信息.json");
            POI数据分析.GetPriceSegment();
        }

        static void CommentAbstract()
        {
            var HotelComment_SZ = 宾馆酒店评论.CreateHotelComment(ShenzhenDataFolder + "深圳市宾馆酒店评价信息.xlsx");
            var HotelComment_JM = 宾馆酒店评论.CreateHotelComment(JiangmenDataFolder + "江门市宾馆酒店评价信息.xlsx");
            var HotelComment_Total = HotelComment_SZ;
            HotelComment_Total.AddRange(HotelComment_JM);
            var sw = new StreamWriter(@"F:\sodic2020\comments\comments.txt");
            var m = new List<string>();
            foreach (var hotelcomments in HotelComment_Total)
            {
                var comment = hotelcomments.Comment.Trim().Replace(System.Environment.NewLine, "");
                if (comment.Length > 100) continue;
                if (m.Contains(comment)) continue;
                if (!string.IsNullOrEmpty(comment))
                {
                    sw.WriteLine(comment);
                    m.Add(comment);
                }
            }
        }

        static void POIAnalyze()
        {

            POI数据分析.LoadData(JsonFolder_WepApi + "深圳市宾馆酒店信息.json");
            POI数据分析.GetTop50Price(JsonFolder_Visualization_AngularAssets + "深圳市宾馆酒店价格TOP50.json");
            POI数据分析.GetLow50Price(JsonFolder_Visualization_AngularAssets + "深圳市宾馆酒店价格LOW50.json");
            POI数据分析.LoadData(JsonFolder_WepApi + "江门市宾馆酒店信息.json");
            POI数据分析.GetTop50Price(JsonFolder_Visualization_AngularAssets + "江门市宾馆酒店价格TOP50.json");
            POI数据分析.GetLow50Price(JsonFolder_Visualization_AngularAssets + "江门市宾馆酒店价格LOW50.json");

            POI数据分析.LoadData(JsonFolder_WepApi + "深圳市特色美食信息.json");
            POI数据分析.GetTop50Price(JsonFolder_Visualization_AngularAssets + "深圳市美食价格TOP50.json");
            POI数据分析.GetLow50Price(JsonFolder_Visualization_AngularAssets + "深圳市美食价格LOW50.json");
            POI数据分析.LoadData(JsonFolder_WepApi + "江门市特色美食信息.json");
            POI数据分析.GetTop50Price(JsonFolder_Visualization_AngularAssets + "江门市美食价格TOP50.json");
            POI数据分析.GetLow50Price(JsonFolder_Visualization_AngularAssets + "江门市美食价格LOW50.json");
        }

        static void CreateGift()
        {
            var records = 特产品信息.CreateGift(ShenzhenDataFolder + "深圳市地方特产信息.xlsx");
            records.AddRange(特产品信息.CreateGift(JiangmenDataFolder + "江门市地方特产信息.xlsx"));
            var json = JsonConvert.SerializeObject(records, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder_AngularAssets + "地方特产信息.json", false))
            {
                sw.Write(json);
                sw.Close();
            }
        }

        static void CreateTour()
        {
            var records = 旅游目的地包团信息.CreateTour(ShenzhenDataFolder + "深圳市旅游目的地包团信息.xlsx");
            records.AddRange(旅游目的地包团信息.CreateTour(JiangmenDataFolder + "江门市旅游目的地包团信息.xlsx"));
            string json = JsonConvert.SerializeObject(records, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder_AngularAssets + "旅游目的地包团信息.json", false))
            {
                sw.Write(json);
                sw.Close();
            }
        }

        static void CreateHotel()
        {
            BaiduApi.DefaultCity = "深圳市";
            var HotelComment_SZ = 宾馆酒店评论.CreateHotelComment(ShenzhenDataFolder + "深圳市宾馆酒店评价信息.xlsx");
            var Hotel_SZ = 宾馆酒店信息.CreateHotel(ShenzhenDataFolder + "深圳市宾馆酒店信息.xlsx", JsonFolder_WepApi + "深圳市宾馆酒店信息.json", 6, HotelComment_SZ);
            BaiduApi.DefaultCity = "江门市";
            var HotelComment_JM = 宾馆酒店评论.CreateHotelComment(JiangmenDataFolder + "江门市宾馆酒店评价信息.xlsx");
            var Hotel_JM = 宾馆酒店信息.CreateHotel(JiangmenDataFolder + "江门市宾馆酒店信息.xlsx", JsonFolder_WepApi + "江门市宾馆酒店信息.json", 5, HotelComment_JM);


            Hotel_SZ.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            Hotel_JM.Sort((x, y) => { return y.CommentCount - x.CommentCount; });

            var HotHotel = Hotel_SZ.Take(70).ToList();
            HotHotel.AddRange(Hotel_JM.Take(30));
            HotHotel = HotHotel.Select(
                (y) =>
                {
                    if (y.Comments != null) y.Comments = y.Comments.Take(50).ToList();
                    return y;
                }
            ).ToList();

            HotHotel.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            string json = JsonConvert.SerializeObject(HotHotel, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder_AngularAssets + "热门宾馆酒店信息.json", false))
            {
                sw.Write(json);
                sw.Close();
            }

        }
        static void CreateFood()
        {

            BaiduApi.DefaultCity = "深圳市";
            var FoodComment_SZ = 特色美食评论.CreateFoodComment(ShenzhenDataFolder + "深圳市特色美食评价信息.xlsx");
            var Food_SZ = 特色美食信息.CreateFood(ShenzhenDataFolder + "深圳市特色美食信息.xlsx", JsonFolder_WepApi + "深圳市特色美食信息.json", FoodComment_SZ);

            BaiduApi.DefaultCity = "江门市";
            var FoodComment_JM = 特色美食评论.CreateFoodComment(JiangmenDataFolder + "江门市特色美食评价信息.xlsx");
            var Food_JM = 特色美食信息.CreateFood(JiangmenDataFolder + "江门市特色美食信息.xlsx", JsonFolder_WepApi + "江门市特色美食信息.json", FoodComment_JM);

            Food_SZ.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            Food_JM.Sort((x, y) => { return y.CommentCount - x.CommentCount; });

            var HotFood = Food_SZ.Take(70).ToList();
            HotFood.AddRange(Food_JM.Take(30));
            HotFood = HotFood.Select(
                (y) =>
                {
                    if (y.Comments != null) y.Comments = y.Comments.Take(50).ToList();
                    return y;
                }
            ).ToList();

            HotFood.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            string json = JsonConvert.SerializeObject(HotFood, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder_AngularAssets + "热门特色美食信息.json", false))
            {
                sw.Write(json);
                sw.Close();
            }

        }

        static void CreateSpot()
        {
            BaiduApi.DefaultCity = "深圳市";
            var SpotComment_SZ = 旅游景点评论.CreateSpotComment(ShenzhenDataFolder + "深圳市旅游景点评价信息.xlsx");
            var Spot_SZ = 旅游景点信息.CreateSpot(ShenzhenDataFolder + "深圳市旅游景点信息.xlsx", JsonFolder_WepApi + "深圳市旅游景点信息.json", SpotComment_SZ);
            BaiduApi.DefaultCity = "江门市";
            var SpotComment_JM = 旅游景点评论.CreateSpotComment(JiangmenDataFolder + "江门市旅游景点评价信息.xlsx");
            var Spot_JM = 旅游景点信息.CreateSpot(JiangmenDataFolder + "江门市旅游景点信息.xlsx", JsonFolder_WepApi + "江门市旅游景点信息.json", SpotComment_JM);

            var GradeASpot = Spot_SZ;
            GradeASpot.AddRange(Spot_JM);
            GradeASpot = GradeASpot.Where(x => !string.IsNullOrEmpty(x.ALevel)).Select(
                (y) =>
                {
                    if (y.Comments != null) y.Comments = y.Comments.Take(50).ToList();  //其实不用限制，CreateSpot时候已经限制了。。。
                    return y;
                }
            ).ToList();
            GradeASpot.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            string json = JsonConvert.SerializeObject(GradeASpot, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder_AngularAssets + "A级旅游景点评价信息.json", false))
            {
                sw.Write(json);
                sw.Close();
            }
        }

    }
}


