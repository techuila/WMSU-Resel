<?php 
    header('Content-type: application/json');
    $connect = mysqli_connect("localhost", "root", "", "wmsu"); 
  

    $sql = "SELECT * FROM university_counsil WHERE uc_id = 1";
    $result = mysqli_query($connect,$sql);


    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            //echo "vr1: " . $row["vr1"]. " - vr2: " . $row["vr2"]. "<br>";
            $banner = $row["uc_text"];
        
        }
        // print_r($food);
    }
    echo json_encode($banner);
   

?>