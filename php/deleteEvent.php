<?php
    // header('Content-type: application/json');
    include 'connect.php';
    $id = $_POST['res_id'];
    $sql = "DELETE FROM research WHERE res_id = '$id'";

    mysqli_query($connect,$sql);
    echo json_encode('asd');
?>