<?php


    // header('Content-type: application/json');
    include 'connect.php';
    
    $txtorg1 = $_POST['textindustry'];
    $query2 = "UPDATE `offices` SET `office_text`='$txtorg1' WHERE offices_id = 11";
      
    if(mysqli_query($connect, $query2)){
        echo json_encode('Update Success');
    }else{
        echo json_encode('Update Failed');
    }

?>