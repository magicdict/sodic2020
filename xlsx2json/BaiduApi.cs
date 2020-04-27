using System.IO;
using System.Net;
using System.Text;
using Newtonsoft.Json;

public class BaiduApi
{
    public static (double lat, double lng) GetGeoInfo(string Address)
    {
        var json = Get("http://api.map.baidu.com/geocoding/v3/?address=" + Address + "&output=json&ak=E79497e9924e284e95ac0b55e6df53f7&callback=showLocation");
        if (json.Contains("参数不存在"))
        {
            return (-1, -1);
        }
        json = json.Substring("showLocation&&showLocation(".Length).TrimEnd(")".ToCharArray());
        dynamic obj = JsonConvert.DeserializeObject(json);
        if (obj.status == 0)
        {
            var lat = obj.result.location.lat.Value;
            var lng = obj.result.location.lng.Value;
            return (lat, lng);
        }
        return (-1, -1);
    }

    static string Get(string url)
    {
        try
        {
            Encoding encoding = Encoding.UTF8;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "GET";
            request.Accept = "text/html, application/xhtml+xml, */*";
            request.ContentType = "application/json";
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            using (StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }
        catch (System.Exception)
        {
            return "参数不存在";
        }
    }
}