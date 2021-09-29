var PassSec = 0;
function start() {
    // 開始時間を設定した場合に情報を追加する
    // 日付超えて働かない前提でコードを書く
    if(document.querySelector("#startTime")){
        const startTimeAry = document.querySelector("#startTime").value.split(":")
        const startTimeS = +startTimeAry[0] * 3600 + +startTimeAry[1] * 60
        const now = new Date()
        const nowS = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
        PassSec = nowS - startTimeS
    }
    PassageID = setInterval('showPassage()',1000);
    document.getElementById("start").disabled = true;
    document.getElementById("reset").disabled = true;
    document.getElementById("stop").disabled = false;
}
function stop(){
    clearInterval( PassageID );
    document.getElementById("start").disabled = false;
    document.getElementById("reset").disabled = false;
}
function reset(){
    PassSec = 0;
    document.getElementById("timer").innerHTML = "タイマー";
    document.getElementById("kyuryo").innerHTML = "給料";
}

function secToHour(x){
    const data = {
        hour : x / 3600 | 0,
        min : x % 3600 / 60 | 0,
        sec : x % 60
    }
    return `${!data.hour ? "": `${data.hour}時間`}${!data.min ? "": `${data.min}分`}${data.sec}秒`
}

function showPassage() {
    PassSec++;   // カウントアップ
    var hunkyu = document.getElementById("Zikyu").value / 3600;   // 秒給
    var msg = secToHour(PassSec)   // 表示文作成
    var msg2 = (PassSec * hunkyu).toFixed(2) + "円";   // 表示文作成
    document.getElementById("timer").innerHTML = msg;   // 表示更新
    document.getElementById("kyuryo").innerHTML = msg2;   // 表示更新
}

function getUrlData(){ // URLパラメータをjsonにする
    if(!document.location.search){
        return false
    }
    try {
        const url_param = JSON.parse(`{"${
            document.location.search
            .replace('?', '')
            .replaceAll('&', `","`)
            .replaceAll('=',`":"`)
        }"}`)
        return url_param
    }
    catch(e){
        console.error('URL取得エラー')
        window.location.href = window.location.href.split('?')[0]
        return false
    }
}

function main(){ // ページを開いて最初にやること
    const urlData = getUrlData()
    if(!urlData){ // urlDataがなかったら終了
        return false
    }
    document.querySelector("#Zikyu").value = +urlData.zikyu ? +urlData.zikyu : 1200
    PassSec = +urlData.s ? +urlData.s : 0 // 秒を設定
    urlData.start = decodeURIComponent(urlData.start)
    if(urlData.flag == "true"|| (urlData.start ? /^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(urlData.start) : false)){
        const setTimeInput = document.createElement("input")
        setTimeInput.setAttribute("type", "time")
        setTimeInput.setAttribute("id", "startTime")
        setTimeInput.setAttribute("value", urlData.start ? urlData.start : "10:00")
        document.querySelector(".controller").appendChild(setTimeInput)
    }
}

main()