using System.Linq;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using NPOI.XSSF.UserModel;
using NPOI.SS.UserModel;
using System.Diagnostics.CodeAnalysis;

public class 旅游景点信息 : POI, IEqualityComparer<旅游景点信息>
{

    public string Type { get; set; }

    public string ALevel { get; set; }

    public string OpenTime { get; set; }

    public string ServiceTel { get; set; }

    public string IssueTel { get; set; }

    public string TrafficGuide { get; set; }

    public int ScoreCnt { get; set; }

    public double Scenery { get; set; }

    public double Funny { get; set; }

    public double PriceValue { get; set; }

    public double ScoreAvg
    {
        get
        {
            return System.Math.Round((Scenery + Funny + PriceValue) / 3, 2);
        }
    }

    public List<(string Name, double Distence)> NearFood { get; set; }

    public List<(string Name, double Distence)> NearHotel { get; set; }

    public static List<旅游景点信息> CreateSpot(string xlsxFilename, string jsonFilename, List<旅游景点评论> Comments)
    {
        var records = new List<旅游景点信息>();
        var templetefs = new FileStream(xlsxFilename, FileMode.Open, FileAccess.Read);
        var hssfworkbook = new XSSFWorkbook(templetefs);
        var sheet = hssfworkbook.GetSheetAt(0);
        var rfirst = sheet.FirstRowNum;
        var rlast = sheet.LastRowNum;
        //去掉第一条
        for (int i = 1; i < rlast; i++)
        {
            var row = sheet.GetRow(i);
            var r = new 旅游景点信息();
            r.City = BaiduApi.DefaultCity;
            r.Name = row.GetCell(0).StringCellValue;
            if (row.GetCell(1) != null) r.Type = row.GetCell(1).StringCellValue;
            if (row.GetCell(2) != null) r.ALevel = row.GetCell(2).StringCellValue;

            r.Address = row.GetCell(3).StringCellValue;
            r.Description = row.GetCell(4).StringCellValue.Trim();
            if (row.GetCell(5) != null)
            {
                if (row.GetCell(5).CellType == CellType.Numeric)
                {
                    r.Price = (int)(row.GetCell(5).NumericCellValue);
                }
                else
                {
                    if (!string.IsNullOrEmpty(row.GetCell(5).StringCellValue))
                    {
                        if (row.GetCell(5).StringCellValue.Contains("免费") || row.GetCell(5).StringCellValue.Contains("无"))
                        {
                            r.Price = 0;
                        }
                        else
                        {
                            r.Price = (int)double.Parse(row.GetCell(5).StringCellValue);
                        }
                    }
                }
                if (row.GetCell(6) != null) r.OpenTime = row.GetCell(6).StringCellValue;
                if (row.GetCell(7) != null)
                {
                    if (row.GetCell(7).CellType == CellType.Numeric)
                    {
                        r.ServiceTel = row.GetCell(7).NumericCellValue.ToString();
                    }
                    if (row.GetCell(7).CellType == CellType.String)
                    {
                        r.ServiceTel = row.GetCell(7).StringCellValue;
                    }

                }
                if (row.GetCell(8) != null)
                {
                    if (row.GetCell(8).CellType == CellType.Numeric)
                    {
                        r.IssueTel = row.GetCell(8).NumericCellValue.ToString();
                    }
                    if (row.GetCell(8).CellType == CellType.String)
                    {
                        r.IssueTel = row.GetCell(8).StringCellValue;
                    }

                }
                if (row.GetCell(9) != null) r.TrafficGuide = row.GetCell(9).StringCellValue;
            }
            records.Add(r);
        }
        templetefs.Close();
        records = records.Distinct(new 旅游景点信息()).ToList();

        //GEO信息取得
        foreach (var item in records)
        {
            var loc = BaiduApi.GetGeoInfo(item.Address);
            item.lat = loc.lat;
            item.lng = loc.lng;

            //评论
            var c = Comments.Where(x => x.Name == item.Name).ToList();
            if (c != null)
            {
                //词云的制作
                item.WordCloud = WordCloudItem.Create(c.Select(x => x.Comment).ToList(), 20);
                item.CommentCount = c.Count;
                item.Comments = c.Select(x => x.Comment).Take(50).ToList();
                //打分
                item.ScoreCnt = c.Where(x => x.Scenery != 0).Count();
                if (item.ScoreCnt != 0)
                {
                    item.Scenery = System.Math.Round(c.Where(x => x.Scenery != 0).Average(x => x.Scenery), 2);
                    item.Funny = System.Math.Round(c.Where(x => x.Funny != 0).Average(x => x.Funny), 2);
                    item.PriceValue = System.Math.Round(c.Where(x => x.PriceValue != 0).Average(x => x.PriceValue), 2);
                }
            }
        }

        string json = JsonConvert.SerializeObject(records, Formatting.Indented);
        using (var sw = new StreamWriter(jsonFilename, false))
        {
            sw.Write(json);
            sw.Close();
        }

        return records;
    }

    public bool Equals([AllowNull] 旅游景点信息 x, [AllowNull] 旅游景点信息 y)
    {
        return x.Name.Equals(y.Name) && x.Address.Equals(y.Address);
    }

    public int GetHashCode([DisallowNull] 旅游景点信息 obj)
    {
        return obj.Name.GetHashCode();
    }

    public static void CreateSpotSimple(string jsonFilename, string simplejsonfile)
    {
        var sr = new StreamReader(jsonFilename);
        var records = JsonConvert.DeserializeObject<List<旅游景点信息>>(sr.ReadToEnd());
        sr.Close();
        //去掉评论
        foreach (var item in records)
        {
            item.Comments = null;
            item.Description = null;
            item.TrafficGuide = null;
            item.OpenTime = null;
            item.WordCloud = null;
        }
        string json = JsonConvert.SerializeObject(records, Formatting.Indented);
        using (var sw = new StreamWriter(simplejsonfile, false))
        {
            sw.Write(json);
            sw.Close();
        }
    }
}

/// <summary>
/// 美食评论
/// </summary>
public class 旅游景点评论
{
    public string Name { get; set; }
    public string Comment { get; set; }
    public string CommentDate { get; set; }
    public int Scenery { get; set; }
    public int Funny { get; set; }
    public int PriceValue { get; set; }
    public static List<旅游景点评论> CreateSpotComment(string xlsxFilename)
    {
        var records = new List<旅游景点评论>();
        var templetefs = new FileStream(xlsxFilename, FileMode.Open, FileAccess.Read);
        var hssfworkbook = new XSSFWorkbook(templetefs);
        var sheet = hssfworkbook.GetSheetAt(0);
        var rfirst = sheet.FirstRowNum;
        var rlast = sheet.LastRowNum;
        //去掉第一条
        for (int i = 1; i < rlast; i++)
        {
            var row = sheet.GetRow(i);
            var r = new 旅游景点评论();
            r.Name = row.GetCell(0).StringCellValue;
            if (row.GetCell(1) != null && !string.IsNullOrEmpty(row.GetCell(1).StringCellValue))
            {
                var scores = row.GetCell(1).StringCellValue.Replace(" ", string.Empty).Split("\n");
                if (scores.Length == 3)
                {
                    r.Scenery = int.Parse(scores[0].Substring(3).Trim());
                    r.Funny = int.Parse(scores[1].Substring(3).Trim());
                    r.PriceValue = int.Parse(scores[2].Substring(4).Trim());
                }
            }
            r.Comment = row.GetCell(2).StringCellValue;
            r.CommentDate = row.GetCell(3).StringCellValue;
            records.Add(r);
        }
        return records;
    }
}