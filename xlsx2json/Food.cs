using System.Linq;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using NPOI.XSSF.UserModel;
using NPOI.SS.UserModel;

public class 特色美食信息
{
    public string Name { get; set; }

    public string Address { get; set; }

    public string[] Item { get; set; }

    public int Price { get; set; }


    public static void CreateFood(string xlsxFilename, string jsonFilename)
    {
        var records = new List<特色美食信息>();
        var templetefs = new FileStream(xlsxFilename, FileMode.Open, FileAccess.Read);
        var hssfworkbook = new XSSFWorkbook(templetefs);
        var sheet = hssfworkbook.GetSheetAt(0);
        var rfirst = sheet.FirstRowNum;
        var rlast = sheet.LastRowNum;
        //去掉第一条
        for (int i = 1; i < rlast; i++)
        {
            var row = sheet.GetRow(i);
            var r = new 特色美食信息();
            r.Name = row.GetCell(0).StringCellValue;
            r.Address = row.GetCell(1).StringCellValue;
            r.Item = row.GetCell(2).StringCellValue.Split(",\n".ToCharArray()).Where(x => !string.IsNullOrEmpty(x)).Select(x => x.Trim()).ToArray();

            if (r.Item.Length == 1)
            {
                var itemline = r.Item[0];
                if (itemline.Split(" ").Length != 1)
                {
                    r.Item = itemline.Split(" ");
                }
                else
                {
                    if (itemline.Split("、").Length != 1) r.Item = itemline.Split("、");
                }
                r.Item = r.Item.Where(x => !string.IsNullOrEmpty(x)).Select(x => x.Trim()).ToArray();
            }

            r.Price = 0;
            if (row.GetCell(3).CellType == CellType.String)
            {
                var strPrice = row.GetCell(3).StringCellValue;
                if (string.IsNullOrEmpty(strPrice) || strPrice == "0")
                {
                    r.Price = 0;
                }
                else
                {
                    r.Price = int.Parse(strPrice.Substring(1));
                }
            }
            else
            {
                if (row.GetCell(3).CellType == CellType.Numeric) r.Price = (int)row.GetCell(3).NumericCellValue;
            }
            records.Add(r);
        }
        templetefs.Close();

        string json = JsonConvert.SerializeObject(records, Formatting.Indented);
        using (var sw = new StreamWriter(jsonFilename, false))
        {
            sw.Write(json);
            sw.Close();
        }

        var FoodRankDict = new Dictionary<string, int>();

        //美食排行榜
        foreach (var r in records)
        {
            foreach (var i in r.Item)
            {
                if (!FoodRankDict.ContainsKey(i)) FoodRankDict.Add(i, 0);
                FoodRankDict[i]++;
            }
        }

        var FoodRankTuple = new List<(string, int)>();
        FoodRankTuple = FoodRankDict.Select(x => (x.Key, x.Value)).ToList();
        FoodRankTuple.Sort((x, y) => y.Item2 - x.Item2);

        //Print一下看看
        foreach (var item in FoodRankTuple.Take(20))
        {
            System.Console.WriteLine(item.Item1 + ":" + item.Item2);
        }

        //平均消费
        var PriceAvg = records.Where(x => x.Price != 0).Average(x => x.Price);
        System.Console.WriteLine("平均消费:" + PriceAvg);
    }

}