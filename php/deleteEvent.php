<?php
    // header('Content-type: application/json');
    $connect = mysqli_connect('localhost','root','','wmsu');
    $id = $_POST['res_id'];
    $sql = "DELETE FROM research WHERE res_id = '$id'";

    mysqli_query($connect,$sql);
    echo json_encode('asd');
?>