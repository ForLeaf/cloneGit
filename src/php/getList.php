<?php
include "DBHelper.php";
// include "format.php";

// $sql = "select * from student";

// $result = query($sql);
// echo json_encode($result, JSON_UNESCAPED_UNICODE);
//判断当前 email 是否已存在数据表中
// $sql = format("select * from gz1610 where email='{0}' and password='{1}'", $_POST["email"], $_POST["password"]);
$sql = "select * from goodslist where elephone='" .  $_POST["elephone"] . "'";
$result = query($sql);
//当前 email 不存在，执行插入操作

$res = json_encode($result,JSON_UNESCAPED_UNICODE);
if(count($result) < 1){
    echo "{state: false, message: '查询失败'}";
} else {
    echo "{state: true, message: '查询成功',res: $res}";
    session_start();
    $_SESSION["login_email"] = $result[0]->elephone;
}
?>