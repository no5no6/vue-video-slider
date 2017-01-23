import utils from '../utils/utils'

class D {
  constructor() {
  };

  video_dot_list() {
    let t = {
      "result-code": "0",
      "version": "1",
      "cmd": "/dot/api/video_dot_list",
      "msg": "OK",
      "timestamp": "2016-12-09 20:22:02",
      "data": {
          "data_list": [
              {
                  "start_time": "1262000",
                  "end_time": "1386000",
                  "lable_names": [
                      {
                          "label_id":"1",
                          "label": "时间",
                          "sub_label": [
                              "时间"
                          ]
                      },
                      {
                          "label_id":"16",
                          "label": "阿斯蒂芬",
                          "sub_label": [
                              "时间",
                              "sdf",
                              "阿斯蒂芬"
                          ]
                      }
                  ],
                  "operator_id": "101",
                  "operator_name": "李四",
                  "operator_time": "2016-12-2 18:43:14",
                  "dot_id": "aaa"
              },
              {
                  "start_time": "67500",
                  "end_time": "225250",
                  "lable_names": [
                      {
                          "label_id":"2",
                          "label": "球鞋",
                          "sub_label": [
                              "球鞋"
                          ]
                      },
                      {
                          "label_id":"3",
                          "label": "阿迪",
                          "sub_label": [
                              "球鞋",
                              "品牌",
                              "阿迪"
                          ]
                      },
                      {
                          "label_id":"6",
                          "label": "aaa",
                          "sub_label": [
                              "111",
                              "222",
                              "aaa"
                          ]
                      }
                  ],
                  "operator_id": "102",
                  "operator_name": "张三",
                  "operator_time": "2016-12-2 18:43:14",
                  "dot_id": "bbb"
              },
              {
                  "start_time": "2017000",
                  "end_time": "2050750",
                  "lable_names": [
                      {
                          "label_id":"16",
                          "label": "时间",
                          "sub_label": [
                              "时间"
                          ]
                      },
                      {
                          'label_id': '17',
                          "label": "阿斯蒂芬",
                          "sub_label": [
                              "时间",
                              "sdf",
                              "阿斯蒂芬"
                          ]
                      }
                  ],
                  "operator_id": "103",
                  "operator_name": "张三",
                  "operator_time": "2016-12-2 18:43:14",
                  "dot_id": "ccc"
              },
              {
                  "start_time": "3898500",
                  "end_time": "4360500",
                  "lable_names": [
                      {
                          "label_id":"16",
                          "label": "时间",
                          "sub_label": [
                              "时间"
                          ]
                      },
                      {
                          "label_id":"17",
                          "label": "阿斯蒂芬",
                          "sub_label": [
                              "时间",
                              "sdf",
                              "阿斯蒂芬"
                          ]
                      }
                  ],
                  "operator_id": "104",
                  "operator_name": "张三",
                  "operator_time": "2016-12-2 18:43:14",
                  "dot_id": "ddd"
              }
          ]
      }
    }

    return t
  };

  dot_material_list() {
    let t = {
      "result-code": "0",
      "version": "1.0.0",
      "cmd": "/dot/api/dot_material_list",
      "msg": "OK",
      "timestamp": "2016-02-01 19:49:29",
      "data": {
          "data_list": [
                        {
                            "id":"001",
                            "name":"素材001",
                            "status":"1",
                            "dot_start_time":"71800",
                            "dot_end_time":"81800",
                            "material_start_time":"73800",
                            "material_end_time":"77800",
                            "show_seconds":"4000",
                            "type":"1",
                            "img_url":"http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87&step_word=&hs=0&pn=137&spn=0&di=130789979320&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=2867564845%2C1605199674&os=3874667482%2C1449942325&simid=0%2C0&adpicid=0&ln=1982&fr=&fmq=1481881559081_R&fm=result&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D8a0fb2c4f503738dde4a0c2a831bb073%2Fb8bb4b540923dd5465406a0cd209b3de9d8248cf.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fptjkw_z%26e3Bkwt17_z%26e3Bv54AzdH3FrAzdH3Fnn00an8cnb&gsm=3c&rpstart=0&rpnum=0",
                            "position":"1",
                            "position_val":"13,23",
                            "modify_name":"张三",
                            "modify_time":"20161128231101"
                        },
                        {
                            "id":"002",
                            "name":"素材002",
                            "status":"1",
                            "start_time":"毫秒数",
                            "end_time":"毫秒数",
                            "show_seconds":"230",
                            "type":"1",
                            "img_url":"http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%A5%BD%E7%9C%8B%E5%9B%BE%E7%89%87&step_word=&hs=0&pn=138&spn=0&di=153855841590&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=292004209%2C2989753697&os=121447737%2C2789839122&simid=4213227193%2C785263288&adpicid=0&ln=1982&fr=&fmq=1481881559081_R&fm=result&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fpic.58pic.com%2F58pic%2F13%2F73%2F82%2F48v58PICW9V_1024.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bcbrtv_z%26e3Bv54AzdH3Frf1AzdH3F8n0nbd9b_z%26e3Bip4s&gsm=3c&rpstart=0&rpnum=0",
                            "position":"1",
                            "position_val":"13,23",
                            "modify_name":"张三",
                            "modify_time":"20161128231101"
                        }
            ]
        }
      }

    return t;
  }

  all_dot_labels() {
    let t = {
    "result-code": "0",
    "version": "1",
	   "cmd": "/dot/api/all_dot_labels",
    "msg": "OK",
    "timestamp": "2016-12-11 23:41:26",
    "data": {
	        "data_list": [
	        			{
	        				"id":"1",
							"name":"表情",
	                    },
	        			{
	        				"id":"3",
							"name":"时间",
	                    },
	        			{
	        				"id":"5",
							"name":"笑",
	                    },
	        			{
	        				"id":"7",
							"name":"萨芬的",
	                    },
	        			{
	        				"id":"9",
							"name":"撒的发放",
	                    },
	        			{
	        				"id":"11",
							"name":"啊啊",
	                    },
	        			{
	        				"id":"13",
							"name":"sdf",
	                    },
	        			{
	        				"id":"15",
							"name":"jj",
	                    },
	        			{
	        				"id":"17",
							"name":"阿斯蒂芬",
	                    },
	        			{
	        				"id":"19",
							"name":"撒发",
	                    },
	        			{
	        				"id":"21",
							"name":"水电费是是是",
	                    },
	        			{
	        				"id":"23",
							"name":"号玩",
	                    },
	        			{
	        				"id":"24",
							"name":"撒地方",
	                    },
	        			{
	        				"id":"25",
							"name":"ret收到",
	                    },
	        			{
	        				"id":"27",
							"name":"好玩暗室逢灯",
	                    },
	        			{
	        				"id":"28",
							"name":"安抚",
	                    },
	        			{
	        				"id":"29",
							"name":"爱上对方过后就哭了0",
	                    },
	        			{
	        				"id":"30",
							"name":"看看",
	                    },
	        			{
	        				"id":"31",
							"name":"拉开距离撒地方",
	                    },
	        			{
	        				"id":"32",
							"name":"撒地方阿斯蒂芬",
	                    }
	        ]
  		}
    }
    return t;
  }

  query_parentlabels() {
    let t = {
    "result-code": "0",
    "version": "1",
    "cmd": "/dot/api/query_parentlabels",
    "msg": "OK",
    "timestamp": "2016-12-06 18:37:49",
    "data": {
            "data_list":
                        {
                                "label": "阿斯蒂芬",
                                "sub_label":[
                                            "时间",
                                            "sdf",
                                            "阿斯蒂芬"
                                ]

                        }
        }
    }
    return t;
  }

  material_info() {
    let t = {
    "result-code": "0",
    "version": "1",
  	"cmd": "/dot/api/material_info",
      "msg": "OK",
      "timestamp": "2016-12-12 22:51:30",
      "data": {
  	        "data_list":
  	        			{
                "material_name": '素材1',
  							"dot_start_time":"4200000",
  		        			"dot_end_time":"7000400",
  		        			"material_start_time":"4203200",
  		        			"material_end_time":"4213200",
  		        			"allowable_error_senconds":"2000",
  							"show_seconds":"3000",
  							"type":"1",
                "img_url":"https://www.baidu.com/img/bd_logo1.png",
  							"position":"1",
  							"position_val":"12,20",
  							"label_names":[
  								{
  									"sub_label":[
  												"时间"
  									]
  								},
  								{
  									"sub_label":[
  												"时间",
  												"sdf",
  												"阿斯蒂芬"
  									]
  								}
  							]
  	                    }
    		}
  	}
    return t;
  }
  getVideoUrl() {
    let t = {
    "result-code": "0",
    "version": "1",
  	"cmd": "/dot/api/video_url",
      "msg": "OK",
      "timestamp": "2016-12-13 15:55:16",
      "data": {
  	        "data_list":
  	        			{
  							"url":"http://testdianbo.kuyun.com/dianbo/video/1/1.mp4",
  							"aid":"1",
  							"id":"1",
  		        			"senconds":"6542",
  		        			"begin":"0",
  		        			"end":"0"
  	                    }
    		}
  	}
    return t
  }


}

export default new D();
