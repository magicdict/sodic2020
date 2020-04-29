using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

public class 特产品信息
{
    public string Name { get; set; }
    public string Description { get; set; }
    public static List<特产品信息> CreateGift(string xlsxFilename)
    {
        var records = new List<特产品信息>();
        var templetefs = new FileStream(xlsxFilename, FileMode.Open, FileAccess.Read);
        var hssfworkbook = new XSSFWorkbook(templetefs);
        var sheet = hssfworkbook.GetSheetAt(0);
        var rfirst = sheet.FirstRowNum;
        var rlast = sheet.LastRowNum;
        //去掉第一条
        for (int i = 1; i < rlast; i++)
        {
            var row = sheet.GetRow(i);
            var r = new 特产品信息();
            if (row.GetCell(0) != null) r.Name = row.GetCell(0).StringCellValue.Trim();
            if (row.GetCell(1) != null) r.Description = row.GetCell(1).StringCellValue.Trim();
            if (string.IsNullOrEmpty(r.Name) || string.IsNullOrEmpty(r.Description)) continue;
            records.Add(r);
        }
        return records;
    }
}