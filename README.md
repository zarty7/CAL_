# 食物卡路里检测系统

## 一、系统架构设计

1. **前端架构**：
   - 基础技术栈 HTML5 + CSS3 + JavaScript
   - 使用Canvas API进行图片处理
   - 通过Fetch API与后端AI接口交互

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
   F --> I[调用后端 API]
   I --> J[结果解析]
   J --> D
   ```
   

## 二、核心技术实现
  **1. 图片处理技术**
  
- Canvas：用于图片处理和绘制
- File API：用于文件读取和处理
- URL.createObjectURL：用于生成图片预览链接

```javascript
// 使用Canvas API进行图片处理
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


  **2. 图片上传与预览**
```javascript
// 图片预览功能
const preview = document.getElementById('preview');
const previewImage = document.getElementById('previewImage');

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            preview.style.display = 'block';
        };
        
        reader.readAsDataURL(file);
    }
});
```

  **3. 网络请求技术**
  
- Fetch API：用于网络请求
- async/await：异步编程模型
```javascript
// 使用Fetch API调用百度AI接口
const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
});
```

  **4. 数据可视化**
```javascript
// 结果展示函数
function showResult(data) {
    const resultDiv = document.getElementById('result');
    
    if (data.error_code) {
        resultDiv.innerHTML = `错误：${data.error_msg}`;
        return;
    }

    let html = '<h3 class="result-title">识别结果</h3>';
    data.result.forEach(item => {
        html += `
        <div class="dish-item">
            <p>菜品名称：${item.name} (概率：${(item.probability * 100).toFixed(1)}%，卡路里：${(item.calorie)}/100g)</p>
            ${item.baike_info ? `
                <div class="baike-info">
                    <p>${item.baike_info.description || '暂无百科信息'}</p>
                    ${item.baike_info.image_url ? `
                        <img src="${item.baike_info.image_url.replace(/^http:\/\//i, 'https://')}" 
                            style="max-width: 200px;"
                            onerror="this.style.display='none'">
                    ` : ''}
                </div>
            ` : ''}
        </div>`;
    });

    resultDiv.innerHTML = html;
}
```


## 三、算法实现
  **1. 图片智能缩放算法**

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
- 动态计算宽高比例
- 双限制检查（最小/最大边长）
- Canvas重绘实现高质量缩放

**2. 图片格式转换优化**

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
**3. 概率计算与结果显示**

```javascript
html += `<p>菜品名称：${item.name} (概率：${(item.probability * 100).toFixed(1)}%，卡路里：${(item.calorie)}/100g)</p>`;
```


## 四、接口集成方案
  **1. AI识别接口**

```javascript
const API_URL = `https://aip.baidubce.com/rest/2.0/image-classify/v2/dish`;

// 请求参数配置
const params = new URLSearchParams();
params.append('image', base64Data);
params.append('top_num', '5');     // 返回前5个结果
params.append('baike_num', '1');   // 包含百科信息
```
**2. 错误处理机制**

```javascript
if (!response.ok) throw new Error(`HTTP错误 ${response.status}`);
const data = await response.json();

if (data.error_code) {
    throw new Error(`API错误: ${data.error_msg}`);
}
```


## 五、交互设计与优化
  **1. 用户交互优化**
```css
button:hover {  /* 悬停效果 */
  background-color: #6e2bff;
}
```

  **2. 加载状态提示**
```javascript
loading.style.display = 'block';  // 显示加载提示
```

  **3. 页面导航**
```javascript
function handleLogin() {
    window.location.href = 'Identify.html'; // 页面跳转
}
```


## 六、可扩展设计
**1. 模块化结构**
- 图片处理与业务逻辑分离
- 可配置参数集中管理
- 样式与脚本分离

**2. 扩展点**
- 卡路里计算模块
- 多API备用方案
- 用户历史记录
- 社交分享功能


## 七、待优化项
**1. 安全增强**
- AccessToken动态获取
- 文件类型白名单验证

**2. 性能优化**
- Web Worker处理图片
- 本地缓存机制
- 请求结果缓存

**3. 体验提升**
- 拖放文件支持
- 上传进度指示
- 移动端适配优化

该方案实现了从图片上传到营养分析的全流程处理，核心优势在于：

- 智能图片处理流水线
- 完善的错误处理机制
- 可扩展的架构设计
- 良好的用户体验细节

后续可结合营养数据库扩展卡路里计算功能，打造完整的饮食健康分析系统。