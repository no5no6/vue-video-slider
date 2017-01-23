<template>
  <div id="video" @click.stop="videoSetFocuse" :style="{width: Video.videoOptions.width + 'px', height: Video.videoOptions.height + 'px'}">
    <div>
      <video-player id="videoPlayer"  v-if="Video.videoOptions" :options="Video.videoOptions" @timer="timeupdate" @playerStateChanged="playerStateChanged" ></video-player>
    </div>
    <div id="div-cut">
      <div id="thumbnail" :style="{width: Video.videoOptions.width}">
        <ul>
          <li v-for="(item, index) in Video.imageArr" :style="{display: (index > 9 ? 'none' : 'block')}">
            <span :style="{visibility: item.display}">{{item.time}}</span>
            <img :src="item.url" />
          </li>
        </ul>
      </div>
      <video-dot-slider style="padding-top: 10px" :sliderWidth="Video.videoOptions.width" ></video-dot-slider>
      <time-input ></time-input>
    </div>
  </div>
</template>

<script>
  import lodash from 'lodash';
  import { videoPlayer } from 'vue-video-player';
  import VideoDotSlider from 'components/VideoDotSlider';
  import TimeInput from 'components/TimeInput';
  import { mapActions, mapState } from 'vuex';
  import busEvent from '../utils/busEvent';

  export default {
    name: 'SuperVideo',
    data(){
      return {
        videoFocuseStatus: false // 点击视频区域后将此状态置为true，代表视频区域获取焦点
      }
    },
    methods: {
      ...mapActions(['syncCurrentTime', 'videoInit', 'playState']),
      init() {
        this.bindEvent();
      },
      bindEvent(){
        busEvent.$on('syncVideo',(action, options) =>{
          this.$emit('playerAction', action, options);
        })
      },
      timeupdate(p){
      },
      videoSetFocuse() {
        this.videoFocuseStatus = true;
      },
      playerStateChanged({pause=false, ended=false, loadeddata=false, waiting=false, playing=false}) {
        if(pause){
          busEvent.$emit('pause');
          this.playState({status: false});
        }else if(ended){

        }else if(loadeddata){

        }else if(waiting){
          busEvent.$emit('pause');
          this.playState({status: true});
        }else if(playing){
          busEvent.$emit('play');
          this.playState({status: true});
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
              this.playState({status: false});
            }else {
              busEvent.$emit('syncVideo', 'play');
              this.playState({status: true});
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
    mounted() {
      this.init();

    },
    created() {
      // $(document).on('click', y => {
      //   this.videoFocuseStatus = false;
      // })
      // $(document).on('keydown', this.videoHotKey);
    },
    computed: {
      ...mapState({
        Video: state => state.Video,
        // DotInfor: state => state.DotInfor
      })
    }
  }
</script>

<style>
  #thumbnail {
    height: 80px;
    overflow: hidden;
    position: relative;;
    overflow-x: hidden;
    background: #fff;
    z-index: 1;
  }
  #thumbnail > ul {
  	list-style: none;
  	padding: 0;
  	height: 100%;
  	text-align: center;
  }
  #thumbnail > ul >li {
    float: left;
    width: 70px;
    height: 75px;
  }
  #thumbnail > ul >li > span {
    font-size: 5px;
    width: 69.8px;
    height: 12px;
  }
  #thumbnail > ul >li > img {
    width: 70px;
    height: 45px;
  }
  /**
  *   hack视频按钮
  */
  .vjs-big-play-button{
    z-index: 2;
  }
  .vjs-control-bar {
    z-index: 2;
  }
  #div-ad {
    width: 640px;
    height: 360px;
    position:absolute;
    top: 0;
    z-index: 1;
  }
  #div-ad > img {
    position: absolute;
  }
  #videoMaterailImg {

  }
  /* hack视频 */
  .vjs-remaining-time {
    display: none;
  }

</style>
