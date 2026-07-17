<?php
class PreparedStatement {
    /**
     * $dataTypes should be an array of anything that fits under a pwrapper
     */
    public \mysqli $mysqlConnection;
    public string $query;
    public array $dataTypes;
    public \mysqli_stmt $prepared;
    public function __construct(\mysqli $mysqlConnection, string $query, array $dataTypes) {
        foreach ($dataTypes as $dt) {
            if (gettype($dt) == "object") {
                if (!in_array(get_class($dt), pWrapper::$validTypes)) {
                    JsonHandler::throwErrorAndDie("datatype must be a valid member of wrapper: ".$dt->getValue());
                }
            } else {
                JsonHandler::throwErrorAndDie("preparedStatement incorrectly initialized regarding datatypes: $query");
            }
        }

        $this->mysqlConnection = $mysqlConnection;
        $this->query = $query;
        $this->dataTypes = $dataTypes;
        $this->prepared = $this->prepare();
    }
    private function prepare(): \mysqli_stmt {
        return $this->mysqlConnection->prepare($this->query);
    }
    public function bind() {
        $binds = "";
        $values = [];
        foreach ($this->dataTypes as $dt) {
            $binds .= $dt->getP();
            $values[] = $dt->getValue();
        }
        $this->prepared -> bind_param($binds, ...$values);
    }
    public function execute() {
        try {
            $this->prepared -> execute();
        } catch (\Throwable $t) {
            JsonHandler::throwErrorAndDie("Fatal error: " . $t -> getMessage());
        }
    }
    public function getResult(): \mysqli_result {
        return $this->prepared -> get_result();
    }
}


/**
 * abstract Wrapper for wrapped datatypes
 */
abstract class pWrapper {
    public $value;
    public function getValue() {
        return $this->value;
    }
    public static $validTypes = [
        "pInt",
        "pString",
        "pFloat"
    ];
}

/**
 * prepared Integer Wrapper
 */
class pInt extends pWrapper {
    public function __construct(int $int) {
        $this->value = $int;
    }
    public function getP() {
        return 'i';
    }
}

/**
 * prepared String Wrapper
 */
class pString extends pWrapper {
    public function __construct(string $string) {
        $this->value = $string;
    }
    public function getP() {
        return 's';
    }
}

/**
 * prepared Float Wrapper
 */
class pFloat extends pWrapper {
    public function __construct(float $float) {
        $this->value = $float;
    }
    public function getP() {
        return 'd';
    }
}


?>