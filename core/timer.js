const timerObj = {
    timerArray: [],
    
    idx: 1,
    
    getIdx() {
        return this.idx++;
    },
    
    itv: 0
}

let lastTime = Date.now();
function onTick() {
    let now = Date.now();

    let idxList = [];
    // 遍历一遍list，并执行
    timerObj['timerArray'].forEach((item) => {
        if(item['waitTime'] + item['startTime'] <= now) {
            // 触发
            item['callback'].call(item['instance'], now - lastTime);

            if(item['repeat']) {
                // 继续重复
            } else {
                idxList.push(item['id']);
            }
        }
    });

    if(idxList.length > 0) {
        removeTimer(idxList);
    }

    lastTime = now;

}

export function startTimer() {
    // 为了降低压力，100ms一次tick
    timerObj['itv'] = setInterval(onTick, 16);
}

export function endTimer() {
    timerObj['itv'] != 0 && clearInterval(timerObj['itv']);

    timerObj['timerArray'] = [];
}

export function pauseTimer() {
    // 记录当前时间
    timerObj['itv'] != 0 && clearInterval(timerObj['itv']);
}

export function resumeTimer() {
    // 计算pause到现在的时间差
    timerObj['itv'] = setInterval(onTick, 100);
}

export function addTimer(waitTime, instance, callback, repeat = false) {
    let obj = {
        waitTime,
        instance,
        callback,
        repeat,
        startTime: Date.now(),
        id: timerObj.getIdx()
    }
    
    timerObj['timerArray'].push(obj);

    return obj['id'];
}

export function removeTimer(timeInstance) {
    let timeInts = [].concat(timeInstance);

    timerObj['timerArray']= timerObj['timerArray'].filter((e) => {
        return timeInts.includes(e.id);
    });
}

// formates
export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}


export function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

export function formatTimeToDetail(second) {
    let hour = parseInt(second / 60 / 60);
    let min = parseInt(second / 60 % 60);
    let sec = parseInt(second % 60);
    let day = 0;
    
    if(hour > 24) {
      day = parseInt(hour / 24 % 24);
      hour = parseInt(hour % 24);
      return {
          unit: ['天', '时', '分'],
          time: [day, hour, min]
      }
    } else {
        return {
            unit: ['时', '分', '秒'],
            time: [hour, min, sec]
        }
    }
}

