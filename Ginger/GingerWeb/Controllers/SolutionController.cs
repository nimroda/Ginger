using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ginger.SolutionGeneral;
using Microsoft.AspNetCore.Mvc;

namespace GingerWeb.Controllers
{
    [Route("api/[controller]")]
    public class SolutionController : Controller
    {

        

        [HttpGet("[action]")]
        public IEnumerable<object> Solutions()
        {

            List<Solution> solutions = new List<Solution>();
            solutions.Add(new Solution() { name = "s1", path = "p1" });
            solutions.Add(new Solution() { name = "s2", path = "p2" });

            return solutions;
        }
    }

    class Solution
    {
        public string name { get; set; }
        public string path { get; set; }
    }


}