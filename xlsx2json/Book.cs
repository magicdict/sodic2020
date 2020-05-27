using System.Collections.Generic;
using System.IO;
using NPOI.HSSF.UserModel;
using NPOI.XSSF.UserModel;
using System;
using Newtonsoft.Json;

public class 中英街预约信息
{
    public DateTime Date { get; set; }

    public DayOfWeek WeekDay
    {
        get
        {
            return Date.DayOfWeek;
        }
    }

    public int TotalBook { get; set; }

    public int OnlineBook { get; set; }

    public int FrontBook { get; set; }

    public int TeamBook { get; set; }

    public int SpotBook { get; set; }

    public int Cancel { get; set; }

    public static List<中英街预约信息> CreateBook(string xlsxFilename, string jsonFilename)
    {
        var records = new List<中英街预约信息>();
        var templetefs = new FileStream(xlsxFilename, FileMode.Open, FileAccess.Read);
        var hssfworkbook = new HSSFWorkbook(templetefs);
        var sheet = hssfworkbook.GetSheetAt(0);
        var rfirst = sheet.FirstRowNum;
        var rlast = sheet.LastRowNum;
        //去掉第一条
        for (int i = 1; i < rlast; i++)
        {
            var row = sheet.GetRow(i);
            var r = new 中英街预约信息();
            r.Date = row.GetCell(0).DateCellValue;
            r.TotalBook = (int)row.GetCell(1).NumericCellValue;
            r.OnlineBook = (int)row.GetCell(2).NumericCellValue;
            r.FrontBook = (int)row.GetCell(3).NumericCellValue;
            r.TeamBook = (int)row.GetCell(4).NumericCellValue;
            r.SpotBook = (int)row.GetCell(5).NumericCellValue;
            r.Cancel = (int)row.GetCell(6).NumericCellValue;
            records.Add(r);
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


public class 大梅沙预约信息
{
    [JsonIgnore]
    public int intDate { get; set; }

    public DateTime Date
    {
        get
        {
            var year = int.Parse(intDate.ToString().Substring(0, 4));
            var month = int.Parse(intDate.ToString().Substring(4, 2));
            var day = int.Parse(intDate.ToString().Substring(6, 2));
            return new DateTime(year, month, day);
        }
    }


    public DayOfWeek WeekDay
    {
        get
        {
            return Date.DayOfWeek;
        }
    }

    public int LimitCount { get; set; }

    public int InCount { get; set; }

    public int FrontBook { get; set; }

    public int OnlineBook { get; set; }

    public int Cancel { get; set; }

    public int Cancel_TimeOut { get; set; }

    public int TotalBook
    {
        get
        {
            return FrontBook + OnlineBook;
        }
    }

    public int AvalibleBook
    {
        get
        {
            return TotalBook - Cancel;
        }
    }


    public static List<大梅沙预约信息> CreateBook(string xlsxFilename, string jsonFilename)
    {
        var records = new List<大梅沙预约信息>();
        var templetefs = new FileStream(xlsxFilename, FileMode.Open, FileAccess.Read);
        var hssfworkbook = new XSSFWorkbook(templetefs);
        var sheet = hssfworkbook.GetSheetAt(0);
        var rfirst = sheet.FirstRowNum;
        var rlast = sheet.LastRowNum;
        //去掉前2条
        for (int i = 2; i < rlast; i++)
        {
            var row = sheet.GetRow(i);
            var r = new 大梅沙预约信息();
            r.intDate = (int)row.GetCell(0).NumericCellValue;
            r.LimitCount = (int)row.GetCell(1).NumericCellValue;
            r.InCount = (int)row.GetCell(2).NumericCellValue;
            r.FrontBook = (int)row.GetCell(3).NumericCellValue;
            r.OnlineBook = (int)row.GetCell(4).NumericCellValue;
            r.Cancel = (int)row.GetCell(5).NumericCellValue;
            r.Cancel_TimeOut = (int)row.GetCell(6).NumericCellValue;
            records.Add(r);
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