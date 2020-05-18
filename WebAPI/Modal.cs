
using System.Collections.Generic;

public class POI
{
    public string Name { get; set; }

    public int Price { get; set; }

    public string Description { get; set; }

    public string Address { get; set; }

    public double lat { get; set; }

    public double lng { get; set; }

    public List<string> Comments { get; set; }

    public int CommentCount { get; set; }

    public List<WordCloudItem> WordCloud { get; set; }

    public string City { get; set; }
}

public class SpotInfo : POI
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

    public List<clsTuple> NearFood { get; set; }

    public List<clsTuple> NearHotel { get; set; }

}

/// <summary>
/// 不支持Tuple，所以构建了clsTuple，只是为了JSON输出
/// </summary>
public class clsTuple
{
    public string Item1 { get; set; }

    public double Item2 { get; set; }
}

public class WordCloudItem
{
    public string name { get; set; }

    public int value { get; set; }
}


public class FoodInfo : POI
{
    public string[] Item { get; set; }
}

public class HotelInfo : POI
{
    public string Grade { get; set; }
    public string Distract { get; set; }
    public string ServiceTel { get; set; }
    public string ServiceFax { get; set; }
}