var PassSec = 0;
function start() {
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
function showPassage() {
    PassSec++;   // カウントアップ
    var hunkyu = document.getElementById("Zikyu").value / 3600;   // 秒給
    var msg = PassSec + "秒";   // 表示文作成
    var msg2 = (PassSec * hunkyu).toFixed(2) + "円";   // 表示文作成
    document.getElementById("timer").innerHTML = msg;   // 表示更新
    document.getElementById("kyuryo").innerHTML = msg2;   // 表示更新
}