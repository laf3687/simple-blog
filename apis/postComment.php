<?php

include("../classes/ConnectMySQL.php");
include("../classes/Statements.php");
include("../classes/PreparedStatement.php");
include("../classes/JsonHandler.php");
include("../classes/FieldRequiredHandler.php");

FieldRequiredHandler::checkPostRequirements(["comment", "post_id"]);
$post_id = $_POST["post_id"];
$comment = $_POST["comment"];
if ($comment === "") {
    JsonHandler::throwErrorAndDie("The comment cannot be empty.");
}

if (trim($comment) === "") {
    JsonHandler::throwErrorAndDie("The comment cannot be empty. (checked trimmed whitespace)");
}


$mysqlConnection = connectDatabase();

try {
    $statement = new PreparedStatement(
        $mysqlConnection,
        Statements::$createComment,
        [
            new pInt($post_id),
            new pString($comment)
        ]
    );
    $statement->bind();
    $statement->execute();
} catch (\Throwable $t) {
    JsonHandler::throwErrorAndDie($t->getMessage());
}
JsonHandler::successMessageAndDie("Your comment has been successfully posted.");
?>
