export const IPieStardard = {
  title: {
    text: '',
  },
  tooltip: {
    trigger: 'item',
    formatter: "{b} : {c} ({d}%)"
  },
  toolbox: {
    'show': true,
    'feature': {
      'saveAsImage': {},
    }
  },
  legend: {
    //orient: 'vertical',
    //left: 'left',
    data: []
  },
  series: [
    {
      name: '',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

export const IPolarStardard = {
  angleAxis: {
    type: 'category',
    data: [],   //整体数据要设定一下，不然数据将越过坐标范围
    z: 10,
    interval: 50
  },
  title: {
    text: ""
  },
  toolbox: {
    'show': true,
    'feature': {
      'saveAsImage': {},
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  radiusAxis: {
  },
  polar: {
    radius: '70%'
  },
  series: [],
  legend: {
    //show: true,
    //top: 30,
    data: []
  }
};


export const PolarItem = {
  type: 'bar',
  data: [],
  coordinateSystem: 'polar',
  name: '',
  stack: 'stackname'
}



export const ILineStardard = {
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: []
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,  //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
    data: [],
  },
  yAxis: {
    type: 'value'
  },
  series: [
  ]
};


export const LineItem = {
  name: '',
  type: 'line',
  data: []
};


export const IBarStardard = {
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [],
    type: 'bar'
  }]
};

export const IScatter3DStardard = {
  grid3D: {},
  xAxis3D: {},
  yAxis3D: {},
  zAxis3D: {},
  visualMap: [{
    inRange: {
      color: ['blue', 'blue', 'green', 'yellow', 'red']
    },
    max: 0,
    calculable: true
  }],
  series: [
    {
      type: 'scatter3D',
      symbolSize: null,
      emphasis: {
        label: {
          show: true,
          formatter: null,
          position: 'top'
        }
      },
      data: []
    }
  ]
};

export const I3DBarStardard = {
  visualMap: {
    max: 300,
    show: false,
    inRange: {
      color: ['#313695', '#4575b4', '#74add1', '#abd9e9',
        '#e0f3f8', '#ffffbf', '#fee090', '#fdae61',
        '#f46d43', '#d73027', '#a50026']
    }
  },
  xAxis3D: {
    type: 'category',
    data: [],
    name: '时间'
  },
  yAxis3D: {
    type: 'category',
    data: [],
    name: '日期'
  },
  zAxis3D: {
    type: 'value',
    name: '流量'
  },
  grid3D: {
    boxWidth: 200,
    boxDepth: 80,
    viewControl: {
      projection: 'orthographic',
    },
    light: {
      main: {
        intensity: 1.2
      },
      ambient: {
        intensity: 0.3
      }
    }
  },
  series: [{
    type: 'bar3D',
    data: [],
    shading: 'color',
    label: {
      formatter: '{c}'
    },
    itemStyle: {
      opacity: 0.4
    },
    emphasis: {
      label: {
        formatter:null,
        textStyle: {
          fontSize: 20,
          color: '#900'
        }
      },
      itemStyle: {
        color: '#900'
      }
    }
  }]
};


export const IMapStardard = {
  title: {
    text: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: null,
  },
  bmap: {
    center: [110.3373, 20.0303],
    zoom: 15,
    roam: true,
    mapStyle: {
      styleJson: [{
        'featureType': 'water',
        'elementType': 'all',
        'stylers': {
          'color': '#d1d1d1'
        }
      }, {
        'featureType': 'land',
        'elementType': 'all',
        'stylers': {
          'color': '#f3f3f3'
        }
      }, {
        'featureType': 'railway',
        'elementType': 'all',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'highway',
        'elementType': 'all',
        'stylers': {
          'color': '#fdfdfd'
        }
      }, {
        'featureType': 'highway',
        'elementType': 'labels',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'arterial',
        'elementType': 'geometry',
        'stylers': {
          'color': '#fefefe'
        }
      }, {
        'featureType': 'arterial',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#fefefe'
        }
      }, {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': {
          'visibility': 'on'
        }
      }, {
        'featureType': 'green',
        'elementType': 'all',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'subway',
        'elementType': 'all',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'manmade',
        'elementType': 'all',
        'stylers': {
          'color': '#d1d1d1'
        }
      }, {
        'featureType': 'local',
        'elementType': 'all',
        'stylers': {
          'color': '#d1d1d1'
        }
      }, {
        'featureType': 'arterial',
        'elementType': 'labels',
        'stylers': {
          'visibility': 'off'
        }
      }, {
        'featureType': 'boundary',
        'elementType': 'all',
        'stylers': {
          'color': '#fefefe'
        }
      }, {
        'featureType': 'building',
        'elementType': 'all',
        'stylers': {
          'color': '#d1d1d1'
        }
      }, {
        'featureType': 'label',
        'elementType': 'labels.text.fill',
        'stylers': {
          'color': '#999999'
        }
      }]
    }
  },
  series: [
    {
      name: '订单数',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: [],
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: function (_) {
            return 'purple';
          },
        }
      }
    },
    {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      data: [],
      symbolSize: function (val) {
        return val[1] / 10;
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: 'purple',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    }
  ]
};

export const ICalendarStardard = {
  tooltip: {
    formatter: null
  },
  visualMap: {
    show: true,
    min: 0,
    max: 300,
    calculable: true,
    seriesIndex: [2],
    orient: 'horizontal',
    left: 'center',
    bottom: 20,
    /*     inRange: {
          color: ['#e0ffff', '#006edd'],
          opacity: 0.3
        },
        controller: {
          inRange: {
            color: ['#e0ffff', '#006edd'],
            opacity: 0.5
          }
        } */
  },

  calendar: [{
    left: 'center',
    top: 'middle',
    cellSize: [100, 100],
    yearLabel: { show: false },
    orient: 'vertical',
    dayLabel: {
      firstDay: 1,
      nameMap: 'cn'
    },
    monthLabel: {
      show: false
    },
    range: []
  }],

  series: []
};

export const ICalendarItem_scatter = {
  type: 'scatter',
  coordinateSystem: 'calendar',
  symbolSize: 1,
  label: {
    normal: {
      show: true,
      formatter: null,
      textStyle: {
        color: '#000'
      }
    }
  },
  data: []
};

export const ICalendarItem_heatmap = {
  name: '客流量',
  type: 'heatmap',
  coordinateSystem: 'calendar',
  data: []
};



export const ITimelineStardard = {
  baseOption: {
    timeline: {
      show: true,
      autoPlay: true,
      playInterval: 1000,
      data: [],
      top: 20,
      label: { formatter: null }
    },
    toolbox: {
      'show': true,
      'feature': {
        'saveAsImage': {},
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: null,
    },
    title: [],
    series: []
  },
  options: []
}

export const ILinesItem = {
  type: 'lines',
  coordinateSystem: 'bmap',
  polyline: true,
  data: [],
  silent: true,
  lineStyle: {
    normal: {
      color: 'purple',
      opacity: 0.9,
      width: 1
    }
  },
  effect: {
    show: true,
    period: 6,
    trailLength: 0.7,
    color: '#fff',
    symbol: 'triangle',
    symbolSize: 3
  },
  progressiveThreshold: 500,
  progressive: 200
}


export const Rich_Weathy = {
  bluebold: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#0431B4',
    align: "center"
  },
  redbold: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FF0040',
    align: "center"
  },
  blackbold: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#1C1C1C',
    align: "center"
  },
  sunny: {
    backgroundColor: {
      image: 'assets/image/weathy/weathy_01.png'
    },
    height: 16
  },
  cloudy: {
    backgroundColor: {
      image: 'assets/image/weathy/weathy_04.png'
    },
    height: 16
  },
  thunderstorm: {
    backgroundColor: {
      image: 'assets/image/weathy/weathy_10.png'
    },
    height: 16
  },
  bigrain: {
    backgroundColor: {
      image: 'assets/image/weathy/weathy_08.png'
    },
    height: 16
  },
  rain: {
    backgroundColor: {
      image: 'assets/image/weathy/weathy_07.png'
    },
    height: 16
  },
  greatrain: {
    backgroundColor: {
      image: 'assets/image/weathy/weathy_09.png'
    },
    height: 16
  }
}


export const ISankeyStardard = {
  title: {
    text: '桑基图'
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: {
    type: 'sankey',
    layout: 'none',
    focusNodeAdjacency: 'allEdges',
    data: [],
    links: []
  }
}

export const ITreeStardard = {
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: [
    {
      type: 'tree',

      data: [],

      top: '5%',

      bottom: '10%',

      layout: 'radial',

      symbol: 'emptyCircle',

      symbolSize: 7,

      initialTreeDepth: 3,

      animationDurationUpdate: 750

    }
  ]
}

export const ITopologyStardard = {
  title: {
    text: '网络拓扑图'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}',
  },
  //backgroundColor: "#F5F5F5",
  xAxis: {
    min: 0,
    max: 12,
    show: false,
    type: 'value'
  },
  yAxis: {
    min: 0,
    max: 12,
    show: false,
    type: 'value'
  },
  series: [{
    type: 'graph',
    layout: 'none',
    id: 'a',
    coordinateSystem: 'cartesian2d',
    edgeSymbol: ['', 'arrow'],
    // symbolSize: 50,
    label: {
      normal: {
        show: true,
        position: 'bottom',
        color: '#12b5d0'
      }
    },
    lineStyle: {
      normal: {
        width: 2,
        shadowColor: 'none'
      }
    },
    xAxis: {
      min: 0,
      max: 12,
      show: false,
      type: 'value'
    },
    yAxis: {
      min: 0,
      max: 12,
      show: false,
      type: 'value'
    },
    // edgeSymbolSize: 8,
    draggable: true,
    data: [],
    links: [],
    z: 4,
    itemStyle: {
      normal: {
        label: {
          show: true,
          formatter: function (item) {
            return item.data.name
          }
        }
      }
    }
  }, {
    name: 'A',
    type: 'lines',
    coordinateSystem: 'cartesian2d',
    z: 4,
    effect: {
      show: true,
      trailLength: 0,
      symbol: 'arrow',
      color: '#12b5d0',
      symbolSize: 8
    },
    lineStyle: {
      normal: {
        curveness: 0
      }
    },
    data: [],

  }]
};


export const IGephiStardard = {
  title: {
    text: '',
    subtext: '',
    top: 'bottom',
    left: 'right'
  },
  graphic: [
    {
      type: 'image',
      id: 'logo',
      right: 20,
      top: 20,
      z: -10,
      bounding: 'raw',
      origin: [75, 75],
      style: {
        image: 'assets/security/net_gexf_color.png',
        width: 200,
        height: 250,
        //opacity: 0.4
      }
    }],
  tooltip: {},
  animationDuration: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      //name: 'Les Miserables',
      type: 'graph',
      layout: 'none',
      data: [],
      links: [],
      categories: [],
      roam: true,
      focusNodeAdjacency: true,
      itemStyle: {
        normal: {
          borderColor: '#fff',
          borderWidth: 1,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        }
      },
      label: {
        position: 'right',
        formatter: '{b}'
      },
      lineStyle: {
        color: 'source',
        curveness: 0.3
      },
      emphasis: {
        lineStyle: {
          width: 10
        }
      }
    }
  ]
};


export const IHeatBaiduMapStardard = {
  animation: false,
  bmap: {
    center: [110.3373, 20.0303],
    zoom: 15,
    roam: true,
  },
  visualMap: {
    show: true,
    top: 'top',
    min: 0,
    max: 5,
    seriesIndex: 0,
    calculable: true,
    inRange: {
      color: ['blue', 'blue', 'green', 'yellow', 'red']
    }
  },
  series: [{
    type: 'heatmap',
    coordinateSystem: 'bmap',
    data: [],
    pointSize: 5,
    blurSize: 6
  },
  {
    name: 'Top 10',
    type: 'effectScatter',
    coordinateSystem: 'bmap',
    data: [],
    symbolSize: function (val) {
      return val[1] / 10;
    },
    showEffectOn: 'render',
    rippleEffect: {
      brushType: 'stroke'
    },
    hoverAnimation: true,
    label: {
      normal: {
        formatter: '{b}',
        position: 'right',
        show: true
      }
    },
    itemStyle: {
      normal: {
        color: 'purple',
        shadowBlur: 10,
        shadowColor: '#333'
      }
    },
    zlevel: 1
  }
  ]
}

export const IHeatMapStardard = {
  toolbox: {
    'show': true,
    'feature': {
      'saveAsImage': {},
    }
  },
  tooltip: {
    position: 'top'
  },
  animation: false,
  grid: {
    height: '50%',
    y: '10%'
  },
  xAxis: {
    type: 'category',
    data: [],
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: 'category',
    data: [],
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 10,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '15%'
  },
  series: [{
    name: '跨区数据',
    type: 'heatmap',
    data: [],
    label: {
      normal: {
        show: true
      }
    },
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
};