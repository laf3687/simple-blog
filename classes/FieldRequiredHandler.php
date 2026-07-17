<?php
class FieldRequiredHandler {
    public static function checkPostRequirements(array $valuesRequired) {
        foreach ($valuesRequired as $val) {
            if (!isset($_POST[$val])) {
                JsonHandler::throwErrorAndDie("Could not find $val in the POST superglobal.");
            }
        }
    }
}

?>