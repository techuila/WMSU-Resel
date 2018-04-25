<?php
    include 'connect.php';    
    header('Content-type: application/json');

    $sql = "SELECT * FROM research";
    $result = mysqli_query($connect,$sql);

    $counter = 0;
    if($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $news[$counter]["res_id"] = $row["res_id"];
            $news[$counter]["res_img"] = base64_encode($row["res_img"]);
            $news[$counter]["res_header"] = $row["res_header"];
            $news[$counter]["res_text"] = iconv(mb_detect_encoding($row["res_text"], mb_detect_order(), true), "UTF-8", $row["res_text"]);

            $counter += 1;
        }
    }

    echo json_encode($news);
?>