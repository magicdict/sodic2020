
using System.Collections.Generic;

public class SpotInfo
{
    public string Name { get; set; }

    public string Type { get; set; }

    public string ALevel { get; set; }

    public string Address { get; set; }

    public string Description { get; set; }

    public decimal TicketPrice { get; set; }

    public string OpenTime { get; set; }

    public string ServiceTel { get; set; }

    public string IssueTel { get; set; }

    public string TrafficGuide { get; set; }

    public double lat { get; set; }

    public double lng { get; set; }

    public List<string> Comments { get; set; }
    /// <summary>
    /// 原始评论条数
    /// </summary>
    /// <value></value>
    public int CommentCount { get; set; }
}


public class FoodInfo
{
    public string Name { get; set; }

    public string Address { get; set; }

    public string[] Item { get; set; }

    public int Price { get; set; }

    public double lat { get; set; }

    public double lng { get; set; }

    public List<string> Comments { get; set; }

    public int CommentCount { get; set; }
}

public class HotelInfo
{
  public string Name { get; set; }

    public string Grade { get; set; }

    public string Distract { get; set; }

    public string Address { get; set; }

    public string ServiceTel { get; set; }

    public string Description { get; set; }

    public int Price { get; set; }

    public double lat { get; set; }

    public double lng { get; set; }

    public List<string> Comments { get; set; }

    public int CommentCount { get; set; }
}