using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using System.Drawing.Imaging;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppController : ControllerBase
    {
        [HttpGet(nameof(GetFootPrintList))]
        public List<FootPrint> GetFootPrintList()
        {
            return DataCenter.FootPrints;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [HttpPost(nameof(SetFootPrint))]
        public ActionResult SetFootPrint()
        {
            var files = Request.Form.Files;
            //返回的文件地址
            List<string> filenames = new List<string>();
            //文件存储路径
            var file = files[0];
            var originalImage = System.Drawing.Image.FromStream(file.OpenReadStream());
            var thumbImage = originalImage.GetThumbnailImage(128, 128, null, IntPtr.Zero);
            var filename = DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + file.FileName;
            var fileStream = new FileStream(DataCenter.imagefilefolder + filename, FileMode.Create);
            thumbImage.Save(fileStream, ImageFormat.Jpeg);
            fileStream.Close();
            var x = new FootPrint()
            {
                UserImage = filename,
                Title = Request.Form["Title"][0],
                Address = Request.Form["Address"][0],
                Description = Request.Form["Description"][0],
                Datetime = Request.Form["Datetime"][0],
            };
            DataCenter.FootPrints.Add(x);
            return new JsonResult("{'result':'OK'}");
        }

        [HttpGet(nameof(GetSpotComment))]
        public List<SpotComment> GetSpotComment()
        {
            return DataCenter.SpotComments;
        }

        /// <summary>
        /// 上传图片,通过Form表单提交
        /// </summary>
        /// <returns></returns>
        [HttpPost(nameof(SetSpotComment))]
        public ActionResult SetSpotComment()
        {
            var x = new SpotComment()
            {
                Name = Request.Form["Name"][0],
                Scenery = int.Parse(Request.Form["Scenery"][0]),
                Funny = int.Parse(Request.Form["Funny"][0]),
                PriceValue = int.Parse(Request.Form["PriceValue"][0]),
                Comment = Request.Form["Comment"][0],
            };
            DataCenter.SpotComments.Add(x);
            return new JsonResult("{'result':'OK'}");
        }
    }
}
