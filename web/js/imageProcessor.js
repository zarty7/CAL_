// 新增图片处理配置
const MAX_SIZE = 4 * 1024 * 1024; // 4MB
const MIN_SIDE = 15;
const MAX_SIDE = 4096;

// 显示图片预览（修改后）
document.getElementById('imageInput').addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
        // 处理图片
        const processedImage = await processImage(file);
        
        document.getElementById('preview').style.display = 'block';
        document.getElementById('previewImage').src = processedImage;
        // document.getElementById('conversionOptions').style.display = 'block';
    } catch (error) {
        alert(`图片处理失败: ${error.message}`);
    }
});

// 新增图片处理函数
async function processImage(file) {
    // 读取图片
    const img = await loadImage(file);
    // 调整尺寸
    const resized = resizeImage(img);
    // 转换格式
    return await convertImage(resized);
}

// 加载图片到canvas
function loadImage(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

// 调整图片尺寸
function resizeImage(img) {
    let width = img.width;
    let height = img.height;

    // 确保尺寸符合要求
    const aspectRatio = width / height;
    if (Math.min(width, height) < MIN_SIDE) {
        if (width < height) {
            width = MIN_SIDE;
            height = width / aspectRatio;
        } else {
            height = MIN_SIDE;
            width = height * aspectRatio;
        }
    }

    if (Math.max(width, height) > MAX_SIDE) {
        if (width > height) {
            width = MAX_SIDE;
            height = width / aspectRatio;
        } else {
            height = MAX_SIDE;
            width = height * aspectRatio;
        }
    }

    // 创建canvas处理
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(width);
    canvas.height = Math.round(height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
}

// 转换图片格式并压缩
async function convertImage(canvas) {
    return new Promise((resolve, reject) => {
        let quality = 0.9;

    // 填充白色背景（关键修复）
    const applyBackgroundAndConvert = () => {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const ctx = tempCanvas.getContext('2d');
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            ctx.drawImage(canvas, 0, 0);
            
            tempCanvas.toBlob(blob => {
                if (!blob) return reject(new Error('图片转换失败'));

                if (blob.size > MAX_SIZE && quality > 0.3) {
                    quality -= 0.1;
                    applyBackgroundAndConvert();
                } else if (blob.size > MAX_SIZE) {
                    reject(new Error('图片过大，请尝试选择较小的图片'));
                } else {
                    // resolve(blob);
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result); // 返回 Data URL
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                }
            }, 'image/jpeg', quality);
        };

        applyBackgroundAndConvert();
    });
}