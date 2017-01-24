let moment = require('moment');

class Utils {
  constructor() {
  };

  /*
  *  通过ms时间转化成格式为'hh:mm:ss:SSS
  */
  getTimeFormatByMs(ms, callback){
    callback(
      moment(parseInt(ms)).format('hh:mm:ss:SSS').split(':').map((item, index) => {
        if(index === 0){
          item = '0' + (item - 8);
        }
        return item;
      })
    )
  }
  getTimeFormatByMsNoCallback(ms) {
    return moment(parseInt(ms)).format('hh:mm:ss:SSS').split(':').map((item, index) => {
      if(index === 0){
        item = '0' + (item - 8);
      }
      return item;
    })
  }
  getMsByFormatTime(timeArr){
    return timeArr.reduce(function(memo, value, index){
      switch(index){
        case 0:
          memo += parseInt(value) * 60 * 60 * 1000;
          break;
        case 1:
          memo += parseInt(value) * 60 * 1000;
          break;
        case 2:
          memo += parseInt(value) * 1000;
          break;
        case 3:
          memo += parseInt(value);
          break;
      }
      return memo;
    }, 0);
  }
  getFormatTimeByArr(timeArr){
    return _.map(timeArr, function(item){
      return item.value === "" ? '00' : item.value;
    }).join(':');
  }
  ajax(data, callback) {
    let ms = _.sample([100, 200, 300, 400, 500, 600, 700, 800, 1000, 1500, 2000]);
    setTimeout(function(){
      callback(data);
    }, ms);
  }
  validateInput(timeArr) {
    return timeArr.every(function(obj){
      return _.map(obj, 'errorTip').every(function(item){return !item});
    });
  }
  // TODO 不需要if-else
  validateInputValue({arr, type, status, tip, value}) {
    let str = '';
    if(status){
      str = tip;
      arr.forEach((item)=> {
        if(item.placeholder === type) {
          item.errorTip = true;
          if(value) item.value = value;
        }
      });
    }else{
      str = '';
      arr.forEach((item)=> {
        if(item.placeholder === type) {
          item.errorTip = false;
          if(value) item.value = value;
        }
      });
    }
    return str;
  }

  validateIsNaN({arr, value, type}) {
    return this.validateInputValue({arr, type, status: isNaN(value), tip: '请输入正常数字', value});
  }

  validateTime({arr, value, type, videoTotalDuration}){
    let tip = '';

    tip = this.validateIsNaN({arr, value, type});
    if(tip !== ''){
      return {arr, tip};
    }

    switch(type) {
      case '小时':
        this.getTimeFormatByMs(videoTotalDuration, (timeArr) =>{
          tip = this.validateInputValue({arr, type, status: parseInt(value) > parseInt(timeArr[0]), tip: '超出视频时间范围'});
        });
        break;
      case '分钟':
        tip = this.validateInputValue({arr, type, status: value > 59, tip: '分钟应小于60'});
        break;
      case '秒':
        tip = this.validateInputValue({arr, type, status: value > 59, tip: '秒应小于60'});
        break;
      case '毫秒':
        tip = this.validateInputValue({arr, type, status: value > 999, tip: '毫秒应小于1000'});
        break;
    }

    return {arr, tip};
  }

  rangeTime({begin, end, markDotBegin, markDotEnd}){

    if(this.getMsByFormatTime(_.map(begin, 'value')) < markDotBegin){
      return true;
    }
    if(this.getMsByFormatTime(_.map(end, 'value')) > markDotEnd){
      return true;
    }
    console.log(this.getMsByFormatTime(_.map(begin, 'value')), 'begin', this.getMsByFormatTime(_.map(end, 'value')), 'end', 'ppppp', markDotBegin)
    return false;
  }

  validateNumberFullWay(value, type){
    console.log(value, type, '-----111', value.length);
    switch(type) {
      case '小时':
      case '分钟':
      case '秒':
        if(value === ''){
          value = '00'
        }else if(value.length === 1){
          value = '0' + value;
        }else if(value.length > 2){
          value = value.subStr(0, 2);
        }
        break;
      case '毫秒':
        if(value === ''){
          value = '000'
        }else if(value.length === 1){
          value = '00' + value;
        }else if(value.length === 2){
          value = '0' + value;
        }else if(value.length > 3){
          value = value.subStr(0, 3);
        }
        break;
    }
    console.log(value, '===000000110101')
    return value;
  }

  validateNumberFull({arr, type}){
    arr.arr.forEach((item) => {
      if(item.placeholder === type){
        item.value = this.validateNumberFullWay(item.value, type);
      }
    });
  }

}

module.exports = new Utils();
