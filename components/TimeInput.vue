<template>
  <div>
    <div id="errorWord" type="flex" justify="left" align="middle"><div :push="1">{{Video.timeInputErrorText}}</div></div>
    <span id="dotRangeTime" :gutter="10" type="flex" justify="left" >
      <span :span="2" v-for="(item, index) in Video.beginDotTime" >
        <input :id="item.id" :class="{errorTip: item.errorTip}" :placeholder="item.placeholder" style="width: 50px" :value="item.value" :disabled="Video.beginInputStatus" @blur="changediv($event.target.value, item.placeholder, 'beginDotTime')"></input>
      </span>
      <span :span="3" align="middle" style="padding-top: 10px;"><span class="myBoder"></span></span>
      <span :span="2" v-for="item in Video.endDotTime">
        <input style="width: 50px" :class="{errorTip: item.errorTip}" :placeholder="item.placeholder" :value="item.value" :disabled="Video.endInputStatus" @blur="changediv($event.target.value, item.placeholder, 'endDotTime')"></input>
      </span>
    </span>
  </div>
</template>

<script>

  import moment  from 'moment';
  import _ from 'lodash';
  import utils from '../utils/utils.js'
  import busEvent from '../utils/busEvent';
  import store from '../store';

  export default {
    name: 'Timediv',
    // props: ['disable'],
    data(){
      return {
        idStr: 'div',
        maxHour: 0
      }
    },
    methods: {
      init() {

      },
      changediv (value, type, name) {
        store.dispatch('validateTime', {value, type, name});
        store.dispatch('dotSync', {value: utils.validateNumberFullWay(value, type), type, name});
        busEvent.$emit('setPoint', this.Video.currentPoint);
      }
    },
    mounted() {
      this.init();
    },
    computed: {
      Video: y => store.state.Video
    },
  }
</script>

<style>
  #dotRangeTime {
    padding: 10px;
  }
  #errorWord {
    color: red;
  }
  .errorTip > div {
    border-color: red!important;
  }
  .myBoder {
    display: inline-block;
    width: 25px;
    margin-bottom: 5px;
    border-bottom: 1px solid black;
  }
</style>
