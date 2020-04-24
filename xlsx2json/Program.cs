
namespace xlsx2json
{


    class Program
    {
        public const string JiangmenDataFolder = @"F:\sodic2020\非JSON数据\江门文旅数据\";
        public const string ShenzhenDataFolder = @"F:\sodic2020\非JSON数据\深圳文旅数据\";
        public const string JsonFolder = @"F:\sodic2020\UI\src\assets\json\";

        static void Main(string[] args)
        {
            //美食信息的读入
            特色美食信息.CreateFood(ShenzhenDataFolder + "深圳市特色美食信息.xlsx", JsonFolder + "深圳市特色美食信息.json");
            特色美食信息.CreateFood(JiangmenDataFolder + "江门市特色美食信息.xlsx", JsonFolder + "江门市特色美食信息.json");
        }
    }
}


