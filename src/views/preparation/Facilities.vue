<template>
  <div class="facilities-container">
    <!-- 标题和筛选区 -->
    <div class="header">
      <h2><i class="el-icon-map-location"></i> 校园周边设施</h2>
      <div class="filters">
        <el-select 
          v-model="filter.type" 
          placeholder="设施类型" 
          clearable
          style="width: 120px">
          <el-option
            v-for="type in facilityTypes"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
        
        <el-select
          v-model="filter.distance"
          placeholder="距离范围"
          clearable
          style="width: 120px; margin-left: 10px;">
          <el-option
            v-for="d in distanceOptions"
            :key="d.value"
            :label="d.label"
            :value="d.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <!-- 设施列表 -->
    <div class="facility-list">
      <div 
        v-for="facility in filteredFacilities" 
        :key="facility.id"
        class="facility-card"
        @click="showFacilityDetail(facility)">
        
        <div class="facility-image">
          <img :src="getImageUrl(facility.type)" :alt="facility.name">
        </div>
        
        <div class="facility-info">
          <h3>{{ facility.name }}</h3>
          <div class="meta">
            <span class="type">
              <el-tag :type="getTagType(facility.type)" size="small">
                {{ getTypeName(facility.type) }}
              </el-tag>
            </span>
            <span class="distance">
              <i class="el-icon-location-outline"></i> {{ facility.distance }}米
            </span>
          </div>
          <p class="address">{{ facility.address }}</p>
        </div>
      </div>
    </div>

    <!-- 设施详情弹窗 -->
    <el-dialog 
      :title="currentFacility.name" 
      :visible.sync="showDetail"
      width="60%">
      
      <div v-if="currentFacility" class="facility-detail">
        <div class="detail-image">
          <img :src="getImageUrl(currentFacility.type)" :alt="currentFacility.name">
        </div>
        
        <div class="detail-info">
          <el-descriptions :column="1" border>
            <el-descriptions-item label="设施类型">
              {{ getTypeName(currentFacility.type) }}
            </el-descriptions-item>
            <el-descriptions-item label="距离">
              {{ currentFacility.distance }}米
            </el-descriptions-item>
            <el-descriptions-item label="地址">
              {{ currentFacility.address }}
            </el-descriptions-item>
            <el-descriptions-item label="营业时间" v-if="currentFacility.hours">
              {{ currentFacility.hours }}
            </el-descriptions-item>
            <el-descriptions-item label="联系电话" v-if="currentFacility.phone">
              {{ currentFacility.phone }}
            </el-descriptions-item>
          </el-descriptions>
          
          <div class="tips" v-if="currentFacility.tips">
            <h4>小贴士</h4>
            <p>{{ currentFacility.tips }}</p>
          </div>
        </div>
      </div>
      
      <div slot="footer">
        <el-button @click="showDetail = false">关闭</el-button>
        <el-button 
          type="primary" 
          @click="openNavigation(currentFacility)">
          导航路线
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CampusFacilities',
  data() {
    return {
      filter: {
        type: '',
        distance: ''
      },
      facilityTypes: [
        { value: 'dining', label: '餐饮美食' },
        { value: 'shopping', label: '购物超市' },
        { value: 'bank', label: '银行ATM' },
        { value: 'medical', label: '医疗健康' },
        { value: 'transport', label: '交通出行' }
      ],
      distanceOptions: [
        { value: 500, label: '500米内' },
        { value: 1000, label: '1公里内' },
        { value: 2000, label: '2公里内' }
      ],
      facilities: [
        {
          id: 1,
          name: '校园生活超市',
          type: 'shopping',
          distance: 200,
          address: '校西门对面50米',
          hours: '07:00-22:30',
          phone: '123-4567890',
          tips: '学生凭校园卡可享9折优惠'
        },
        // 其他设施数据...
      ],
      currentFacility: null,
      showDetail: false
    }
  },
  computed: {
    filteredFacilities() {
      return this.facilities.filter(facility => {
        const typeMatch = !this.filter.type || facility.type === this.filter.type;
        const distanceMatch = !this.filter.distance || facility.distance <= this.filter.distance;
        return typeMatch && distanceMatch;
      }).sort((a, b) => a.distance - b.distance);
    }
  },
  methods: {
    getTypeName(type) {
      const typeMap = {
        dining: '餐饮',
        shopping: '购物',
        bank: '银行',
        medical: '医疗',
        transport: '交通'
      };
      return typeMap[type] || type;
    },
    getTagType(type) {
      const typeColors = {
        dining: 'warning',
        shopping: 'success',
        bank: '',
        medical: 'danger',
        transport: 'info'
      };
      return typeColors[type] || '';
    },
    getImageUrl(type) {
      const images = {
        dining: require('@/assets/facilities/dining.png'),
        shopping: require('@/assets/facilities/shopping.png'),
        bank: require('@/assets/facilities/bank.png'),
        medical: require('@/assets/facilities/medical.png'),
        transport: require('@/assets/facilities/transport.png')
      };
      return images[type] || require('@/assets/facilities/default.png');
    },
    showFacilityDetail(facility) {
      this.currentFacility = facility;
      this.showDetail = true;
    },
    openNavigation(facility) {
      // 实际项目中可接入地图导航
      this.$message.success(`即将导航到: ${facility.name}`);
      this.showDetail = false;
      
      // 示例：打开新窗口模拟导航
      window.open(`https://maps.google.com?q=${facility.address}`, '_blank');
    }
  }
}
</script>

<style scoped>
.facilities-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.facility-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.facility-card {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.facility-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.facility-image img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.facility-info {
  padding: 15px;
}

.facility-info h3 {
  margin: 0 0 10px 0;
  font-size: 16px;
}

.meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.address {
  color: #666;
  font-size: 13px;
  margin: 0;
}

.facility-detail {
  display: flex;
  gap: 20px;
}

.detail-image {
  flex: 1;
}

.detail-image img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 4px;
}

.detail-info {
  flex: 2;
}

.tips {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 4px;
}

.tips h4 {
  margin-top: 0;
  color: #333;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filters {
    margin-top: 10px;
  }
  
  .facility-detail {
    flex-direction: column;
  }
}
</style>