<?php
    include 'DBHelper.php';
    include 'format.php';

    //判断当前 email 是否已存在数据表中
    $emailCheck = format("select * from goodslist where elephone='{0}'", $_POST["elephone"]);
    $result = query($emailCheck);
    //当前 email 不存在，执行插入操作
    if(count($result) < 1){
        $sql = format("insert into goodslist(`elephone`,`guid`,`imgurl`,`name`,`price`,`qty`) values('{0}','{1}','{2}','{3}', '{4}','{5}')", $_POST["elephone"], $_POST["guid"], $_POST["imgurl"], $_POST["goodsname"], $_POST["price"], $_POST["qty"]);
        // echo $sql;
        $excute = excute($sql);
        if($excute){
            echo "{state: true, message: '新的elephone插入成功'}";
        } else {
            echo "{state: false, message: '新的elephone插入失败！！！'}";
        }
    } else {
        //判断当前 email 是否已存在数据表中
        $emailCheck = format("select * from goodslist where `elephone` = '{0}' and `guid` = '{1}'", $_POST["elephone"], $_POST["guid"]);
        $result = query($emailCheck);
        if(count($result) < 1){
            $sql = format("insert into goodslist(`elephone`,`guid`,`imgurl`,`name`,`price`,`qty`) values('{0}','{1}','{2}','{3}', '{4}','{5}')", $_POST["elephone"], $_POST["guid"], $_POST["imgurl"], $_POST["goodsname"], $_POST["price"], $_POST["qty"]);
            // echo $sql;
            $excute = excute($sql);
            if($excute){
                echo "{state: true, message: '新的guid插入成功'}";
            } else {
                echo "{state: false, message: '新的guid插入失败！！！'}";
            }
        }else{
            $sql = format("update goodslist set `qty` = '{1}' where `guid` = '{0}'", $_POST["guid"], $_POST["qty"]);
            $excute = excute($sql);
            if($excute){
                echo "{state: true, message: '更新成功！！'}";
            } else {
                echo "{state: false, message: '更新失败！！！'}";
            }
        }

    }
?>