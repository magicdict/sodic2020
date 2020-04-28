﻿
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace xlsx2json
{
    class Program
    {
        public const string JiangmenDataFolder = @"F:\sodic2020\非JSON数据\江门文旅数据\";
        public const string ShenzhenDataFolder = @"F:\sodic2020\非JSON数据\深圳文旅数据\";
        public const string JsonFolder = @"F:\sodic2020\UI\src\assets\json\";

        static void Main(string[] args)
        {

            CreateFood();


            //宾馆酒店信息.CreateHotel(ShenzhenDataFolder + "深圳市宾馆酒店信息.xlsx", JsonFolder + "深圳市宾馆酒店信息.json", true, 6);
            //宾馆酒店信息.CreateHotel(JiangmenDataFolder + "江门市宾馆酒店信息.xlsx", JsonFolder + "江门市宾馆酒店信息.json", true, 5);

            //宾馆酒店信息.CreateHotel(ShenzhenDataFolder + "深圳市宾馆酒店信息.xlsx", JsonFolder + "深圳市宾馆酒店简化信息.json", false, 6);
            //宾馆酒店信息.CreateHotel(JiangmenDataFolder + "江门市宾馆酒店信息.xlsx", JsonFolder + "江门市宾馆酒店简化信息.json", false, 5);

        }

        static void CreateFood()
        {

            var FoodComment_SZ = 特色美食评论.CreateFoodComment(ShenzhenDataFolder + "深圳市特色美食评价信息.xlsx", JsonFolder + "深圳市特色美食评价信息.json");
            var Food_SZ = 特色美食信息.CreateFood(ShenzhenDataFolder + "深圳市特色美食信息.xlsx", JsonFolder + "深圳市特色美食信息.json", FoodComment_SZ);
            var FoodComment_JM = 特色美食评论.CreateFoodComment(JiangmenDataFolder + "江门市特色美食评价信息.xlsx", JsonFolder + "江门市特色美食评价信息.json");
            var Food_JM = 特色美食信息.CreateFood(JiangmenDataFolder + "江门市特色美食信息.xlsx", JsonFolder + "江门市特色美食信息.json", FoodComment_JM);

            Food_SZ.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            Food_JM.Sort((x, y) => { return y.CommentCount - x.CommentCount; });

            var HotFood = Food_SZ.Take(70).ToList();
            HotFood.AddRange(Food_JM.Take(30));
            HotFood = HotFood.Select(
                (y) =>
                {
                    if (y.Comments != null) y.Comments = y.Comments.Take(100).ToList();
                    return y;
                }
            ).ToList();

            HotFood.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            string json = JsonConvert.SerializeObject(HotFood, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder + "热门特色美食信息.json", false))
            {
                sw.Write(json);
                sw.Close();
            }

        }

        static void CreateSpot()
        {
            var SpotComment_SZ = 旅游景点评论.CreateSpotComment(ShenzhenDataFolder + "深圳市旅游景点评价信息.xlsx", JsonFolder + "深圳市旅游景点评价信息.json");
            var Spot_SZ = 旅游景点信息.CreateSpot(ShenzhenDataFolder + "深圳市旅游景点信息.xlsx", JsonFolder + "深圳市旅游景点信息.json", SpotComment_SZ);
            var SpotComment_JM = 旅游景点评论.CreateSpotComment(JiangmenDataFolder + "江门市旅游景点评价信息.xlsx", JsonFolder + "江门市旅游景点评价信息.json");
            var Spot_JM = 旅游景点信息.CreateSpot(JiangmenDataFolder + "江门市旅游景点信息.xlsx", JsonFolder + "江门市旅游景点信息.json", SpotComment_JM);

            var GradeASpot = Spot_SZ;
            GradeASpot.AddRange(Spot_JM);
            GradeASpot = GradeASpot.Where(x => !string.IsNullOrEmpty(x.ALevel)).Select(
                (y) =>
                {
                    if (y.Comments != null) y.Comments = y.Comments.Take(100).ToList();
                    return y;
                }
            ).ToList();
            GradeASpot.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            string json = JsonConvert.SerializeObject(GradeASpot, Formatting.Indented);
            using (var sw = new StreamWriter(JsonFolder + "A级旅游景点评价信息.json", false))
            {
                sw.Write(json);
                sw.Close();
            }
        }

    }
}


