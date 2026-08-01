<?php

include("../classes/Statements.php");
include("../classes/ConnectMySQL.php");
include("../classes/PreparedStatement.php");
include("../classes/JsonHandler.php");
include("../classes/FieldRequiredHandler.php");

FieldRequiredHandler::checkPostRequirements(["post_id"]);
$postID = $_POST["post_id"];

$mysqlConnection = connectDatabase();

try {
    $statement = new PreparedStatement(
        $mysqlConnection,
        Statements::$getPostFromID,
        [
            new pInt($postID)
        ]
    );
} catch (\Throwable $t) {
    JsonHandler::throwErrorAndDie($t->getMessage());
}

$statement->bind();
$statement->execute();

$result = $statement->getResult();

$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
if (sizeof($data) === 0) {
    JsonHandler::throwErrorAndDie("Post does not exist.");
} else {
    JsonHandler::sendDataAndDie($data[0]);
}
