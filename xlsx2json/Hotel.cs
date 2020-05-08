using System.Linq;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using NPOI.XSSF.UserModel;
using NPOI.SS.UserModel;
using System.Diagnostics.CodeAnalysis;

public class 宾馆酒店信息 : POI, IEqualityComparer<宾馆酒店信息>
{

    public double Score { get; set; }
    public int ScoreCnt { get; set; }
    public string Grade { get; set; }
    public string Distract { get; set; }
    public string ServiceTel { get; set; }
    public string ServiceFax { get; set; }

    public static List<宾馆酒店信息> CreateHotel(string xlsxFilename, string jsonFilename, int LastColIdx, List<宾馆酒店评论> Comments)
    {
        var records = new List<宾馆酒店信息>();
        var templetefs = new FileStream(xlsxFilename, FileMode.Open, FileAccess.Read);
        var hssfworkbook = new XSSFWorkbook(templetefs);
        var sheet = hssfworkbook.GetSheetAt(0);
        var rfirst = sheet.FirstRowNum;
        var rlast = sheet.LastRowNum;
        //去掉第一条
        for (int i = 1; i < rlast; i++)
        {
            var row = sheet.GetRow(i);
            if (row.GetCell(0) == null) continue;
            var r = new 宾馆酒店信息();
            r.Name = row.GetCell(0).StringCellValue;
            if (string.IsNullOrEmpty(r.Name)) continue;
            if (row.GetCell(1) != null) r.Grade = row.GetCell(1).StringCellValue;

            var addr = row.GetCell(2).StringCellValue.Split("\n");
            r.Distract = "";
            r.Address = "";
            if (addr.Length == 3)
            {
                r.Distract = addr[1].Trim();
                r.Address = addr[2].Trim();
            }
            if (addr.Length == 2)
            {
                r.Distract = addr[0].Trim();
                r.Address = addr[1].Trim();
            }
            r.ServiceTel = "";
            r.ServiceFax = "";
            if (row.GetCell(3).CellType == CellType.String)
            {
                r.ServiceTel = row.GetCell(3).StringCellValue;
            }

            if (row.GetCell(3).CellType == CellType.Numeric)
            {
                r.ServiceTel = row.GetCell(3).NumericCellValue.ToString();
            }

            if (r.ServiceTel == "联系方式") r.ServiceTel = "";
            r.ServiceTel = r.ServiceTel.TrimEnd("纠错".ToArray()).Trim();
            if (r.ServiceTel.Contains("传真"))
            {
                r.ServiceFax = r.ServiceTel.Substring(r.ServiceTel.IndexOf("传真"));
                r.ServiceTel = r.ServiceTel.Substring(0, r.ServiceTel.IndexOf("传真"));
                r.ServiceFax = r.ServiceFax.TrimStart("传真".ToArray()).Trim();
            }
            if (!string.IsNullOrEmpty(r.ServiceTel)) r.ServiceTel = r.ServiceTel.TrimStart("电话".ToArray()).Trim();
            //Cell4是联系人，一模一样的

            r.Description = row.GetCell(LastColIdx - 1).StringCellValue.Trim();
            r.Price = 0;
            if (row.GetCell(LastColIdx).CellType == CellType.String)
            {
                var strPrice = row.GetCell(LastColIdx).StringCellValue;
                if (string.IsNullOrEmpty(strPrice) || strPrice == "0")
                {
                    r.Price = 0;
                }
                else
                {
                    int p;
                    if (int.TryParse(strPrice.Substring(1), out p)) r.Price = p;

                }
            }
            else
            {
                if (row.GetCell(LastColIdx).CellType == CellType.Numeric) r.Price = (int)row.GetCell(LastColIdx).NumericCellValue;
            }
            records.Add(r);
        }
        templetefs.Close();
        records = records.Distinct(new 宾馆酒店信息()).ToList();
        int cnt = 0;
        foreach (var item in records)
        {
            //评论
            var c = Comments.Where(x => x.Name == item.Name).ToList();
            if (c.Count != 0)
            {
                item.WordCloud = WordCloudItem.Create(c.Select(x => x.Comment).ToList(), 20);
                item.CommentCount = c.Count;
                item.ScoreCnt = c.Where(x => x.Score != 0).Count();
                if (item.ScoreCnt != 0) item.Score = System.Math.Round(c.Where(x => x.Score != 0).Average(x => x.Score), 4);
                item.Comments = c.Select(x => x.Comment).Take(50).ToList();
            }
            cnt++;
            //GEO信息取得
            var loc = BaiduApi.GetGeoInfo(item.Address);
            item.lat = loc.lat;
            item.lng = loc.lng;
        }

        string json = JsonConvert.SerializeObject(records, Formatting.Indented);
        using (var sw = new StreamWriter(jsonFilename, false))
        {
            sw.Write(json);
            sw.Close();
        }

        return records;
    }


    public bool Equals([AllowNull] 宾馆酒店信息 x, [AllowNull] 宾馆酒店信息 y)
    {
        return x.Name.Equals(y.Name) && x.Address.Equals(y.Address);
    }

    public int GetHashCode([DisallowNull] 宾馆酒店信息 obj)
    {
        return obj.Name.GetHashCode();
    }
}

public class 宾馆酒店评论
{
    public string Name { get; set; }
    public double Score { get; set; }
    public string Comment { get; set; }

    public static List<宾馆酒店评论> CreateHotelComment(string xlsxFilename)
    {
        var records = new List<宾馆酒店评论>();
        var templetefs = new FileStream(xlsxFilename, FileMode.Open, FileAccess.Read);
        var hssfworkbook = new XSSFWorkbook(templetefs);
        var sheet = hssfworkbook.GetSheetAt(0);
        var rfirst = sheet.FirstRowNum;
        var rlast = sheet.LastRowNum;
        //去掉第一条
        for (int i = 1; i < rlast; i++)
        {
            var row = sheet.GetRow(i);
            var r = new 宾馆酒店评论();
            r.Name = row.GetCell(0).StringCellValue; ;
            if (row.GetCell(1) != null)
            {
                if (row.GetCell(1).CellType == CellType.Numeric) r.Score = row.GetCell(1).NumericCellValue;
                if (row.GetCell(1).CellType == CellType.String)
                {
                    double s;
                    if (double.TryParse(row.GetCell(1).StringCellValue, out s)) r.Score = s;
                }
            }
            r.Comment = row.GetCell(2).StringCellValue;
            records.Add(r);
        }
        return records;
    }
}

