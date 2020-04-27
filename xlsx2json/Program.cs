
using System;
namespace xlsx2json
{
    class Program
    {
        public const string JiangmenDataFolder = @"F:\sodic2020\非JSON数据\江门文旅数据\";
        public const string ShenzhenDataFolder = @"F:\sodic2020\非JSON数据\深圳文旅数据\";
        public const string JsonFolder = @"F:\sodic2020\UI\src\assets\json\";

        static void Main(string[] args)
        {
            Console.WriteLine("深圳市特色美食信息");
            特色美食信息.CreateFood(ShenzhenDataFolder + "深圳市特色美食信息.xlsx", JsonFolder + "深圳市特色美食信息.json");
            Console.WriteLine("江门市特色美食信息");
            特色美食信息.CreateFood(JiangmenDataFolder + "江门市特色美食信息.xlsx", JsonFolder + "江门市特色美食信息.json");

            //旅游景点信息.CreateSpot(ShenzhenDataFolder + "深圳市旅游景点信息.xlsx", JsonFolder + "深圳市旅游景点信息.json");
            //旅游景点信息.CreateSpot(JiangmenDataFolder + "江门市旅游景点信息.xlsx", JsonFolder + "江门市旅游景点信息.json");
            
            //宾馆酒店信息.CreateHotel(ShenzhenDataFolder + "深圳市宾馆酒店信息.xlsx", JsonFolder + "深圳市宾馆酒店信息.json", true, 6);
            //宾馆酒店信息.CreateHotel(JiangmenDataFolder + "江门市宾馆酒店信息.xlsx", JsonFolder + "江门市宾馆酒店信息.json", true, 5);

            //宾馆酒店信息.CreateHotel(ShenzhenDataFolder + "深圳市宾馆酒店信息.xlsx", JsonFolder + "深圳市宾馆酒店简化信息.json", false, 6);
            //宾馆酒店信息.CreateHotel(JiangmenDataFolder + "江门市宾馆酒店信息.xlsx", JsonFolder + "江门市宾馆酒店简化信息.json", false, 5);
            BaiduApi.GetGeoInfo("");
        }
    }
}


