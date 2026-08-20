<?php
class Statements {
    static $getPosts = "SELECT post_id, title, CONCAT(SUBSTR(body, 1, 32), \"...\") as truncated_body, date_posted FROM post ORDER BY date_posted DESC";
    static $getPostFromID = "SELECT title, body, date_posted FROM post WHERE post_id = ?";
    static $getCommentsFromPostID = "SELECT comment, date_commented, reply_comment_id FROM post JOIN comment USING (post_id) WHERE post_id = ? ORDER BY date_commented DESC;";

    static $createPost = "INSERT INTO post (title, body, date_posted) VALUES (?, ?, NOW())";
    static $createComment = "INSERT INTO comment (post_id, comment, date_commented) VALUES (?, ?, NOW())";

    /**
     * returns an associative array of all items from a query
     */
    static function retrieveFromQuery(mysqli $mysqlConnection, string $query): array {
        try {
            $query = mysqli_query($mysqlConnection, $query, MYSQLI_ASSOC);
            return mysqli_fetch_all($query, MYSQLI_ASSOC);
        } catch(mysqli_sql_exception $e) {
            JsonHandler::throwErrorAndDie("Data was unretrievable. Query: " . $query);
        }
    }
}

?>