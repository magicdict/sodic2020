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

            string json = JsonConvert.SerializeObject(records);
            using (var sw = new StreamWriter(jsonFilename, false))
            {
                sw.Write(json);
                sw.Close();
            }
        }

}