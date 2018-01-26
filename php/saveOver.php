<?php


    header('Content-type: application/json');
    $connect = mysqli_connect("localhost", "root", "", "wmsu"); 

    $txtov1 = $_POST['textov'];
    $query2 = "UPDATE `overview` SET `ov_text`='$txtov1' WHERE id = 1";
        
    if(mysqli_query($connect, $query2)){
        
        echo json_encode('Overview Successfully Updated!');
    }else{
        echo json_encode('Update Failed');
    }

?>