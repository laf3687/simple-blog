function displayPost(postObject) {
    const template = document.querySelector(".post-template")
    const postContainerClone = template.content.cloneNode(true).querySelector("*")
    const postContainerClickable = postContainerClone.querySelector("a.post-container-clickable")

    const postTitle = postContainerClone.querySelector(".post-title")
    const postBody = postContainerClone.querySelector(".post-truncated-body")
    const postDate = postContainerClone.querySelector(".post-date")
    postTitle.textContent = postObject.title
    // postTitle.href = "viewPost.html?post_id=" + postObject.post_id
    postContainerClickable.href = "viewPost.html?post_id=" + postObject.post_id
    postBody.textContent = postObject.truncated_body
    postDate.textContent = new Date(`${postObject.date_posted}`).toLocaleDateString()
    document.querySelector(".posts").append(postContainerClone)
}
async function getPosts() {
    try {
        const data = await fetch("/apis/getposts.php")
        if (!data.ok) {
            throw new Error("fetch failed")
        }
        const response = await data.json()
        console.log(response)
        for (const article of response.data) {
            displayPost(article)

        }
    } catch (err) {
        throw new Error(err.message)
    }
}