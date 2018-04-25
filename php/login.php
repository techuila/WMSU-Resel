<?php 
    // header('Content-type: application/json');
    $host = 'localhost';
    $db = 'wmsu';
    $username = 'root';
    $password = '';
    $charset = 'utf8mb4';
    
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $opt = [
        PDO::ATTR_ERRMODE               => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE    => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES      => false,
    ];
    $pdo = new PDO($dsn, $username, $password, $opt);

    $user = $_POST['user'];
    $pass = $_POST['pass'];

    $preparedStatement = $pdo -> prepare("SELECT * FROM account WHERE user = ? AND pass = ?");
    $preparedStatement -> execute([$user, $pass]);


    if ($preparedStatement -> rowCount() > 0) {
        $login['status'] = true;
        foreach($preparedStatement as $row){
            $login['username'] = $row['nam'];
            $login['uname'] = $row['user'];
            $login['pass'] = $row['pass'];
        }
    } else{
        $login['status'] = false;
    }
    echo json_encode($login);
   

?>