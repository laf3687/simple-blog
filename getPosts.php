<?php

include("./classes/Statements.php");
include("./classes/ConnectMySQL.php");
include("./classes/PreparedStatement.php");
include("./classes/JsonHandler.php");
include("./classes/FieldRequiredHandler.php");

$mysqlConnection = connectDatabase();

$data = Statements::retrieveFromQuery($mysqlConnection, Statements::$getPosts);
JsonHandler::sendDataAndDie($data)

?>