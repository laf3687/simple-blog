function turnTextIntoSpans(text) {
    const spans = []
    const split = text.split(" ")
    const breakOn = 18;
    let queue = ""
    for (let i = 0; i < split.length; i++) {
        const word = split[i]
        if (word.length > breakOn) {
            if (queue !== "") {
                const span = document.createElement("span")
                span.textContent = queue
                spans.push(span)
            }
            const longSpan = document.createElement("span")
            longSpan.classList.add("force-break")
            longSpan.textContent = word + ((i < split.length - 1) ? " " : "")
            spans.push(longSpan)
            queue = "";
        } else {
            if (word === "") {
                queue += "\u00A0" // for spaces in between words to respect additional white spaces
            } else {
                queue += word
            }
            if (i < split.length - 1) {
                queue += " "
            }
        }
    }
    if (queue !== "") {
        const span = document.createElement("span")
        span.textContent = queue
        spans.push(span)
    }
    return spans
}

function displayPostHelper(postContent) {
    const splitParagraphs = postContent.split(nlrgx)
    for (const p of splitParagraphs) {
        const newP = document.createElement("p")
        newP.lang = "en"
        const spans = turnTextIntoSpans(p)
        spans.forEach(span => {
            newP.append(span)
        })
        document.querySelector(".post .paragraphs").append(newP)
    }
}
function displayPost(postObject) {
    document.querySelector(".post .heading-and-date h1").textContent = postObject.title
    document.querySelector(".post .heading-and-date span").textContent = new Date(`${postObject.date_posted}`).toLocaleDateString()
    displayPostHelper(postObject.body)
}
function displayCommentHelper(commentContainerClone, commentContent) {
    const splitParagraphs = commentContent.split(nlrgx)
    for (const p of splitParagraphs) {
        const newP = document.createElement("p")
        const spans = turnTextIntoSpans(p)
        spans.forEach(span => {
            newP.append(span)
        })
        newP.classList.add("comment-text")
        commentContainerClone.append(newP)
    }
}
function displayComment(commentObject) {
    const template = document.querySelector(".comment-template")
    const commentContainerClone = template.content.cloneNode(true).querySelector("*")
    commentContainerClone.querySelector(".comment-object .date-commented").textContent = commentObject.date_commented
    displayCommentHelper(commentContainerClone, commentObject.comment)
    document.querySelector(".comments").append(commentContainerClone)
}

async function postComment(post_id, comment) {
    try {
        const formData = new FormData()
        formData.set("post_id", post_id)
        formData.set("comment", comment)
        const data = await fetch("/apis/postComment.php",
            {
                method: "POST",
                body: formData
            }
        )
        if (!data.ok) {
            throw new Error(await data.text())
        }
        const response = await data.json()
        console.log(response)
        document.querySelector(".comments").querySelectorAll(":scope > *").forEach(e => e.remove())
        form.querySelector("textarea").value = ""
        getCommentsFromPostId(post_id)
    } catch (err) {
        throw new Error(err.message)
    }
}


async function getCommentsFromPostId(post_id) {
    try {
        const formData = new FormData()
        formData.set("post_id", post_id)
        const data = await fetch("/apis/getCommentsFromPostId.php",
            {
                method: "POST",
                body: formData
            }
        )
        if (!data.ok) {
            throw new Error("fetch failed")
        }
        const response = await data.json()
        console.log(response)
        for (const comment of response.data) {
            displayComment(comment)
        }
    } catch (err) {
        throw new Error(err.message)
    }
}
async function getPostFromId(post_id) {
    try {
        const formData = new FormData()
        formData.set("post_id", post_id)
        const data = await fetch("/apis/getPostFromId.php",
            {
                method: "POST",
                body: formData
            }
        )
        if (!data.ok) {
            throw new Error("fetch failed")
        }
        const response = await data.json()
        console.log(response)
        displayPost(response.data)
    } catch (err) {
        displayPost({ title: "Error.", "body": "This post no longer exists." })
        throw new Error(err.message)
    }
}