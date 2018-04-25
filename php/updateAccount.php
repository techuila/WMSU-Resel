<?php
    session_start();
    $host = "127.0.0.1";
    $db = "wmsu";
    $user = "root";
    $pass = "";
    $charset = "utf8mb4";

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

    $opt = [
        PDO::ATTR_ERRMODE               => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE    => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES      => false,
    ];
    $pdo = new PDO($dsn, $user, $pass, $opt);

    $sec = $_POST['section'];
    $username = $_POST['username'];
    $data['pw'] = '';
    
    if($sec == "uname"){
        $uname = trim($_POST['uname']);
        $preparedStatement = $pdo -> prepare("UPDATE account SET nam=? WHERE user=? ;");
        $preparedStatement -> execute([$uname,$username]);
        $data['success'] = true;
    }else if($sec == "username"){
        $user = trim($_POST['user']);
        $preparedStatement = $pdo -> prepare("UPDATE account SET user=? WHERE user=? ;");
        $preparedStatement -> execute([$user,$username]);
        $data['success'] = true;
    }else{
        $oldPass = trim($_POST['oldPass']);
        $c_oldPass = trim($_POST['coldPass']);
        $newPass = trim($_POST['newPass']);
        $c_newPass = trim($_POST['cPass']);
        if(($oldPass == $c_oldPass && $oldPass != $newPass) && $newPass == $c_newPass){
            $preparedStatement = $pdo -> prepare("UPDATE account SET pass=? WHERE user=? ;");
            $preparedStatement -> execute([$newPass,$username]);
            $data['pw'] = $newPass;
            $data['success'] = true;
        }else if($oldPass != $c_oldPass){
            $data['err'] = "Incorrect old password!";
            $data['success'] = false;
        }else if($newPass != $c_newPass){
            $data['err'] = "New password doesn't match with confirmation password!";
            $data['success'] = false;
        }else if($oldPass == $newPass){
            $data['err'] = "New password shouldn't match old password!";
            $data['success'] = false;
        }
    }


    echo json_encode($data);
?>