<?php


    // header('Content-type: application/json');
    include 'connect.php';
    
    $txtorg1 = $_POST['textjournal'];
    $query2 = "UPDATE `wmsu_journal` SET `wj_text`='$txtorg1' WHERE wj_id = 1";
      
    if(mysqli_query($connect, $query2)){
        echo json_encode('Update Success');
    }else{
        echo json_encode('Update Failed');
    }

?>