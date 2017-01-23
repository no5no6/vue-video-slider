
let _ = require('lodash');
let Vue = require('vue');
let bus = require('../utils/bus');
let utils = require('../utils/utils');


const state = {
  leftDiv: 0, // slider左侧div长度
  leftCurrentPointWidth: 0, // slider从左边到当前指针的宽度
  currentPoint: 0, // slider当前指针相对滚动条位置位置 单位px
  dotWidth: 0, // 打点区间长度
  dotState: 0, // 打点状态 0未开始 1开始 2结束
  dotButtonText: '开始', // 打点按钮文字
  markDot: 0, // 打点起始位置记录
  markEndDot: 0, //打点结束位置记录
  currentTime: 0,  // 当前时间
  videoTotalDuration: 0, //视频总时长ms
  thumbnailImageSumNum: 0, //视频需展示缩略图数量   总时长ms除以步长（250ms）
  sliderStep: 0, //slider一步长   因滚动条每次增长是百分比，而不是像素，固每一步长度为  1除以图片总数
  sliderWidth: 640,  //slider 宽度
  videoUrl: "http://testdianbo.kuyun.com/dianbo/video/",
  imageArr: [], // 视频秒0.25秒缩略图数组
  imageLoadNum: 9, //每次加载多少张图片
  imageUrl: "http://testdianbo.kuyun.com/dianbo/pic/",
  sliderStepMS: 250, //步长 ms
  sumStep: 0, // 总步数
  beginDotTime: [{value:'00', placeholder:'小时', errorTip: false}, {value:'00', placeholder:'分钟', errorTip: false}, {value:'00', placeholder:'秒', errorTip: false}, {value:'000', placeholder:'毫秒', errorTip: false}], // 打点开始时间
  endDotTime: [{value:'00', placeholder:'小时', errorTip: false}, {value:'00', placeholder:'分钟', errorTip: false}, {value:'00', placeholder:'秒', errorTip: false}, {value:'000', placeholder:'毫秒', errorTip: false}], // 打点结束时间
  beginDotFormat: '',
  endDotFormat: '',
  beginInputStatus: false, // 文本框是否可以操作
  endInputStatus: true, // 文本框是否可以操作
  timeInputErrorText: '', // 文本框输入开始结束时间报错提示信息
  dotValidateStatus: true, // 文本框输入是否还有不合法的值，如果没有为true，反之false
  videoStatus: false, //视频播放状态，true是播放，false是暂停，用于只有暂停状态才能打点的判断
  // videoEndTime: 0, // 视频结束时间
  videoId: '', // 当前视频id
  operatorId: '', // 当前编辑人id
  operatorName: '', // 当前编辑人姓名
  videoOptions: false, // 视频属性
  markDotBegin: 0, // 记录打点开始时间 ms
  markDotEnd: 0, // 记录打点结束时间 ms
  currentVideoTime: 0,  // 当前视频实际播放时间
}

const mutations = {
  unDotDrag (state) {
    state.leftDiv = state.leftCurrentPointWidth;
  },
  dotBeginDrag(state) {
    state.dotWidth = state.leftCurrentPointWidth - state.markDot
  },
  cancelDot(state){
    state.dotWidth = 0;
    state.leftDiv = state.leftCurrentPointWidth;
    state.dotState = 0;
    state.beginInputStatus = false;
    state.endInputStatus = true;
    state.dotButtonText = '开始';
    bus.slider.disabled = false;

    [state.beginDotTime, state.endDotTime].forEach(function(item, index){
      let timeArr = _.map(state.endDotTime, 'value');
      item.forEach(function(obj, i){
        obj.value = timeArr[i];
        obj.errorTip = false;
      });
    });
  },
  beginDot(state) {
    state.dotState = 1;
    state.markDot = state.leftCurrentPointWidth;
    state.leftDiv = state.markDot;
    state.beginInputStatus = true;
    state.endInputStatus = false;
    state.dotButtonText = '结束';
  },
  endDot(state) {
    state.dotState = 2;
    state.markEndDot = state.leftCurrentPointWidth;
    state.beginInputStatus = true;
    state.endInputStatus = true;
    state.dotButtonText = '完成';
    state.beginDotFormat = _.map(state.beginDotTime, 'value').join(':');
    state.endDotFormat = _.map(state.endDotTime, 'value').join(':');
  },
  setDotFormat(state, {begin, end}) {
    state.beginDotFormat = "";
    state.endDotFormat = "";
  },
  syncDragCurrentTime(state, {currentTime, x}) {
    state.currentTime = currentTime;
    state.leftCurrentPointWidth = x * state.sliderWidth;
    state.currentPoint = x;
  },
  // syncDragCurrenImage(state, options){
  //   state.imageArr = null;
  //   state.imageArr = _.range(state.imageLoadNum).reduce(function(memo, item, index){
  //     memo.push(
  //       {
  //         url: state.currentTime === 0 && index === 0 ? noneImage : state.imageUrl + (state.currentTime + index * state.sliderStepMS) + '.jpg',
  //         time: utils.getTimeFormatByMsNoCallback(state.currentTime + index * state.sliderStepMS).join(':'),
  //         display: index === 0 ? 'visible' : 'hidden'
  //       }
  //     );
  //     return memo;
  //   }, [])
  // },
  syncInput(state, {currentTime, arr}){
    utils.getTimeFormatByMs(currentTime, function(timeArr){
      arr.forEach(function(obj){
        obj.forEach(function(item, index){
          item.value = timeArr[index];
        });
      });
    });
  },
  validateInputValue(state, {value, type, name, status, tip}) {
    if(value === '' || isNaN(value)){
      state.timeInputErrorText = '请输入正确数字'
      state[name].forEach((item)=> {if(item.placeholder === type) item.errorTip = true});
    }else {
      if(status){
        state.timeInputErrorText = tip
        state[name].forEach((item)=> {if(item.placeholder === type) item.errorTip = true});
      }else{
        state.timeInputErrorText = ''
        state[name].forEach((item)=> {if(item.placeholder === type) item.errorTip = false});
      }
    }
  },
  setDotTimeInput(state, {value, name, type}){
    state[name].forEach((item)=> { if(item.placeholder === type) item.value = value});
    state.currentTime = utils.getMsByFormatTime(_.map(state[name], 'value'));
    state.currentPoint = state.currentTime / state.sliderStepMS * state.sliderStep;
  },
  rectifySlider(state, {value, name, type}) {
    state.dotState = 0;
  },
  validateInput(state) {
    state.dotValidateStatus = [state.beginDotTime, state.endDotTime].every(function(obj){
      return _.map(obj, 'errorTip').every(function(item){return !item});
    });
  },
  playState(state, {status}) {
    state.videoStatus = status;
  },
  setDotRange(state, {begin, end}){
    state.markDotBegin = begin;
    state.markDotEnd = end;
  },
  setTimeRange(state, {begin, end}) {
    [state.beginDotTime, state.endDotTime].forEach(function(item, index){
      let timeArr = utils.getTimeFormatByMsNoCallback([begin, end][index]);
      item.forEach(function(obj, i){
        obj.value = timeArr[i];
      });
    });
    state.markDotBegin = begin;
    state.markDotEnd = end;
    state.currentTime = begin;
    state.currentPoint = begin / state.sliderStepMS * state.sliderStep;
    state.leftCurrentPointWidth = begin / state.sliderStepMS * state.sliderStep * state.sliderWidth;
    state.dotWidth = end / state.sliderStepMS * state.sliderStep * state.sliderWidth - state.leftCurrentPointWidth;
  },
  setPageParams(state, options) {
    state.videoId = options.id || 1;
    state.operatorId = options.operator_id;
    state.operatorName = options.operator_name;
  },
  videoInit(state, {seconds}) {
    state.videoTotalDuration = seconds * 1000;
    state.sumStep = state.videoTotalDuration / state.sliderStepMS;
    state.sliderStep = 1 / state.sumStep;
    console.log(state.sliderStep, '12312312321321');

  },
  loadVideo(state, options) {
    state.videoOptions = options;
  },
  updateCurrentVideoTime(state, {currentTime}) {
    state.currentVideoTime = currentTime;
  }
}

const actions = {
  beginDot({commit, state}, options) {
    commit('beginDot');
  },
  endDot({commit, state}, options) {
    commit('endDot');
  },
  syncDragCurrentTime ({commit, state}, options){
    let arr = [];
    commit('syncDragCurrentTime', options);
    // commit('syncDragCurrenImage');

    if(state.dotState === 0){
      commit('unDotDrag');
      arr = [state.beginDotTime, state.endDotTime];
    }else if(state.dotState === 1){
      commit('dotBeginDrag');
      arr = [state.endDotTime];
    }
    // 如果拖拽slider小于之前起始点，取消更改打点状态为未开始
    if(state.dotWidth < 0) {
      commit('cancelDot');
      arr = [state.beginDotTime, state.endDotTime];
    }

    /**
    *  同步打点开始结束时间文本框
    *  如果开始打点则只同步起始位置
    */
    commit('syncInput', {currentTime: state.currentTime, arr: arr});
  },
  validateTime({commit, state}, {value, type, name}){
    console.log(isNaN(value), '!isNaN(value)');

    switch(type) {
      case '小时':
        utils.getTimeFormatByMs(state.videoTotalDuration, (timeArr) =>{
          commit('validateInputValue', {value, type, name, status: parseInt(value) > parseInt(timeArr[0]), tip: '超出视频时间范围'});
        });
        break;
      case '分钟':
        commit('validateInputValue', {value ,type, name, status: value > 59, tip: '分钟应小于60'});
        break;
      case '秒':
        commit('validateInputValue', {value, type, name, status: value > 59, tip: '秒应小于60'});
        break;
      case '毫秒':
        commit('validateInputValue', {value, type, name, status: value > 999, tip: '毫秒应小于1000'});
        break;
    }
    commit('validateInput')

  },
  dotSync({commit, state}, {value, type, name}) {
    if(state.dotValidateStatus){
      commit('setDotTimeInput', {value, type, name});
      //如果开始时间大于结束时间，设定为用户需要调整打点起始点，开始时间与结束时间相同，并取消打点开始状态。
      if(utils.getMsByFormatTime(_.map(state.beginDotTime, 'value')) > utils.getMsByFormatTime(_.map(state.endDotTime, 'value'))) commit('cancelDot');
      // commit('syncDragCurrenImage');
    }
  },
  playState({commit, state}, options){
    commit('playState', options)
  },
  setTimeRange({commit, state}, {begin, end}) {
    commit('setTimeRange', {begin, end});
    // commit('syncDragCurrenImage', {currentTime: end, x: end * state.sliderStep});
    commit('beginDot');
    commit('endDot');
  },
  setDotRange({commit, state}, options){
    commit('setDotRange', options);
  },
  clearVideo({commit, state}){
    commit('cancelDot');
  },
  videoInit ({commit, state}, options) {
    // commit('videoInit', data.data.data_list);
    commit('loadVideo', options);
    commit('videoInit', options);
  },
  setPageParams({commit, state}, options) {
    commit('setPageParams', options);
  },
  updateCurrentVideoTime({commit, state}, options) {
    commit('updateCurrentVideoTime', options);
  },
  setDotFormat({commit, state}, options) {
    commit('setDotFormat', options);
  }
}

const getters = {
  getRangeTime (state){
    return {
      begin: utils.getFormatTimeByArr(state.beginDotTime),
      end: utils.getFormatTimeByArr(state.endDotTime)
    }
  }
}

module.exports = {
  state,
  actions,
  getters,
  mutations
}
