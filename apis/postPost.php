<?php

include("../classes/ConnectMySQL.php");
include("../classes/Statements.php");
include("../classes/PreparedStatement.php");
include("../classes/JsonHandler.php");
include("../classes/FieldRequiredHandler.php");

FieldRequiredHandler::checkPostRequirements(["title","body"]);
$title = $_POST["title"];
$body = $_POST["body"];

$mysqlConnection = connectDatabase();

$statement = new PreparedStatement(
    $mysqlConnection, 
    Statements::$createPost, 
    [
        new pString($title),
        new pString($body)
    ]
);
$statement -> bind();
$statement -> execute();

// successMessage("")
JsonHandler::successMessageAndDie("Your post has been successfully created.")


?>