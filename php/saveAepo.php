<?php


    // header('Content-type: application/json');
    $connect = mysqli_connect("localhost", "root", "", "wmsu"); 

    $txtorg1 = $_POST['textaepo'];
    $query2 = "UPDATE `offices` SET `office_text`='$txtorg1' WHERE offices_id = 5";

    $fileDestination = "../img/".basename($_FILES['image']['name']);
    $filetmp = $_FILES['image']['tmp_name'];
      
    move_uploaded_file($filetmp,$fileDestination);
      
    if(mysqli_query($connect, $query2)){
        header('Refresh:.5; url=../index.php');
    }else{
        echo json_encode('Update Failed');
    }

?>