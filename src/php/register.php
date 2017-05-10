<?php
	include 'DBHelper.php';
	include 'format.php';

	//判断当前 email 是否已存在数据表中
	$emailCheck = format("select * from register where elephone='{0}'", $_POST["elephone"]);
	$result = query($emailCheck);
	//当前 email 不存在，执行插入操作
	if(count($result) < 1){
		$sql = format("insert into register(elephone, password) values('{0}', '{1}')", $_POST["elephone"], $_POST["password"]);
		// echo $sql;
		$excute = excute($sql);
		if($excute){
			echo "{state: true}";
		} else {
			echo "{state: false, message: '插入失败！！！'}";
		}
	} else {
		echo "{state: false, message: '该号码已被注册！！！'}";
	}
?>