using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Drawing.Imaging;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase
    {
        [HttpGet(nameof(SearchSpot))]
        public IEnumerable<SpotInfo> SearchSpot(string key)
        {
            if (!DataCenter.SpotDict.ContainsKey(key)) DataCenter.SpotDict.Add(key, 0);
            DataCenter.SpotDict[key]++;
            var spots = new List<SpotInfo>();
            spots = DataCenter.SpotList_SZ.Where(x => x.Name.Contains(key)).ToList();
            spots.AddRange(DataCenter.SpotList_JM.Where(x => x.Name.Contains(key)).ToList());
            spots.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            return spots.Take(50);
        }

        [HttpGet(nameof(GetSpotByName))]
        public SpotInfo GetSpotByName(string Name)
        {
            if (!DataCenter.SpotDict.ContainsKey(Name)) DataCenter.SpotDict.Add(Name, 0);
            DataCenter.SpotDict[Name]++;
            var sz = DataCenter.SpotList_SZ.Find(x => x.Name == Name);
            if (sz != null) return sz;
            var jm = DataCenter.SpotList_JM.Find(x => x.Name == Name);
            if (jm != null) return jm;
            return null;
        }


        [HttpGet(nameof(SearchFood))]
        public IEnumerable<FoodInfo> SearchFood(string key)
        {
            if (!DataCenter.FoodDict.ContainsKey(key)) DataCenter.FoodDict.Add(key, 0);
            DataCenter.FoodDict[key]++;
            var foods = new List<FoodInfo>();
            foods = DataCenter.FoodList_SZ.Where(x => x.Name.Contains(key) || x.Item.Contains(key)).ToList();
            foods.AddRange(DataCenter.FoodList_JM.Where(x => x.Name.Contains(key) || x.Item.Contains(key)).ToList());
            foods.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            return foods.Take(50);
        }

        [HttpGet(nameof(GetFoodByName))]
        public FoodInfo GetFoodByName(string Name)
        {
            if (!DataCenter.FoodDict.ContainsKey(Name)) DataCenter.FoodDict.Add(Name, 0);
            DataCenter.FoodDict[Name]++;
            var sz = DataCenter.FoodList_SZ.Find(x => x.Name.Replace("(", "").Replace(")", "") == Name);
            if (sz != null) return sz;
            var jm = DataCenter.FoodList_JM.Find(x => x.Name.Replace("(", "").Replace(")", "") == Name);
            if (jm != null) return jm;
            return new FoodInfo();
        }

        [HttpGet(nameof(SearchHotel))]
        public IEnumerable<HotelInfo> SearchHotel(string key)
        {
            if (!DataCenter.HotelDict.ContainsKey(key)) DataCenter.HotelDict.Add(key, 0);
            DataCenter.HotelDict[key]++;
            var foods = new List<HotelInfo>();
            foods = DataCenter.HotelList_SZ.Where(x => x.Name.Contains(key)).ToList();
            foods.AddRange(DataCenter.HotelList_JM.Where(x => x.Name.Contains(key)));
            foods.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            return foods.Take(50);
        }

        [HttpGet(nameof(GetHotelByName))]
        public HotelInfo GetHotelByName(string Name)
        {
            if (!DataCenter.HotelDict.ContainsKey(Name)) DataCenter.HotelDict.Add(Name, 0);
            DataCenter.HotelDict[Name]++;
            var sz = DataCenter.HotelList_SZ.Find(x => x.Name.Replace("(", "").Replace(")", "") == Name);
            if (sz != null) return sz;
            var jm = DataCenter.HotelList_JM.Find(x => x.Name.Replace("(", "").Replace(")", "") == Name);
            if (jm != null) return jm;
            return new HotelInfo();
        }

        [HttpGet(nameof(GetSearchKey))]
        public SearchKey GetSearchKey()
        {
            var r = new SearchKey();
            r.Spot = DataCenter.SpotDict.Select(x => new WordCloudItem() { name = x.Key, value = x.Value }).ToList();
            r.Spot.Sort((x, y) => { return y.value - x.value; });

            r.Food = DataCenter.FoodDict.Select(x => new WordCloudItem() { name = x.Key, value = x.Value }).ToList();
            r.Food.Sort((x, y) => { return y.value - x.value; });

            r.Hotel = DataCenter.HotelDict.Select(x => new WordCloudItem() { name = x.Key, value = x.Value }).ToList();
            r.Hotel.Sort((x, y) => { return y.value - x.value; });
            return r;
        }
    }
}
