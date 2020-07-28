<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <div>
        <a href="https://github.com/iimeepo/vue-admin-template" target="_blank" class="github-corner" aria-label="View source on Github">
          <svg
            width="80"
            height="80"
            viewBox="0 0 250 250"
            style="fill:#40c9c6; color:#fff;"
            aria-hidden="true"
          >
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
            <path
              d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="currentColor"
              style="transform-origin: 130px 106px;"
              class="octo-arm"
            />
            <path
              d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
              fill="currentColor"
              class="octo-body"
            />
          </svg>
        </a>
      </div>

      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <i class="el-icon-user-solid" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                用户总数
              </div>
              <span class="card-panel-num">102400</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-message">
              <i class="el-icon-document" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                文章总数
              </div>
              <span class="card-panel-num">81212</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-money">
              <i class="el-icon-chat-dot-square" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                评论总数
              </div>
              <span class="card-panel-num">9280</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-shopping">
              <i class="el-icon-view" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                阅读总数
              </div>
              <span class="card-panel-num">13600</span>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <raddar-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <bar-chart />
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="16">
        <el-col :xs="24" :sm="24" :lg="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>阅读量排行</span>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                prop="sort"
                label="排名"
              />
              <el-table-column
                prop="address"
                label="地区"
              />
              <el-table-column
                prop="number"
                label="人数"
              />
            </el-table>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>收益排行</span>
            </div>
            <div class="block">
              <div style="padding-top:35px;" class="progress-item">
                <span>Vue</span>
                <el-progress :percentage="70" />
              </div>
              <div class="progress-item">
                <span>JavaScript</span>
                <el-progress :percentage="18" />
              </div>
              <div class="progress-item">
                <span>CSS</span>
                <el-progress :percentage="12" />
              </div>
              <div class="progress-item">
                <span>PHP</span>
                <el-progress :percentage="22" />
              </div>
              <div class="progress-item">
                <span>Hyperf</span>
                <el-progress :percentage="38" />
              </div>
              <div class="progress-item">
                <span>ESLint</span>
                <el-progress :percentage="100" status="success" />
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>待办事项</span>
            </div>
            <div class="block">
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :icon="activity.icon"
                  :type="activity.type"
                  :color="activity.color"
                  :size="activity.size"
                  :timestamp="activity.timestamp"
                >
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import RaddarChart from './components/RaddarChart'

export default {
  name: 'Dashboard',
  components: {
    BarChart,
    PieChart,
    RaddarChart
  },
  data() {
    return {
      tableData: [{
        sort: '1',
        address: '北京',
        number: 23423
      }, {
        sort: '2',
        address: '上海',
        number: 2312
      }, {
        sort: '3',
        address: '广州',
        number: 2231
      }, {
        sort: '4',
        address: '深圳',
        number: 1234
      }, {
        sort: '5',
        address: '杭州',
        number: 123
      }],
      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      font-size: 48px;
      color: #40c9c6;
    }

    .icon-message {
      font-size: 48px;
      color: #36a3f7;
    }

    .icon-money {
      font-size: 48px;
      color: #f4516c;
    }

    .icon-shopping {
      font-size: 48px;
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0)
  }
  20%,
  60% {
    transform: rotate(-25deg)
  }
  40%,
  80% {
    transform: rotate(10deg)
  }
}

@media (max-width:500px) {
  .github-corner:hover .octo-arm {
    animation: none
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
