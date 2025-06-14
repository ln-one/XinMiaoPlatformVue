<template>
  <div class="documents-container">
    <!-- 标题和操作区 -->
    <div class="header">
      <h2><i class="el-icon-folder-opened"></i> 入学文件准备清单</h2>
      <div class="actions">
        <el-button size="small" @click="expandAll">全部展开</el-button>
        <el-button size="small" @click="collapseAll">全部折叠</el-button>
      </div>
    </div>

    <!-- 分类文件展示 -->
    <el-collapse v-model="activeCategories" accordion>
      <el-collapse-item 
        v-for="category in categories" 
        :key="category.type"
        :name="category.type">
        
        <template #title>
          <div class="category-header">
            <el-tag :type="category.tagType" size="medium">
              {{ category.title }}
            </el-tag>
            <span class="progress">
              {{ getProgress(category.type) }}%
            </span>
          </div>
        </template>

        <div class="document-item" 
          v-for="doc in getDocumentsByType(category.type)" 
          :key="doc.id">
          <el-checkbox v-model="doc.checked" @change="saveState"></el-checkbox>
          <span class="doc-name">{{ doc.name }}</span>
          
          <el-popover
            v-if="doc.remark"
            placement="right"
            trigger="click"
            width="200">
            <template #reference>
              <el-button type="text" icon="el-icon-info"></el-button>
            </template>
            <div class="remark-content">{{ doc.remark }}</div>
          </el-popover>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 操作按钮组 -->
    <div class="footer-actions">
      <el-button 
        type="primary" 
        icon="el-icon-printer" 
        @click="handlePrint">
        打印清单
      </el-button>
      <el-button 
        icon="el-icon-download"
        @click="exportAsText">
        导出文本
      </el-button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'DocumentChecklist',
  data() {
    return {
      activeCategories: ['required'],
      categories: [
        { type: 'required', title: '必带证件', tagType: 'danger' },
        { type: 'academic', title: '学籍材料', tagType: 'warning' },
        { type: 'other', title: '其他资料', tagType: 'success' }
      ],
      documents: [
        { 
          id: uuidv4(),
          type: 'required',
          name: '录取通知书原件',
          checked: false,
          remark: '需携带原件，遗失需联系招生办公室补办'
        },
        {
          id: uuidv4(),
          type: 'required',
          name: '身份证及复印件',
          checked: false,
          remark: '准备3份复印件，建议使用A4纸单面复印'
        },
        // 其他文档数据...
      ]
    }
  },
  created() {
    this.loadSavedState();
  },
  methods: {
    getDocumentsByType(type) {
      return this.documents.filter(doc => doc.type === type);
    },
    getProgress(type) {
      const docs = this.getDocumentsByType(type);
      if (docs.length === 0) return 0;
      const checkedCount = docs.filter(doc => doc.checked).length;
      return Math.round((checkedCount / docs.length) * 100);
    },
    expandAll() {
      this.activeCategories = this.categories.map(c => c.type);
    },
    collapseAll() {
      this.activeCategories = [];
    },
    saveState() {
      localStorage.setItem('documentChecklist', JSON.stringify(this.documents));
    },
    loadSavedState() {
      const saved = localStorage.getItem('documentChecklist');
      if (saved) {
        this.documents = JSON.parse(saved);
      }
    },
    async handlePrint() {
      await this.$nextTick();
      const printContent = this.generatePrintContent();
      const printWindow = window.open('', '_blank');
      
      // 使用document.createElement创建DOM元素更安全
      const doc = printWindow.document;
      const html = doc.createElement('html');
      const head = doc.createElement('head');
      const body = doc.createElement('body');
      
      head.innerHTML = `
        <title>入学文件清单</title>
        <style>
          body { font-family: "Microsoft YaHei", sans-serif; padding: 20px; }
          h2 { color: #333; text-align: center; }
          .category { margin-bottom: 20px; }
          ul { list-style-type: none; padding-left: 0; }
          li { margin: 8px 0; padding-left: 20px; }
        </style>
      `;
      
      body.innerHTML = printContent;
      html.appendChild(head);
      html.appendChild(body);
      doc.appendChild(html);
      
      // 使用setTimeout避免打印阻塞
      printWindow.setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 300);
    },
    generatePrintContent() {
      let content = '<h2>入学文件准备清单</h2>';
      
      this.categories.forEach(category => {
        const docs = this.getDocumentsByType(category.type);
        content += `
          <div class="category">
            <h3>${category.title} (完成度: ${this.getProgress(category.type)}%)</h3>
            <ul>
              ${docs.map(doc => `
                <li>
                  ${doc.checked ? '✓' : '○'} ${doc.name}
                  ${doc.remark ? `<br><small>备注: ${doc.remark}</small>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        `;
      });
      
      content += `<p style="text-align:center;color:#999;">生成时间: ${new Date().toLocaleString()}</p>`;
      return content;
    },
    exportAsText() {
      let text = '=== 入学文件准备清单 ===\n\n';
      
      this.categories.forEach(category => {
        text += `◆ ${category.title} [${this.getProgress(category.type)}%]\n`;
        
        this.getDocumentsByType(category.type).forEach(doc => {
          text += `  ${doc.checked ? '[✓]' : '[ ]'} ${doc.name}\n`;
          if (doc.remark) text += `    备注: ${doc.remark}\n`;
        });
        
        text += '\n';
      });
      
      // 使用Blob实现文件下载
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `入学文件清单_${new Date().toLocaleDateString()}.txt`;
      link.click();
      URL.revokeObjectURL(url);
    }
  }
}
</script>

<style scoped>
.documents-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.category-header {
  display: flex;
  align-items: center;
  width: 100%;
}

.progress {
  margin-left: auto;
  color: #666;
  font-size: 14px;
}

.document-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #eee;
}

.doc-name {
  margin-left: 10px;
  flex: 1;
}

.remark-content {
  padding: 10px;
  line-height: 1.5;
}

.footer-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 20px;
}
</style>