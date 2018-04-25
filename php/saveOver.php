<?php
    include 'connect.php';
    header('Content-type: application/json');
    
    $txtov1 = $_POST['textov'];
    $query2 = "UPDATE `overview` SET `ov_text`='$txtov1' WHERE ov_id = 1";
        
    if(mysqli_query($connect, $query2)){
        echo json_encode('Overview content sccessfully updated!');
    }else{
        echo json_encode('Update Failed');
    }

?>