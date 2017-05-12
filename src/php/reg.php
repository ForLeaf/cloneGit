<?php
    // 添加响应头
    header('Access-Control-Allow-Origin:*');
    header('content-type:text/html;charset=utf-8');

    error_reporting(7);

    // 获取前端传来的参数
    // isset()用于判断请求是否有参数
    $obj = isset($_POST['obj']) ? $_POST['obj'] : null;

    if($obj){
        $url = 'data/list.json';

        $file = fopen($url,'w+') or die("Unable to open file!");

        /*//转换传入字符串为对象
        $arr = array();*/

        // 读取文件内容
        $content = empty(fread($file, filesize($url))) ? fread($file,filesize($url)) : '';

        // 先转成数组
        $arr = empty(json_decode($content,true)) ? json_decode($content,true) : [];
        echo $obj;

        if(!in_array($obj,$arr)){

            $arr[count($arr)] = $obj;
        }

        //重新写入文件
        fwrite($file, json_encode($arr,JSON_UNESCAPED_UNICODE));

        //关闭流
        fclose($file);

        echo "{state : true}";
    }else{
        echo "{state : false}";
    }
?>