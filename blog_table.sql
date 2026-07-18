CREATE TABLE post (
    post_id INT UNSIGNED AUTO_INCREMENT,
    title VARCHAR(255),
    body LONGTEXT,
    date_posted DATETIME,

    CONSTRAINT post_pk PRIMARY KEY (post_id)
);
CREATE TABLE comment (
    comment_id INT UNSIGNED AUTO_INCREMENT,
    comment LONGTEXT,
    date_commented DATETIME,

    post_id INT UNSIGNED NOT NULL,
    reply_comment_id INT UNSIGNED,

    CONSTRAINT comment_pk PRIMARY KEY (comment_id),
    CONSTRAINT comment_post_fk FOREIGN KEY (post_id) REFERENCES post (post_id),
    CONSTRAINT comment_comment_fk FOREIGN KEY (reply_comment_id) REFERENCES comment (comment_id)
);