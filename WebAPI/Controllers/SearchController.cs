using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase
    {
        [HttpGet(nameof(SearchSpot))]
        public IEnumerable<SpotInfo> SearchSpot(string key)
        {
            var spots = new List<SpotInfo>();
            spots = DataCenter.SpotList_SZ.Where(x => x.Name.Contains(key)).ToList();
            spots.AddRange(DataCenter.SpotList_JM.Where(x => x.Name.Contains(key)).ToList());
            spots.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            return spots.Take(50);
        }

        [HttpGet(nameof(GetSpotByName))]
        public SpotInfo GetSpotByName(string Name)
        {
            var sz = DataCenter.SpotList_SZ.Find(x => x.Name == Name);
            if (sz != null) return sz;
            var jm = DataCenter.SpotList_JM.Find(x => x.Name == Name);
            if (jm != null) return jm;
            return null;
        }


        [HttpGet(nameof(SearchFood))]
        public IEnumerable<FoodInfo> SearchFood(string key)
        {
            var foods = new List<FoodInfo>();
            foods = DataCenter.FoodList_SZ.Where(x => x.Name.Contains(key) || x.Item.Contains(key)).ToList();
            foods.AddRange(DataCenter.FoodList_JM.Where(x => x.Name.Contains(key) || x.Item.Contains(key)).ToList());
            foods.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            return foods.Take(50);
        }

        [HttpGet(nameof(GetFoodByName))]
        public FoodInfo GetFoodByName(string Name)
        {
            var sz = DataCenter.FoodList_SZ.Find(x => x.Name.Replace("(", "").Replace(")", "") == Name);
            if (sz != null) return sz;
            var jm = DataCenter.FoodList_JM.Find(x => x.Name.Replace("(", "").Replace(")", "") == Name);
            if (jm != null) return jm;
            return new FoodInfo();
        }

        [HttpGet(nameof(SearchHotel))]
        public IEnumerable<HotelInfo> SearchHotel(string key)
        {
            var foods = new List<HotelInfo>();
            foods = DataCenter.HotelList_SZ.Where(x => x.Name.Contains(key)).ToList();
            foods.AddRange(DataCenter.HotelList_JM.Where(x => x.Name.Contains(key)));
            foods.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            return foods.Take(50);
        }

        [HttpGet(nameof(GetHotelByName))]
        public HotelInfo GetHotelByName(string Name)
        {
            var sz = DataCenter.HotelList_SZ.Find(x => x.Name.Replace("(", "").Replace(")", "") == Name);
            if (sz != null) return sz;
            var jm = DataCenter.HotelList_JM.Find(x => x.Name.Replace("(", "").Replace(")", "") == Name);
            if (jm != null) return jm;
            return new HotelInfo();
        }

    }
}
