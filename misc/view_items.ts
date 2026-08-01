async function retrieve(link: string, httpMethod: string = "GET", formData?: FormData | undefined) {
    try {
        const request = await fetch(link, {
            method: httpMethod,
            body: formData
        })
        if (!request.ok) {
            throw new Error(await request.text())
        }
        const data = await request.json()
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}
// retrieve("http://localhost:3000/getPosts.php")
const formData = new FormData()
formData.set("post_id", "7")
// formData.set("comment", "<script>alert('z');</script>")
retrieve("http://localhost:3000/apis/getPostFromId.php", "POST", formData)