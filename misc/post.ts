async function post(title: string, message: string) {
    const formData = new FormData()
    formData.set("title", title)
    formData.set("body", message)
    try {
        const data = await fetch("http://localhost:3000/apis/postPost.php",
            {
                method: "POST",
                body: formData
            }
        )
        if (!data.ok) {
            throw new Error(await data.text())
        }
        const result = await data.json()
        console.log(result)
    } catch (err: any) {
        console.error(err.message)
    }
}
// post("Test Post 2","This is a test of\nmultiple lines\r\nwith multiple breakpoints")
post("is Java good?","No.\nIt is not good.")