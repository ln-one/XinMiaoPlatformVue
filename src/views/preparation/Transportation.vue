<template>
  <div class="transportation">
    <!-- 标题区 -->
    <div class="header">
      <h2>入学交通路线</h2>
    </div>

    <!-- 查询表单 -->
    <el-form :model="form" label-width="100px" class="query-form">
      <el-form-item label="出发地">
        <el-select 
          v-model="form.departure" 
          placeholder="请选择省份"
          clearable
          filterable>
          <el-option
            v-for="province in provinces"
            :key="province.value"
            :label="province.label"
            :value="province.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="交通方式">
        <el-radio-group v-model="form.transportType">
          <el-radio-button label="train">火车</el-radio-button>
          <el-radio-button label="airplane">飞机</el-radio-button>
          <el-radio-button label="bus">汽车</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button 
          type="primary" 
          @click="searchRoutes"
          :loading="loading">
          查询路线
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 查询结果 -->
    <div v-if="showResult" class="result-container">
      <h3>推荐路线方案</h3>
      
      <div class="route-card" v-for="(route, index) in routes" :key="index">
        <div class="route-header">
          <span class="route-title">方案 {{ index + 1 }}</span>
          <el-tag :type="route.tagType || 'info'">
            {{ formatTransportType(route.type) }}
          </el-tag>
        </div>
        
        <div class="route-content">
          <p><i class="el-icon-time"></i> 预计耗时: {{ route.duration }}</p>
          <p><i class="el-icon-money"></i> 预估费用: {{ route.cost }}</p>
          <p><i class="el-icon-connection"></i> 路线详情:</p>
          <ul>
            <li v-for="(step, i) in route.steps" :key="i">{{ step }}</li>
          </ul>
        </div>
      </div>

      <!-- 简单地图展示 -->
      <div class="simple-map" ref="mapContainer">
        <p v-if="!mapLoaded" class="map-placeholder">
          <i class="el-icon-map-location"></i> 地图加载中...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransportationPlan',
  data() {
    return {
      form: {
        departure: '',
        transportType: 'train'
      },
      provinces: [
        { value: 'beijing', label: '北京' },
        { value: 'shanghai', label: '上海' },
        { value: 'guangzhou', label: '广州' },
        { value: 'chengdu', label: '成都' }
      ],
      routes: [],
      loading: false,
      showResult: false,
      mapLoaded: false
    }
  },
  methods: {
    // 查询路线
    searchRoutes() {
      if (!this.form.departure) {
        this.$message.warning('请选择出发地');
        return;
      }

      this.loading = true;
      
      // 模拟API请求
      setTimeout(() => {
        this.routes = this.generateMockRoutes();
        this.showResult = true;
        this.loading = false;
        this.initSimpleMap();
      }, 800);
    },

    // 生成模拟路线数据
    generateMockRoutes() {
      const baseRoutes = [
        {
          type: this.form.transportType,
          duration: '5小时30分钟',
          cost: '￥200-350',
          steps: [
            `${this.getProvinceName(this.form.departure)}站乘坐${this.formatTransportType(this.form.transportType)}`,
            '到达学校所在城市',
            '换乘地铁2号线（往大学城方向）',
            '在大学城站下车，步行10分钟到达'
          ],
          tagType: 'success'
        }
      ];

      // 添加备选方案
      if (this.form.transportType !== 'bus') {
        baseRoutes.push({
          type: 'bus',
          duration: '7小时',
          cost: '￥150-200',
          steps: [
            `${this.getProvinceName(this.form.departure)}汽车站乘坐大巴`,
            '直达大学城客运站',
            '步行15分钟到达学校'
          ],
          tagType: 'warning'
        });
      }

      return baseRoutes;
    },

    // 初始化简易地图
    initSimpleMap() {
      // 实际项目可替换为真实地图API
      this.mapLoaded = true;
      this.$refs.mapContainer.innerHTML = `
        <div style="
          height: 300px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          border-radius: 4px;
        ">
          <div style="text-align: center;">
            <i class="el-icon-map-location" style="font-size: 40px;"></i>
            <p>地图可视化区域</p>
            <p>实际项目可接入高德/百度地图API</p>
          </div>
        </div>
      `;
    },

    // 辅助方法
    formatTransportType(type) {
      const types = {
        train: '火车',
        airplane: '飞机',
        bus: '汽车'
      };
      return types[type] || type;
    },

    getProvinceName(value) {
      const province = this.provinces.find(p => p.value === value);
      return province ? province.label : value;
    }
  }
}
</script>

<style scoped>
.transportation {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.query-form {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 30px;
}

.result-container {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.route-card {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
  background: #fff;
}

.route-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.route-title {
  font-weight: bold;
  color: #333;
}

.route-content {
  color: #666;
}

.route-content p {
  margin: 8px 0;
}

.route-content ul {
  padding-left: 20px;
  margin: 10px 0;
}

.route-content li {
  list-style-type: disc;
  margin: 5px 0;
}

.simple-map {
  height: 300px;
  margin-top: 30px;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-placeholder {
  color: #999;
  text-align: center;
}

.map-placeholder i {
  font-size: 30px;
  display: block;
  margin-bottom: 10px;
}
</style>