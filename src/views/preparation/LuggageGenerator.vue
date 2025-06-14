<template>
  <div class="luggage-generator">
    <!-- 标题区 -->
    <div class="header">
      <h2>个性化行李清单</h2>
    </div>

    <!-- 条件选择表单 -->
    <el-form :model="form" label-width="100px" class="condition-form">
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="male">男生</el-radio>
          <el-radio label="female">女生</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="生源地">
        <el-select v-model="form.hometown" placeholder="请选择">
          <el-option
            v-for="province in provinces"
            :key="province.value"
            :label="province.label"
            :value="province.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="generateList">生成清单</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 生成的清单结果 -->
    <div v-if="showResult" class="result-container">
      <h3>你的行李清单</h3>
      
      <div class="category" v-for="(items, category) in luggageList" :key="category">
        <h4>{{ category }}</h4>
        <ul>
          <li v-for="(item, index) in items" :key="index">
            <el-checkbox v-model="checkedItems[item]">{{ item }}</el-checkbox>
          </li>
        </ul>
      </div>

      <!-- 简单打印按钮 -->
      <el-button 
        type="primary" 
        plain 
        @click="simplePrint"
        class="print-btn">
        <i class="el-icon-printer"></i> 打印清单
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LuggageGenerator',
  data() {
    return {
      form: {
        gender: '',
        hometown: ''
      },
      provinces: [
        { value: 'north', label: '北方地区' },
        { value: 'south', label: '南方地区' }
      ],
      luggageList: {},
      checkedItems: {},
      showResult: false
    }
  },
  methods: {
    // 生成清单（简化版）
    generateList() {
      if (!this.form.gender || !this.form.hometown) {
        this.$message.warning('请填写完整信息');
        return;
      }

      // 模拟数据生成
      this.luggageList = {
        '证件类': ['身份证', '录取通知书', '银行卡'],
        '衣物类': this.form.hometown === 'north' 
          ? ['羽绒服', '毛衣', '保暖内衣'] 
          : ['薄外套', 'T恤'],
        '洗漱用品': ['牙刷', '毛巾', '洗发水'],
        '电子产品': ['手机', '充电器', '笔记本电脑']
      };

      // 初始化勾选状态
      this.checkedItems = {};
      Object.values(this.luggageList).forEach(items => {
        items.forEach(item => {
          this.$set(this.checkedItems, item, false);
        });
      });

      this.showResult = true;
    },

    // 重置表单
    resetForm() {
      this.form = {
        gender: '',
        hometown: ''
      };
      this.showResult = false;
    },

    // 简化打印功能
    simplePrint() {
      const printContent = `
        <h2>行李清单</h2>
        ${Object.entries(this.luggageList).map(([category, items]) => `
          <h3>${category}</h3>
          <ul>
            ${items.map(item => `
              <li>${this.checkedItems[item] ? '✓' : '○'} ${item}</li>
            `).join('')}
          </ul>
        `).join('')}
        <p>生成时间：${new Date().toLocaleString()}</p>
      `;

      const printWindow = window.open('', '_blank');
      printWindow.document.write(printContent);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 200);
    }
  }
}
</script>

<style scoped>
.luggage-generator {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.condition-form {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 30px;
}

.result-container {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.category {
  margin-bottom: 25px;
}

.category h4 {
  color: #409EFF;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

ul {
  padding-left: 20px;
}

li {
  list-style: none;
  margin: 8px 0;
}

.print-btn {
  margin-top: 20px;
  width: 100%;
}
</style>