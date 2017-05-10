<?php
include "DBHelper.php";
include 'format.php';

//接受变量
$ele = $_POST["elephone"];

//判断号码是否存在
$emailCheck = format("select * from register where elephone='{0}'", $ele);
$result = query($emailCheck);

if(count($result) < 1){
    echo "{state : true}";
}else{
    echo "{state : false}";
}
?>