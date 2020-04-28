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
            spots.AddRange(DataCenter.SpotList_JM.Where(x => x.Name.Contains(key)).ToList());;
            return spots;
        }
    }
}
