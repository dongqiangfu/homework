Page({
  data:{logs:[]},
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('callogs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})