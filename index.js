
let VideoSlider = require('./VideoSlider');

VideoSlider.install = function(Vue, options){
  Vue.component(VideoSlider.name, VideoSlider);
};

module.exports = VideoSlider;
