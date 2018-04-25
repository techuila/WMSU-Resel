<?php 
    include 'connect.php';  
    header('Content-type: application/json');

    $sql = "SELECT * FROM offices WHERE offices_id = 4";
    $result = mysqli_query($connect,$sql);


    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            //echo "vr1: " . $row["vr1"]. " - vr2: " . $row["vr2"]. "<br>";
            $banner = iconv(mb_detect_encoding($row["office_text"], mb_detect_order(), true), "UTF-8", $row["office_text"]);
        
        }
        // print_r($food);
    }
    echo json_encode($banner);
   

?>