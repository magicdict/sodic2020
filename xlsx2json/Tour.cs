using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

public class 旅游目的地包团信息
{
    public string Name { get; set; }

    public int Price { get; set; }

    public string Description { get; set; }

    public string Days { get; set; }

    public bool IsContain(string SpotName)
    {
        if (Description.Contains(SpotName)) return true;
        if (SpotName.Contains("沙头角中英街"))  return Description.Contains("中英街");
        if (SpotName.Contains("欢乐谷"))  return Description.Contains("欢乐谷");
        if (SpotName.Contains("地王"))  return Description.Contains("地王");
        if (SpotName.Contains("鹏城美丽乡村")) return Description.Contains("大鹏古城");
        return false;
    }

    public static List<旅游目的地包团信息> CreateTour(string xlsxFilename)
    {
        var records = new List<旅游目的地包团信息>();
        var templetefs = new FileStream(xlsxFilename, FileMode.Open, FileAccess.Read);
        var hssfworkbook = new XSSFWorkbook(templetefs);
        var sheet = hssfworkbook.GetSheetAt(0);
        var rfirst = sheet.FirstRowNum;
        var rlast = sheet.LastRowNum;
        //去掉第一条
        for (int i = 1; i < rlast; i++)
        {
            var row = sheet.GetRow(i);
            var r = new 旅游目的地包团信息();
            if (row.GetCell(1) != null) r.Name = row.GetCell(1).StringCellValue;
            if (row.GetCell(2) != null)
            {
                if (row.GetCell(2).CellType == CellType.String)
                {
                    var strPrice = row.GetCell(2).StringCellValue;
                    if (string.IsNullOrEmpty(strPrice) || strPrice == "0")
                    {
                        r.Price = 0;
                    }
                    else
                    {
                        if (strPrice.Length != 1) r.Price = int.Parse(strPrice.Substring(1));
                    }
                }
                else
                {
                    if (row.GetCell(2).CellType == CellType.Numeric) r.Price = (int)row.GetCell(2).NumericCellValue;
                }
            }
            if (row.GetCell(3) != null) r.Description = row.GetCell(3).StringCellValue;
            if (row.GetCell(4) != null) r.Days = row.GetCell(4).StringCellValue;
            records.Add(r);
        }
        return records;
    }
}