<template>
  <div :style="{width: Video.sliderWidth + 'px'}" >
    <div id="just-a-slider" class="dragdealer">
      <div id="progress0" :style="{width: Video.sliderWidth + 'px'}">
        <div id="progress1" :style="{width: Video.leftDiv + 'px'}"></div>
        <div id="progress2" :style="[{width: Video.dotWidth + 'px'}, {'margin-left': Video.leftDiv + 'px'}]"></div>
        <div id="progress3" :style="{'margin-left': Video.leftCurrentPointWidth+'px'}"></div>
      </div>
      <div class="handle red-bar">
        <span id="sliderValue" @dblclick="dot" class="value">{{Video.dotButtonText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Dragdealer from 'dragdealer';
  import 'dragdealer/src/dragdealer.css';
  import store from '../store';
  import bus from '../utils/bus';
  import busEvent from '../utils/busEvent';

  export default {
    name: 'VideoDotSlider',
    // props: ['sliderWidth'],
    data(){
      return {
        timer: null,
      }
    },
    methods: {
      dot(){
        if(this.Video.videoStatus) return;

        if(this.Video.dotButtonText === '开始'){
          store.dispatch('beginDot', {status: 1});
          this.$emit('syncDotTimeBeginInput');
          this.$emit('beginMark');
        }else{
          store.dispatch('endDot', {status: 2});
          bus.slider.disabled = true;
          this.$emit('endMark');
        }
      },
      bindEvent() {
        busEvent.$on('setDot',(value) =>{
          this.dot();
        }),

        busEvent.$on('setPoint',(value) =>{
          bus.slider.setValue(value);
        }),
        busEvent.$on('play', y =>{
          let begin = y =>{
            bus.slider.setValue(bus.slider.getValue()[0] + this.Video.sliderStep);
          }
          this.timer = setInterval(begin, this.Video.sliderStepMS);
        }),
        busEvent.$on('pause', yy =>{
          clearInterval(this.timer);
          // 同步缩略图和slider滑条, 停止时候同步避免多次快速暂停播放导致视频时间和定时器时间差异
          bus.slider.setValue(bus.slider.getValue()[0] + this.Video.sliderStep);
        })
      },
    },
    components: {
      Dragdealer
    },
    mounted() {
      this.bindEvent();
      bus.slider = new Dragdealer('just-a-slider', {
        steps: this.Video.sliderStep,
        callback: (x, y) => {
          let currentTime = Math.round(Math.round(x / this.Video.sliderStep) * this.Video.sliderStepMS);
          // 触发SuperVideo定义同步视频事件,视频播放状态或大于指定播放进度才执行
          if(!this.Video.videoStatus || currentTime - this.Video.currentTime !== this.Video.sliderStepMS){
            busEvent.$emit('syncVideo', 'sliderDrag', {currentTime: currentTime /1000, x: x});
          }
          // 根据当前slider位置计算当前播放时间。 当前slider位置 / 视频每步播放距离 * 视频每步毫秒数
          store.dispatch('syncDragCurrentTime', {currentTime: Math.round(Math.round(x / this.Video.sliderStep) * this.Video.sliderStepMS), x});
        }
      });
    },
    computed: {
      Video: y => store.state.Video
    },
  }
</script>

<style>
  #just-a-slider {
    height: 60px;
  }
  #just-a-slider .handle {
    height: 60px;
    line-height: 60px;
  }
  #just-a-slider .value {
    padding: 0 0 0 5px;
    font-size: 30px;
    font-weight: bold;
  }
  #sliderValue {
    height:40px;
    width:35px;
    border: 1px solid red;
    top: 20px;
    font-size: 15px!important;
    line-height: 40px;
    position: absolute;
    -moz-border-radius: 25px;      /* Gecko browsers */
    -webkit-border-radius: 25px;   /* Webkit browsers */
    border-radius:25px;            /* W3C syntax */
    color: #000;;
  }
  .red-bar {
    width: 1px!important;
  }
  /*.dragdealer {
    z-index: -2;
  }*/
  #progress0 {
    height: 20px;
    background-color: #58B7FF;
    position:absolute;
    left:0;
    top:0;

  }
  #progress1 {
    height: 20px;
    background-color: #58B7FF;
    position:absolute;
    left:0;
    top:0;
  }
  #progress2 {
    height: 20px;
    background-color: #FF4949;
    position:absolute;
  }
  #progress3 {
    height: 20px;
    background-color: #99A9BF;
  }
</style>
