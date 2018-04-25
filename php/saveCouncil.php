<?php


    // header('Content-type: application/json');
    include 'connect.php';

    $txtorg1 = $_POST['textcouncil'];
    $query2 = "UPDATE `university_counsil` SET `uc_text`='$txtorg1' WHERE uc_id = 1";
      
    if(mysqli_query($connect, $query2)){
        echo json_encode('Update Success');        
    }else{
        echo json_encode('Update Failed');
    }

?>