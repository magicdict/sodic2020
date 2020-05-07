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
            var c = Comments.Where(x => x.Name == item.Name).FirstOrDefault();
            if (c != null)
            {
                item.Comments = c.Comments.Take(100).ToList();
                item.CommentCount = c.Comments.Count;
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

    public List<string> Comments { get; set; }

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
            var Name = row.GetCell(0).StringCellValue;
            var Food = records.Where(x => x.Name == Name).FirstOrDefault();
            if (Food == null)
            {
                var r = new 旅游景点评论();
                r.Name = Name;
                r.Comments = new List<string>();
                r.Comments.Add(row.GetCell(2).StringCellValue);
                records.Add(r);
            }
            else
            {
                Food.Comments.Add(row.GetCell(2).StringCellValue);
            }
        }
        return records;
    }

}