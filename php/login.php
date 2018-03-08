<?php 
    header('Content-type: application/json');
    $connect = mysqli_connect("localhost", "root", "", "wmsu"); 
  
    $user = $_POST['user'];
    $pass = $_POST['pass'];

    $sql = "SELECT * FROM account WHERE user = '$user' AND pass = '$pass'";
    $result = mysqli_query($connect,$sql);


    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $banner = true;
            $banner['nam'] = $row['nam'];
        
        }
        // print_r($food);
    } else{
        $banner = false;
    }
    echo json_encode($banner);
   

?>