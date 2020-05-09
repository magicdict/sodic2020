using System.Collections.Generic;
using System.IO;
using NPOI.XSSF.UserModel;
using System.Linq;
using Newtonsoft.Json;

public class 停车场信息 : POI
{
    public static List<停车场信息> CreatePark(string xlsxFilename, string jsonFilename)
    {
        var records = new List<停车场信息>();
        var templetefs = new FileStream(xlsxFilename, FileMode.Open, FileAccess.Read);
        var hssfworkbook = new XSSFWorkbook(templetefs);
        var sheet = hssfworkbook.GetSheetAt(0);
        var rfirst = sheet.FirstRowNum;
        var rlast = sheet.LastRowNum;
        //去掉第一条
        for (int i = 1; i < rlast; i++)
        {
            var row = sheet.GetRow(i);
            var r = new 停车场信息();
            r.City = BaiduApi.DefaultCity;
            r.Name = row.GetCell(1).StringCellValue;
            var address = row.GetCell(2).StringCellValue;
            //对于地址进行处理
            //地址： 江门 鹤山市 广东省大雁山风景旅游区叠翠山庄
            var addressinfo = address.Split(" ");
            address = addressinfo.Last();
            if (address.StartsWith("广东省")) address = address.Substring(3);
            r.Address = address;
            records.Add(r);
        }

        foreach (var item in records)
        {
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
}