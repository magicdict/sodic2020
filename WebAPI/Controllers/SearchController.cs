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

        [HttpGet(nameof(SearchFood))]
        public IEnumerable<FoodInfo> SearchFood(string key)
        {
            var foods = new List<FoodInfo>();
            foods = DataCenter.FoodList_SZ.Where(x => x.Name.Contains(key) || x.Item.Contains(key)).ToList();
            foods.AddRange(DataCenter.FoodList_JM.Where(x => x.Name.Contains(key) || x.Item.Contains(key)).ToList());
            foods.Sort((x, y) => { return y.CommentCount - x.CommentCount; });
            return foods.Take(50);
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
    }
}
