using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

public class POI
{
    public string Name { get; set; }

    public int Price { get; set; }

    public string Description { get; set; }

    public string Address { get; set; }

    public double lat { get; set; }

    public double lng { get; set; }

    public List<string> Comments { get; set; }

    public int CommentCount { get; set; }
}

public class POI数据分析
{
    static List<POI> records = new List<POI>();
    public static void LoadData(string jsonFilename)
    {
        var sr = new StreamReader(jsonFilename);
        records = JsonConvert.DeserializeObject<List<POI>>(sr.ReadToEnd());
        sr.Close();
        //去掉评论
        foreach (var item in records)
        {
            item.Comments = null;
        }
    }
    public static void GetTop50Price(string jsonFilename, int limit = 50)
    {
        records.Sort((x, y) => { return y.Price - x.Price; });
        var json = JsonConvert.SerializeObject(records.Where(x => x.lat != -1).Take(limit).ToList(), Formatting.Indented);
        var sw = new StreamWriter(jsonFilename);
        sw.WriteLine(json);
        sw.Close();
    }
    public static void GetLow50Price(string jsonFilename, int limit = 50)
    {
        records.Sort((x, y) => { return x.Price - y.Price; });
        var json = JsonConvert.SerializeObject(records.Where(x => x.lat != -1 && x.Price != 0).Take(limit).ToList(), Formatting.Indented);
        var sw = new StreamWriter(jsonFilename);
        sw.WriteLine(json);
        sw.Close();
    }
}