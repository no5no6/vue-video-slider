<template>
  <div @click.stop="videoSetFocuse" :style="{width: Video.videoOptions.width + 'px'}">
    <video-player v-if="Video.videoOptions" :options="Video.videoOptions" @timer="timeupdate" @player-state-changed="playerStateChanged" ></video-player>
    <video-dot-slider :sliderWidth="Video.videoOptions.width" ></video-dot-slider>
    <time-input ></time-input>
  </div>
</template>

<script>
  import { videoPlayer } from 'vue-video-player';
  import busEvent from './utils/busEvent';
  import { mapActions, mapState } from 'vuex';
  import store from './store';
  import VideoDotSlider from './components/VideoDotSlider';
  import TimeInput from './components/TimeInput';

  export default {
    name: 'VideoSlider',
    data(){
      return {
        videoOptions: 'null',
      }
    },
    props: {
      options: {
        type: Object,
        default: function() {
          return {
            source: {
              type: "video/mp4",
              src: "http://vjs.zencdn.net/v/oceans.mp4",
            },
            language: 'zh-CN',
            controlBar: {
              fullscreenToggle: false,
              volumeMenuButton: false,
              remainingTimeDisplay: false
            },
            autoplay: false,
            width: "640",
            height: "360",
            seconds: 46,
          }
        }
      }

    },
    methods: {
      bindEvent(){
        busEvent.$on('syncVideo',(action, options) =>{
          this.$emit('playerAction', action, options);
        })
      },
      videoSetFocuse() {
        this.videoFocuseStatus = true;
      },
      initVideoOptions() {
        store.dispatch('videoInit', this.options);
        if(this.options) {
          this.videoOptions = this.options;
        }else {
          this.videoOptions = {
            source: {
              type: "video/mp4",
              src: "http://vjs.zencdn.net/v/oceans.mp4",
            },
            language: 'zh-CN',
            controlBar: {
              fullscreenToggle: false,
              volumeMenuButton: false,
              remainingTimeDisplay: false
            },
            autoplay: false,
            width: "640",
            height: "360",
          }
        }
      },
      timeupdate() {

      },
      playerStateChanged({pause=false, ended=false, loadeddata=false, waiting=false, playing=false}) {
        if(pause){
          busEvent.$emit('pause');
          store.dispatch('playState', {status: false});
        }else if(waiting){
          busEvent.$emit('pause');
          store.dispatch('playState', {status: false});
        }else if(playing){
          busEvent.$emit('play');
          store.dispatch('playState', {status: true});
        }
      },
      /**
      * 1、空格键控制暂停开始
      * 2、左右键控制播放前进后退，一次动一贞（250ms）
      */
      videoHotKey(event) {
        if(this.videoFocuseStatus){
          if(event.keyCode === 32){
            if(this.Video.videoStatus){
              busEvent.$emit('syncVideo', 'pause');
              store.dispatch('playState', {status: false});
            }else {
              busEvent.$emit('syncVideo', 'play');
              store.dispatch('playState', {status: true});
            }
            return false;
          }else if(event.keyCode === 37){
            if(!this.Video.videoStatus){
              if(this.Video.markDotBegin > 0){
                if(this.Video.currentTime <= this.Video.markDotBegin) return false
              }
              busEvent.$emit('setPoint', this.Video.currentPoint - this.Video.sliderStep);
            }
            return false;
          }else if(event.keyCode === 39){
            if(!this.Video.videoStatus){
              if(this.Video.markDotEnd > 0){
                if(this.Video.currentTime >= this.Video.markDotEnd) return false
              }
              busEvent.$emit('setPoint', this.Video.currentPoint + this.Video.sliderStep);
            }
            return false;
          }else if(event.keyCode === 81){
            if(!this.Video.videoStatus && this.Video.dotState !== 2){
              busEvent.$emit('setDot');
            }
            return false;
          }
        }
      }
    },
    components: {
      videoPlayer,
      VideoDotSlider,
      TimeInput
    },
    computed: {
      Video: y => store.state.Video
    },
    mounted() {
      this.initVideoOptions();
      this.bindEvent();
    },
    created() {
      document.onclick = y => {
        console.log('12312312312');
        this.videoFocuseStatus = false;
      }
      document.onkeydown = this.videoHotKey;

      // 各种浏览器兼容
      var hidden, state, visibilityChange;
      if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
        state = "visibilityState";
      } else if (typeof document.mozHidden !== "undefined") {
        hidden = "mozHidden";
        visibilityChange = "mozvisibilitychange";
        state = "mozVisibilityState";
      } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
        state = "msVisibilityState";
      } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
        state = "webkitVisibilityState";
      }

      // 添加监听器，在title里显示状态变化
      document.addEventListener(visibilityChange,() => {
        busEvent.$emit('syncVideo', 'pause');
        store.dispatch('playState', {status: false});
      }, false);
    }
  }
</script>

<style>

</style>
