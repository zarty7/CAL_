# 食物卡路里检测系统

## 一、系统架构设计

1. **前端架构**：
   - 基于HTML5/CSS3构建响应式界面
   - 使用Canvas API进行图片处理
   - 通过Fetch API与百度AI接口交互

2. **核心功能模块**：
   - 图片上传与预览
   - 图片预处理系统
   - AI识别接口调用
   - 结果可视化展示

3. **核心功能模块流程图**：
   ```mermaid
   graph TD
   A[用户界面] --> B[图片上传]
   A --> C[图片预览]
   A --> D[结果展示]
   B --> E[图片处理引擎]
   E --> F[尺寸调整]
   E --> G[格式转换]
   E --> H[质量压缩]
   F --> I[调用百度AI API]
   I --> J[结果解析]
   J --> D
   ```

## 二、关键技术实现

1. **图片处理模块**:
```javascript
const MAX_SIZE = 4 * 1024 * 1024;  // 4MB限制
const MIN_SIDE = 15;               // 最小边长
const MAX_SIDE = 4096;             // 最大边长

// 图片处理流程
async function processImage(file) {
  const img = await loadImage(file);    // 加载图片
  const resized = resizeImage(img);     // 智能缩放
  return await convertImage(resized);   // 格式转换
}
```

2. **智能缩放算法**:
    - 动态计算宽高比例
    - 双限制检查（最小/最大边长）
    - Canvas重绘实现高质量缩放

3. **格式转换优化**:
```javascript
function convertImage(canvas) {
  // 白色背景填充
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 渐进式质量压缩
  let quality = 0.9;
  while(blob.size > MAX_SIZE && quality > 0.3){
    quality -= 0.1;
    // 重新生成blob...
  }
}
```

## 三、接口集成方案
1. **AI接口调用流程**:
```javascript
const API_URL = `https://aip.baidubce.com/rest/2.0/image-classify/v2/dish`;

// 请求参数配置
const params = new URLSearchParams();
params.append('image', base64Data);
params.append('top_num', '5');     // 返回前5个结果
params.append('baike_num', '1');   // 包含百科信息
```

## 四、界面设计要点
1. **布局设计**:
- 响应式容器 ：最大宽度800px，居中布局
- 视觉层级 ：
```css
.upload-section {  /* 虚线边框容器 */
  border: 2px dashed #000;
  padding: 20px;
}
```

2. **交互优化**:
- 按钮状态反馈 ：
```css
button:hover {  /* 悬停效果 */
  background-color: #6e2bff;
}
```

- 加载状态提示 ：
```javascript
loading.style.display = 'block';  // 显示加载提示
```

## 五、可扩展设计
1. 模块化结构：
  - 图片处理与业务逻辑分离
  - 可配置参数集中管理
  - 样式与脚本分离

2. 扩展点：
  - 卡路里计算模块
  - 多API备用方案
  - 用户历史记录
  - 社交分享功能

## 六、待优化项
**安全增强**：

  - AccessToken动态获取
  - 文件类型白名单验证

**性能优化**：

  - Web Worker处理图片
  - 本地缓存机制
  - 请求结果缓存

**体验提升**：

  - 拖放文件支持
  - 上传进度指示
  - 移动端适配优化


### 该方案实现了从图片上传到营养分析的全流程处理，核心优势在于：
1. 智能图片处理流水线
2. 完善的错误处理机制
3. 可扩展的架构设计
4. 良好的用户体验细节

### 后续可结合营养数据库扩展卡路里计算功能，打造完整的饮食健康分析系统。 ###