Page({
  data:{
    // text:"这是一个页面"
     id1:"back",
     id2:"clear",
     id3:"negative",
     id4:"+",
     id5:"9",
     id6:"8",
     id7:"7",
     id8:"-",
     id9:"6",
     id10:"5",
     id11:"4",
     id12:"×",
     id13:"3",
     id14:"2",
     id15:"1",
     id16:"÷",
     id17:"0",
     id18:".",
     id19:"history",
     id20:"=",
     screenData:"0",
     lastIsOperator:false,
     arr:[],
     logs:[]
  },
  history:function(){
      wx.navigateTo({
      url: '../list/list'
    })
  },
  clickButton:function(event){
    var id=event.target.id;//event.target 获取触发时间元素的ID
    console.log(id);//consolg.log
    if (id == this.data.id1) {//退格功能
      var data = this.data.screenData;
      data = data.substring(0, data.length - 1);
      if (data == "" || data == "-" || data == "0") {
        data = 0;
      }
      this.setData({ screenData: data });
      this.data.arr.pop();//pop 移除最后一个元素
    } 
    else if (id == this.data.id2) {//清屏
      this.setData({ screenData: "0" });
      this.data.arr.length = 0;
    }
    else if (id == this.data.id3) {//正负号
      var data = this.data.screenData;
      if (data == 0) {
        return;
      }
      var firstWord = data.substring(0, 1);
      if (firstWord == "-") {
        data = data.substring(1, data.length);
        this.data.arr.shift();
      } else {
        data = "-" + data;
        this.data.arr.unshift("-");
      }
      this.setData({ screenData: data });
    }
    else if (id == this.data.id20) {//=
      var data = this.data.screenData;
      if (data == 0) {
        return;
      }
      var lastWord = data.substring(data.length - 1, data.length);
      //substring 用来提取字符串介于两个指定下标之间的字符
      if (isNaN(lastWord) == true) {//isNaN用来检测isNaN(X)是否为非数字值
        return;
      }
      var num = "";
      var lastOperator;
      var arr = this.data.arr;
      var optarr = [];
      for (var i in arr) {
        if (isNaN(arr[i]) == false || arr[i] == this.data.id18 || arr[i] == this.data.id3) {
          num += arr[i];
        }
        else {
          lastOperator = arr[i];
          optarr.push(num);//push 在数组后面依次加入元素
          optarr.push(arr[i]);
          num = "";
        }
      }
      optarr.push(Number(num));//number 将对象值转换为数字
      console.log(result);
      for (var i = 1; i < optarr.length; i++) {//运算符号优先级的解决
        if (optarr[i] == this.data.id12) {
          optarr[i - 1] = optarr[i - 1] * optarr[i + 1];
          optarr[i + 1] = 1;
        }
        if (optarr[i] == this.data.id16) {
          optarr[i - 1] = optarr[i - 1] / optarr[i + 1];
          optarr[i + 1] = 1;
        }
      }
      var result = Number(optarr[0]);
      for (var i = 1; i < optarr.length; i++) {
        if (optarr[i] == this.data.id4) {
          result = result + Number(optarr[i + 1]);
        }
        else if (optarr[i] == this.data.id8) {
          result = result - Number(optarr[i + 1]);
        }
        else if (optarr[i] == this.data.id12) {
          result = result * Number(optarr[i + 1]);
        }
        else if (optarr[i] == this.data.id16) {
          result = result / Number(optarr[i + 1]);
        }
      }
      this.data.logs.push(data + "=" + result);
      wx.setStorageSync('callogs', this.data.logs);
      this.data.arr.length = 0;
      this.data.arr.push(result);
      this.setData({ screenData: result + "" });
    }
    else {
      if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
        if (this.data.lastIsOperator == true || this.data.screenData == 0) {
          return;
        }
      }
      var sd = this.data.screenData;
      var data;
      if(sd=="0"&&id=="0"){
        data=0;}
      else if(sd=="0"&&id!=0&&id!="."){
           data=id;
        }
      else {
        data=sd+id;
      }
      this.setData({ screenData: data });
      this.data.arr.push(id);
      if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
        this.setData({ lastIsOperator: true });
      } 
      else {
        this.setData({ lastIsOperator: false });
      }
    }
  }
})