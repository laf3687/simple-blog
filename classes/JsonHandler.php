<?php

class JsonHandler {
    public static function throwErrorAndDie(string $errorMessage) {
        header("Content-Type: application/json");
        http_response_code(404);
        die(json_encode(["code" => 404, "message" => $errorMessage]));
    }
    public static function successMessageAndDie(string $successMessage) {
        header("Content-Type: application/json");
        http_response_code(201);
        die(json_encode(["code" => 201, "message" => $successMessage]));
    }
    public static function sendDataAndDie(array $data) {
        header("Content-Type: application/json");
        http_response_code(200);
        die(json_encode(["code" => 200, "data" => $data]));
    }
}

?>