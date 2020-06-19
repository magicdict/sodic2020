
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using System;

namespace xlsx2json
{
    class Program
    {
        public const string JiangmenDataFolder = @"F:\sodic2020\非JSON数据\江门文旅数据\";
        public const string ShenzhenDataFolder = @"F:\sodic2020\非JSON数据\深圳文旅数据\";
        public const string BookDataFolder = @"F:\sodic2020\非JSON数据\预约数据\";
        public const string JsonFolder_AngularAssets = @"F:\sodic2020\UI\src\assets\json\";
        public const string JsonFolder_Visualization_AngularAssets = @"F:\sodic2020\Visualization\src\assets\json\";
        public const string JsonFolder_WepApi = @"F:\sodic2020\json\";
        static void Main(string[] args)
        {
            CreateTicket();
        }
        class GeoHeatMap
        {
            public double lat { get; set; }

            public double lng { get; set; }

            public double value { get; set; }
        }

        static void HotelPriceHeatMap()
        {
            var sr = new StreamReader(JsonFolder_WepApi + "深圳市宾馆酒店信息.json");
            var records_hotel = JsonConvert.DeserializeObject<List<宾馆酒店信息>>(sr.ReadToEnd());
            sr.Close();
            var g = records_hotel.GroupBy(x => (x.lat, x.lng));
            var p = g.Select(x => { return new GeoHeatMap() { lat = x.Key.lat, lng = x.Key.lng, value = x.Average(y => y.Price) }; });
            string json = JsonConvert.SerializeObject(p, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder_Visualization_AngularAssets + "深圳市宾馆酒店价格热力图.json", false))
            {
                sw.Write(json);
                sw.Close();
            }

            sr = new StreamReader(JsonFolder_WepApi + "江门市宾馆酒店信息.json");
            records_hotel = JsonConvert.DeserializeObject<List<宾馆酒店信息>>(sr.ReadToEnd());
            sr.Close();
            g = records_hotel.GroupBy(x => (x.lat, x.lng));
            p = g.Select(x => { return new GeoHeatMap() { lat = x.Key.lat, lng = x.Key.lng, value = x.Average(y => y.Price) }; });
            json = JsonConvert.SerializeObject(p, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder_Visualization_AngularAssets + "江门市宾馆酒店价格热力图.json", false))
            {
                sw.Write(json);
                sw.Close();
            }

            sr = new StreamReader(JsonFolder_WepApi + "深圳市特色美食信息.json");
            var records_food = JsonConvert.DeserializeObject<List<特色美食信息>>(sr.ReadToEnd());
            sr.Close();
            var g_1 = records_food.GroupBy(x => (x.lat, x.lng));
            var p_1 = g_1.Select(x => { return new GeoHeatMap() { lat = x.Key.lat, lng = x.Key.lng, value = x.Average(y => y.Price) }; });
            json = JsonConvert.SerializeObject(p_1, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder_Visualization_AngularAssets + "深圳市特色美食价格热力图.json", false))
            {
                sw.Write(json);
                sw.Close();
            }

            sr = new StreamReader(JsonFolder_WepApi + "江门市特色美食信息.json");
            records_food = JsonConvert.DeserializeObject<List<特色美食信息>>(sr.ReadToEnd());
            sr.Close();
            g_1 = records_food.GroupBy(x => (x.lat, x.lng));
            p_1 = g_1.Select(x => { return new GeoHeatMap() { lat = x.Key.lat, lng = x.Key.lng, value = x.Average(y => y.Price) }; });
            json = JsonConvert.SerializeObject(p_1, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder_Visualization_AngularAssets + "江门市特色美食价格热力图.json", false))
            {
                sw.Write(json);
                sw.Close();
            }
        }

        static void CreateNear()
        {
            var sr = new StreamReader(JsonFolder_WepApi + "深圳市旅游景点信息.json");
            var records_spot = JsonConvert.DeserializeObject<List<旅游景点信息>>(sr.ReadToEnd());
            sr.Close();

            sr = new StreamReader(JsonFolder_WepApi + "深圳市特色美食信息.json");
            var records_food = JsonConvert.DeserializeObject<List<特色美食信息>>(sr.ReadToEnd());
            sr.Close();

            sr = new StreamReader(JsonFolder_WepApi + "深圳市宾馆酒店信息.json");
            var records_hotel = JsonConvert.DeserializeObject<List<宾馆酒店信息>>(sr.ReadToEnd());
            sr.Close();

            foreach (var item in records_spot)
            {
                item.NearFood = new List<(string, double, string)>();
                records_food.Sort((x, y) => { return GetDistance(x.lat, x.lng, item.lat, item.lng).CompareTo(GetDistance(y.lat, y.lng, item.lat, item.lng)); });
                item.NearFood.AddRange(records_food.Select(x => (x.Name, GetDistance(x.lat, x.lng, item.lat, item.lng), x.Address)).Take(20));

                item.NearHotel = new List<(string, double, string)>();
                records_hotel.Sort((x, y) => { return GetDistance(x.lat, x.lng, item.lat, item.lng).CompareTo(GetDistance(y.lat, y.lng, item.lat, item.lng)); });
                item.NearHotel.AddRange(records_hotel.Select(x => (x.Name, GetDistance(x.lat, x.lng, item.lat, item.lng), x.Address)).Take(20));
            }

            string json = JsonConvert.SerializeObject(records_spot, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder_WepApi + "深圳市旅游景点信息(附近).json", false))
            {
                sw.Write(json);
                sw.Close();
            }
        }


        private const double EARTH_RADIUS = 6378137;
        /// <summary>
        /// 计算两点位置的距离，返回两点的距离，单位 米
        /// 该公式为GOOGLE提供，误差小于0.2米
        /// </summary>
        /// <param name="lat1">第一点纬度</param>
        /// <param name="lng1">第一点经度</param>
        /// <param name="lat2">第二点纬度</param>
        /// <param name="lng2">第二点经度</param>
        /// <returns></returns>
        public static double GetDistance(double lat1, double lng1, double lat2, double lng2)
        {
            if (lat1 == -1 || lat2 == -1) return double.MaxValue;
            double radLat1 = Rad(lat1);
            double radLng1 = Rad(lng1);
            double radLat2 = Rad(lat2);
            double radLng2 = Rad(lng2);
            double a = radLat1 - radLat2;
            double b = radLng1 - radLng2;
            double result = 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) + Math.Cos(radLat1) * Math.Cos(radLat2) * Math.Pow(Math.Sin(b / 2), 2))) * EARTH_RADIUS;
            return Math.Round(result, 2);
        }

        /// <summary>
        /// 经纬度转化成弧度
        /// </summary>
        /// <param name="d"></param>
        /// <returns></returns>
        private static double Rad(double d)
        {
            return (double)d * Math.PI / 180d;
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
            var json = JsonConvert.SerializeObject(records, Formatting.None);
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
            string json = JsonConvert.SerializeObject(records, Formatting.None);
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

            var HotHotel = Hotel_SZ.Take(50).ToList();
            HotHotel.AddRange(Hotel_JM.Take(50));
            HotHotel = HotHotel.Select(
                (y) =>
                {
                    if (y.Comments != null) y.Comments = y.Comments.Take(30).ToList();
                    return y;
                }
            ).ToList();

            HotHotel.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            string json = JsonConvert.SerializeObject(HotHotel, Formatting.None);
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

            var HotFood = Food_SZ.Take(50).ToList();
            HotFood.AddRange(Food_JM.Take(50));
            HotFood = HotFood.Select(
                (y) =>
                {
                    if (y.Comments != null) y.Comments = y.Comments.Take(30).ToList();
                    return y;
                }
            ).ToList();

            HotFood.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            string json = JsonConvert.SerializeObject(HotFood, Formatting.None);
            using (var sw = new StreamWriter(JsonFolder_AngularAssets + "热门特色美食信息.json", false))
            {
                sw.Write(json);
                sw.Close();
            }

        }


        static void AnlayzeSpotScore()
        {
            var sr = new StreamReader(JsonFolder_WepApi + "深圳市旅游景点信息.json");
            var records_spot = JsonConvert.DeserializeObject<List<旅游景点信息>>(sr.ReadToEnd());
            sr.Close();

            sr = new StreamReader(JsonFolder_AngularAssets + "旅游目的地包团信息.json");
            var records_tour = JsonConvert.DeserializeObject<List<旅游目的地包团信息>>(sr.ReadToEnd());
            var c = records_spot.Select(x => (x.Name, records_tour.Count(y => y.IsContain(x.Name)))).ToList();
            c.Sort((x, y) => { return y.Item2.CompareTo(x.Item2); });
            Console.WriteLine("地接团TOP10");
            foreach (var item in c.Take(10))
            {
                Console.WriteLine(item.Name + ":" + item.Item2);
            }


            var SpotNameInfo = WordCloudItem.Create(records_spot.Select(x => x.Name).ToList(), 30);
            Console.WriteLine("名称单词TOP30");
            foreach (var item in SpotNameInfo)
            {
                Console.WriteLine(item.name + ":" + item.value);
            }

            records_spot.Sort((x, y) => { return y.Scenery.CompareTo(x.Scenery); });
            var top10 = records_spot.Where(x => x.Scenery != 0 && x.ScoreCnt > 50).Take(10);
            Console.WriteLine("景色TOP10");
            foreach (var item in top10)
            {
                Console.WriteLine(item.Name + ":" + item.Scenery + "(" + item.ScoreCnt + ")");
            }

            records_spot.Sort((x, y) => { return y.Funny.CompareTo(x.Funny); });
            top10 = records_spot.Where(x => x.Funny != 0 && x.ScoreCnt > 50).Take(10);
            Console.WriteLine("趣味TOP10");
            foreach (var item in top10)
            {
                Console.WriteLine(item.Name + ":" + item.Funny + "(" + item.ScoreCnt + ")");
            }


            records_spot.Sort((x, y) => { return y.PriceValue.CompareTo(x.PriceValue); });
            top10 = records_spot.Where(x => x.PriceValue != 0 && x.ScoreCnt > 50).Take(10);
            Console.WriteLine("性价比TOP10");
            foreach (var item in top10)
            {
                Console.WriteLine(item.Name + ":" + item.PriceValue + "(" + item.ScoreCnt + ")");
            }

            records_spot.Sort((x, y) => { return y.ScoreAvg.CompareTo(x.ScoreAvg); });
            top10 = records_spot.Where(x => x.ScoreAvg != 0 && x.ScoreCnt > 50).Take(10);
            Console.WriteLine("综合TOP10");
            foreach (var item in top10)
            {
                Console.WriteLine(item.Name + ":" + item.ScoreAvg + "(" + item.ScoreCnt + ")");
            }


            records_spot.Sort((x, y) => { return x.Scenery.CompareTo(y.Scenery); });
            top10 = records_spot.Where(x => x.Scenery != 0 && x.ScoreCnt > 50).Take(10);
            Console.WriteLine("景色LOW10");
            foreach (var item in top10)
            {
                Console.WriteLine(item.Name + ":" + item.Scenery + "(" + item.ScoreCnt + ")");
            }

            records_spot.Sort((x, y) => { return x.Funny.CompareTo(y.Funny); });
            top10 = records_spot.Where(x => x.Funny != 0 && x.ScoreCnt > 50).Take(10);
            Console.WriteLine("趣味LOW10");
            foreach (var item in top10)
            {
                Console.WriteLine(item.Name + ":" + item.Funny + "(" + item.ScoreCnt + ")");
            }


            records_spot.Sort((x, y) => { return x.PriceValue.CompareTo(y.PriceValue); });
            top10 = records_spot.Where(x => x.PriceValue != 0 && x.ScoreCnt > 50).Take(10);
            Console.WriteLine("性价比LOW10");
            foreach (var item in top10)
            {
                Console.WriteLine(item.Name + ":" + item.PriceValue + "(" + item.ScoreCnt + ")");
            }

            records_spot.Sort((x, y) => { return x.ScoreAvg.CompareTo(y.ScoreAvg); });
            top10 = records_spot.Where(x => x.ScoreAvg != 0 && x.ScoreCnt > 50).Take(10);
            Console.WriteLine("综合LOW10");
            foreach (var item in top10)
            {
                Console.WriteLine(item.Name + ":" + item.ScoreAvg + "(" + item.ScoreCnt + ")");
            }


        }


        static void CreateTicket()
        {
            var sr1 = new StreamReader(JsonFolder_WepApi + "深圳市旅游景点信息.json");
            var Spot_SZ = JsonConvert.DeserializeObject<List<旅游景点信息>>(sr1.ReadToEnd());
            sr1.Close();
            var sr2 = new StreamReader(JsonFolder_WepApi + "江门市旅游景点信息.json");
            var Spot_JM = JsonConvert.DeserializeObject<List<旅游景点信息>>(sr2.ReadToEnd());
            sr2.Close();
            var Spot_All = Spot_SZ;
            Spot_All.AddRange(Spot_JM);
            //分布统计
            var price_free = Spot_All.Count(x => x.Price == 0);
            var price_50 = Spot_All.Count(x => x.Price > 0 && x.Price <= 50);
            var price_100 = Spot_All.Count(x => x.Price > 50 && x.Price <= 100);
            var price_200 = Spot_All.Count(x => x.Price > 100 && x.Price <= 200);
            var price_other = Spot_All.Count(x => x.Price > 200);
            Console.WriteLine(price_free);
            Console.WriteLine(price_50);
            Console.WriteLine(price_100);
            Console.WriteLine(price_200);
            Console.WriteLine(price_other);
            Spot_All.Sort((x, y) => { return y.Price.CompareTo(x.Price); });
            foreach (var item in Spot_All.Take(20))
            {
                Console.WriteLine(item.Name + ":" + item.Price);
            }
            //评论数
            var cc_10 = Spot_All.Count(x => x.CommentCount < 10);
            var cc_100 = Spot_All.Count(x => x.CommentCount > 10 && x.CommentCount < 100);
            var cc_500 = Spot_All.Count(x => x.CommentCount > 100 && x.CommentCount <= 500);
            var cc_1000 = Spot_All.Count(x => x.CommentCount > 500 && x.CommentCount <= 1000);
            var cc_2000 = Spot_All.Count(x => x.CommentCount > 1000 && x.CommentCount <= 2000);
            var cc_other = Spot_All.Count(x => x.CommentCount > 2000);
            Console.WriteLine(cc_10);
            Console.WriteLine(cc_100);
            Console.WriteLine(cc_500);
            Console.WriteLine(cc_1000);
            Console.WriteLine(cc_2000);
            Console.WriteLine(cc_other);
            Spot_All.Sort((x, y) => { return y.CommentCount.CompareTo(x.CommentCount); });
            foreach (var item in Spot_All.Take(20))
            {
                Console.WriteLine(item.Name + ":" + item.CommentCount);
            }
        }

        /// <summary>
        /// 景点（必须有餐厅和酒店数据支持）
        /// </summary>
        static void CreateSpot()
        {
            // BaiduApi.DefaultCity = "深圳市";
            // var SpotComment_SZ = 旅游景点评论.CreateSpotComment(ShenzhenDataFolder + "深圳市旅游景点评价信息.xlsx");
            // var Spot_SZ = 旅游景点信息.CreateSpot(ShenzhenDataFolder + "深圳市旅游景点信息.xlsx", JsonFolder_WepApi + "深圳市旅游景点信息.json", SpotComment_SZ);

            // BaiduApi.DefaultCity = "江门市";
            // var SpotComment_JM = 旅游景点评论.CreateSpotComment(JiangmenDataFolder + "江门市旅游景点评价信息.xlsx");
            // var Spot_JM = 旅游景点信息.CreateSpot(JiangmenDataFolder + "江门市旅游景点信息.xlsx", JsonFolder_WepApi + "江门市旅游景点信息.json", SpotComment_JM);

            var sr1 = new StreamReader(JsonFolder_WepApi + "深圳市旅游景点信息.json");
            var Spot_SZ = JsonConvert.DeserializeObject<List<旅游景点信息>>(sr1.ReadToEnd());
            sr1.Close();

            sr1 = new StreamReader(JsonFolder_WepApi + "深圳市旅游景点信息.json");
            var records_spot = JsonConvert.DeserializeObject<List<旅游景点信息>>(sr1.ReadToEnd());
            sr1.Close();

            var sr = new StreamReader(JsonFolder_WepApi + "深圳市特色美食信息.json");
            var records_food = JsonConvert.DeserializeObject<List<特色美食信息>>(sr.ReadToEnd());
            sr.Close();

            sr = new StreamReader(JsonFolder_WepApi + "深圳市宾馆酒店信息.json");
            var records_hotel = JsonConvert.DeserializeObject<List<宾馆酒店信息>>(sr.ReadToEnd());
            sr.Close();

            foreach (var item in Spot_SZ)
            {
                item.Comments = item.Comments.Take(20).ToList();

                item.NearSpot = new List<(string, double, string)>();
                records_spot.Sort((x, y) => { return GetDistance(x.lat, x.lng, item.lat, item.lng).CompareTo(GetDistance(y.lat, y.lng, item.lat, item.lng)); });
                item.NearSpot.AddRange(records_spot.Select(x => (x.Name, GetDistance(x.lat, x.lng, item.lat, item.lng), x.Address)).Take(10));
                item.NearSpot = item.NearSpot.Where(x => !x.Name.Equals(item.Name)).ToList();

                item.NearFood = new List<(string, double, string)>();
                records_food.Sort((x, y) => { return GetDistance(x.lat, x.lng, item.lat, item.lng).CompareTo(GetDistance(y.lat, y.lng, item.lat, item.lng)); });
                item.NearFood.AddRange(records_food.Select(x => (x.Name, GetDistance(x.lat, x.lng, item.lat, item.lng), x.Address)).Take(10));

                item.NearHotel = new List<(string, double, string)>();
                records_hotel.Sort((x, y) => { return GetDistance(x.lat, x.lng, item.lat, item.lng).CompareTo(GetDistance(y.lat, y.lng, item.lat, item.lng)); });
                item.NearHotel.AddRange(records_hotel.Select(x => (x.Name, GetDistance(x.lat, x.lng, item.lat, item.lng), x.Address)).Take(10));
            }

            //重新保存
            string json_sz = JsonConvert.SerializeObject(Spot_SZ, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder_WepApi + "深圳市旅游景点信息.json", false))
            {
                sw.Write(json_sz);
                sw.Close();
            }


            var sr2 = new StreamReader(JsonFolder_WepApi + "江门市旅游景点信息.json");
            var Spot_JM = JsonConvert.DeserializeObject<List<旅游景点信息>>(sr2.ReadToEnd());
            sr2.Close();

            sr2 = new StreamReader(JsonFolder_WepApi + "江门市旅游景点信息.json");
            records_spot = JsonConvert.DeserializeObject<List<旅游景点信息>>(sr2.ReadToEnd());
            sr2.Close();

            sr = new StreamReader(JsonFolder_WepApi + "江门市特色美食信息.json");
            records_food = JsonConvert.DeserializeObject<List<特色美食信息>>(sr.ReadToEnd());
            sr.Close();

            sr = new StreamReader(JsonFolder_WepApi + "江门市宾馆酒店信息.json");
            records_hotel = JsonConvert.DeserializeObject<List<宾馆酒店信息>>(sr.ReadToEnd());
            sr.Close();

            foreach (var item in Spot_JM)
            {
                item.Comments = item.Comments.Take(20).ToList();

                item.NearSpot = new List<(string, double, string)>();
                records_spot.Sort((x, y) => { return GetDistance(x.lat, x.lng, item.lat, item.lng).CompareTo(GetDistance(y.lat, y.lng, item.lat, item.lng)); });
                item.NearSpot.AddRange(records_spot.Select(x => (x.Name, GetDistance(x.lat, x.lng, item.lat, item.lng), x.Address)).Take(10));
                item.NearSpot = item.NearSpot.Where(x => !x.Name.Equals(item.Name)).ToList();

                item.NearFood = new List<(string, double, string)>();
                records_food.Sort((x, y) => { return GetDistance(x.lat, x.lng, item.lat, item.lng).CompareTo(GetDistance(y.lat, y.lng, item.lat, item.lng)); });
                item.NearFood.AddRange(records_food.Select(x => (x.Name, GetDistance(x.lat, x.lng, item.lat, item.lng), x.Address)).Take(10));

                item.NearHotel = new List<(string, double, string)>();
                records_hotel.Sort((x, y) => { return GetDistance(x.lat, x.lng, item.lat, item.lng).CompareTo(GetDistance(y.lat, y.lng, item.lat, item.lng)); });
                item.NearHotel.AddRange(records_hotel.Select(x => (x.Name, GetDistance(x.lat, x.lng, item.lat, item.lng), x.Address)).Take(10));
            }

            //重新保存
            string json_jm = JsonConvert.SerializeObject(Spot_JM, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder_WepApi + "江门市旅游景点信息.json", false))
            {
                sw.Write(json_jm);
                sw.Close();
            }

            var ALLSpot = Spot_SZ;
            ALLSpot.AddRange(Spot_JM);

            var GradeImport = ALLSpot.Where(x => !string.IsNullOrEmpty(x.ALevel) || !string.IsNullOrEmpty(x.Type)).Select(
                 (y) =>
                 {
                     if (y.Comments != null) y.Comments = y.Comments.Take(20).ToList();
                     return y;
                 }
             ).ToList();
            GradeImport.Sort((x, y) =>
            {
                if (x.ALevel.Length == y.ALevel.Length)
                {
                    return y.CommentCount - x.CommentCount;
                }
                else
                {
                    return y.ALevel.Length.CompareTo(x.ALevel.Length);
                }
            });
            string json = JsonConvert.SerializeObject(GradeImport, Formatting.None);
            using (var sw = new StreamWriter(JsonFolder_AngularAssets + "旅游景点信息.json", false))
            {
                sw.Write(json);
                sw.Close();
            }
        }
    }
}