<?php
    $connect = mysqli_connect("localhost","root","","wmsu");
    $id = $_POST["secrets"];
    $title = $_POST["title"];
    $content = $_POST["content"];
    $file = addslashes(file_get_contents($_FILES['image']['tmp_name']));
    $result = mysqli_query($connect,"SELECT * FROM research WHERE res_id ='$id'");

    if($result->num_rows > 0){
        if(trim($file != "") || trim($file != null))
            $sql = "UPDATE research SET res_img = '$file', res_header = '$title', res_text = '$content' WHERE res_id = '$id'";
        else
            $sql = "UPDATE research SET res_header = '$title', res_text = '$content' WHERE res_id = '$id'";            
        if(mysqli_query($connect,$sql)){
            header('Refresh:.5; url=../index.php');
        }else{
            echo json_encode('Update Failed');
        }
    }else{
        $sql = "INSERT INTO research(res_img,res_header,res_text) VALUES('$file','$title','$content')";
        if(mysqli_query($connect,$sql)){
            header('Refresh:.5; url=../index.php');
        }else{
            echo json_encode('Insert Failed');
        }
    }
    
?>