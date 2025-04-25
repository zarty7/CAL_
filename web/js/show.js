        // 结果显示
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
                <p>菜品名称：${item.name} (概率：${(item.probability * 100).toFixed(1)}%)</p>
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
        function handleLogin() {
                alert('正在返回主界面……');
                window.location.href = 'login.html'; // 修改为你的实际页面路径      
        }