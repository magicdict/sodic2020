using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using JiebaNet.Segmenter;

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

    public List<WordCloudItem> WordCloud { get; set; }

    public string City { get; set; }
}

public class WordCloudItem
{
    public string name;

    public int value;

    public static JiebaSegmenter segmenter = new JiebaSegmenter();

    public static List<WordCloudItem> Create(List<string> comments, int Top = 20)
    {
        var r = new List<WordCloudItem>();
        var dic = new Dictionary<string, int>();
        foreach (var comment in comments)
        {
            var s = segmenter.Cut(comment);
            foreach (var w in s)
            {
                if (w.Length == 1) continue;    //标点，单个StopWorld的过滤
                if (!dic.ContainsKey(w)) dic.Add(w, 0);
                dic[w]++;
            }
        }
        r = dic.Select(x => { return new WordCloudItem() { name = x.Key, value = x.Value }; }).ToList();
        r.Sort((x, y) => { return y.value - x.value; });
        return r.Take(Top).ToList();
    }

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

    public static void GetPriceSegment()
    {
        var Below20 = records.Count(x => x.Price != 0 && x.Price < 20);
        var Range20_50 = records.Count(x => x.Price >= 20 && x.Price < 50);
        var Range50_100 = records.Count(x => x.Price >= 50 && x.Price < 100);
        var Range100_200 = records.Count(x => x.Price >= 100 && x.Price < 200);
        var Range200_500 = records.Count(x => x.Price >= 200 && x.Price < 500);
        var Range500_1000 = records.Count(x => x.Price >= 500 && x.Price < 1000);

        var Above500 = records.Count(x => x.Price >= 500);
        var Above1000 = records.Count(x => x.Price >= 1000);

        System.Console.WriteLine("20以下：" + Below20);
        System.Console.WriteLine("20-50：" + Range20_50);
        System.Console.WriteLine("50-100：" + Range50_100);
        System.Console.WriteLine("100-200：" + Range100_200);
        System.Console.WriteLine("200-500：" + Range200_500);
        System.Console.WriteLine("500-1000：" + Range500_1000);

        System.Console.WriteLine("500以上：" + Above500);
        System.Console.WriteLine("1000以上：" + Above1000);

        var Avg = records.Where(x => x.Price != 0).Average(x => x.Price);
        System.Console.WriteLine("Avg：" + Avg);
        System.Console.WriteLine("Count：" + records.Count(x => x.Price != 0));
    }
}