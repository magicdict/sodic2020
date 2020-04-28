using System.Linq;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using NPOI.XSSF.UserModel;
using NPOI.SS.UserModel;
using System.Diagnostics.CodeAnalysis;

public class 宾馆酒店信息 : IEqualityComparer<宾馆酒店信息>
{

    public string Name { get; set; }

    public string Grade { get; set; }

    public string Distract { get; set; }

    public string Address { get; set; }

    public string ServiceTel { get; set; }

    public string Description { get; set; }

    public int Price { get; set; }


    public static void CreateHotel(string xlsxFilename, string jsonFilename, bool WithDescription, int LastColIdx = 5)
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
            if (row.GetCell(3).CellType == CellType.String)
            {
                r.ServiceTel = row.GetCell(3).StringCellValue;
            }

            if (row.GetCell(3).CellType == CellType.Numeric)
            {
                r.ServiceTel = row.GetCell(3).NumericCellValue.ToString();
            }
           
            r.ServiceTel = r.ServiceTel.TrimEnd("纠错".ToArray());
            //Cell4是联系人，一模一样的

            if (WithDescription) r.Description = row.GetCell(LastColIdx - 1).StringCellValue;
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
        string json = JsonConvert.SerializeObject(records, Formatting.Indented);
        using (var sw = new StreamWriter(jsonFilename, false))
        {
            sw.Write(json);
            sw.Close();
        }
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