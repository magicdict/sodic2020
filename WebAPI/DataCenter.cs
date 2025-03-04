using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;

public static class DataCenter
{
    public static List<SpotInfo> SpotList_SZ = new List<SpotInfo>();
    public static List<SpotInfo> SpotList_JM = new List<SpotInfo>();

    public static List<FoodInfo> FoodList_SZ = new List<FoodInfo>();
    public static List<FoodInfo> FoodList_JM = new List<FoodInfo>();

    public static List<HotelInfo> HotelList_SZ = new List<HotelInfo>();
    public static List<HotelInfo> HotelList_JM = new List<HotelInfo>();

    //public const string JsonPath = @"F:\sodic2020\json\";
    //public const string imagefilefolder = @"F:\sodic2020\Visualization\src\assets\image\";

    public const string JsonPath = @"/root/sodic/json/";
    public const string imagefilefolder = "/root/sodic/Visualization/assets/image/";

    //检索关键字
    public static Dictionary<string, int> SpotDict = new Dictionary<string, int>();
    public static Dictionary<string, int> FoodDict = new Dictionary<string, int>();
    public static Dictionary<string, int> HotelDict = new Dictionary<string, int>();
    public static List<FootPrint> FootPrints = new List<FootPrint>();
    public static List<SpotComment> SpotComments = new List<SpotComment>();
    public static List<Favourite> Favourites = new List<Favourite>();

    public static void Init()
    {
        //读入景点信息
        var sr = new StreamReader(JsonPath + "深圳市旅游景点信息.json");
        SpotList_SZ = JsonConvert.DeserializeObject<List<SpotInfo>>(sr.ReadToEnd());
        sr.Close();

        sr = new StreamReader(JsonPath + "江门市旅游景点信息.json");
        SpotList_JM = JsonConvert.DeserializeObject<List<SpotInfo>>(sr.ReadToEnd());
        sr.Close();

        sr = new StreamReader(JsonPath + "深圳市特色美食信息.json");
        FoodList_SZ = JsonConvert.DeserializeObject<List<FoodInfo>>(sr.ReadToEnd());
        sr.Close();

        sr = new StreamReader(JsonPath + "江门市特色美食信息.json");
        FoodList_JM = JsonConvert.DeserializeObject<List<FoodInfo>>(sr.ReadToEnd());
        sr.Close();

        sr = new StreamReader(JsonPath + "深圳市宾馆酒店信息.json");
        HotelList_SZ = JsonConvert.DeserializeObject<List<HotelInfo>>(sr.ReadToEnd());
        sr.Close();

        sr = new StreamReader(JsonPath + "江门市宾馆酒店信息.json");
        HotelList_JM = JsonConvert.DeserializeObject<List<HotelInfo>>(sr.ReadToEnd());
        sr.Close();

        LoadStatistics();
    }

    public static void SaveStatistics()
    {
        var s = new Statistics();
        s.Favourites = Favourites;
        s.FoodDict = FoodDict;
        s.FootPrints = FootPrints;
        s.HotelDict = HotelDict;
        s.SpotComments = SpotComments;
        s.SpotDict = SpotDict;
        string json_sz = JsonConvert.SerializeObject(s, Formatting.Indented);
        using (var sw = new StreamWriter(JsonPath + "Statistics.json", false))
        {
            sw.Write(json_sz);
            sw.Close();
        }
    }

    public static void LoadStatistics()
    {
        if (!System.IO.File.Exists(JsonPath + "Statistics.json")) return;
        var sr = new StreamReader(JsonPath + "Statistics.json");
        var s = new Statistics();
        s = JsonConvert.DeserializeObject<Statistics>(sr.ReadToEnd());
        sr.Close();
        Favourites = s.Favourites;
        FoodDict = s.FoodDict;
        FootPrints = s.FootPrints;
        HotelDict = s.HotelDict;
        SpotComments = s.SpotComments;
        SpotDict = s.SpotDict;
    }
}