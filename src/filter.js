//全局过滤器 时间处理
function timeFormat(dt){
    dt = new Date(dt);
    var year  = dt.getFullYear().toString().padStart(2,'0');
    var month = (dt.getMonth()+1).toString().padStart(2,'0');
    var date  = dt.getDate().toString().padStart(2,'0');
    var hour  = dt.getHours().toString().padStart(2,'0');
    var minutes = dt.getMinutes().toString().padStart(2,'0');
    var seconds = dt.getSeconds().toString().padStart(2,'0');

    return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`;
}

export default {
    timeFormat,
} 