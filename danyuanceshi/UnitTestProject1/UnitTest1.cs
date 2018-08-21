using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestSqu()
        {
            calhomework.Form1 form1 = new calhomework.Form1();
            var result = form1.Calsqu(1.4, 2.5);
            Assert.AreEqual(3.5, result);
        }
        [TestMethod]
        public void TestTri()
        {
            calhomework.Form1 form1 = new calhomework.Form1();
            var result = form1.Caltri(1, 2);
            Assert.AreEqual(1, result);
        }
        [TestMethod]
        public void TestCir()
        {
            calhomework.Form1 form1 = new calhomework.Form1();
            var result = form1.Calcir(2);
            Assert.AreEqual(3.14, result);
        }
        [TestMethod]
        public void TestDouble()
        {
            calhomework.Form1 form1 = new calhomework.Form1();
            var result = form1.Calsqu(1, 2);
            Assert.IsInstanceOfType(result, typeof(double));
        }
        [TestMethod]
        public void TestTriarea()
        {
            calhomework.Form1 form1 = new calhomework.Form1();
            var result = form1.Caltri(2, 3);
            Assert.AreEqual(3, result);
        }
    }
}