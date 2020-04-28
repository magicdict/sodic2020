using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;

public static class DataCenter
{
    public static List<SpotInfo> SpotList_SZ = new List<SpotInfo>();
    public static List<SpotInfo> SpotList_JM = new List<SpotInfo>();

    //const string JsonPath = @"F:\sodic2020\json\";  
    const string JsonPath = @"/root/sodic/json/";  
    
    public static void Init()
    {
        //读入景点信息
        var sr = new StreamReader(JsonPath + "深圳市旅游景点信息.json");
        SpotList_SZ = JsonConvert.DeserializeObject<List<SpotInfo>>(sr.ReadToEnd());
        sr.Close();

        sr = new StreamReader(JsonPath + "江门市旅游景点信息.json");
        SpotList_JM = JsonConvert.DeserializeObject<List<SpotInfo>>(sr.ReadToEnd());
        sr.Close();
    }
}