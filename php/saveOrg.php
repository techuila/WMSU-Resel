<?php
    include 'connect.php';
    header('Content-type: application/json');
    
    $txtorg1 = $_POST['textorg'];
    $query2 = "UPDATE `organization_structure` SET `os_text`='$txtorg1' WHERE os_id = 1";
      
    if(mysqli_query($connect, $query2)){
        echo json_encode('Organizational structure content successfully updated!');
    }else{
        echo json_encode('Update Failed');
    }

?>