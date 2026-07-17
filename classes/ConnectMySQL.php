<?php

function connectDatabase(): \mysqli {
    $mysqlConnection = null;
    try {
        $mysqlConnection = mysqli_connect("localhost", "root", "", "blog");
    } catch (mysqli_sql_exception $e) {
        http_response_code(404);
        die(json_encode(["code" => 404, "message" => "MYSQL password and/or database name incorrect."]));
    }
    return $mysqlConnection;
}

?>
