async function post(title: string, message: string) {
    const formData = new FormData()
    formData.set("title", title)
    formData.set("body", message)
    formData.set("password", "hello_world!")
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
// post("Test Post 2","This is a test of\nmultiple lines\r\nwith multiple breakpoints")// post("is Java good?","No.\nIt is not good.")// 
// post("JavaScript is buns.","JavaScript is the language that powers the entire web. That doesn't mean that it doesn't have major flaws\nFirst of all, the lack of strong types in favor of dynamic types is excruciatingly painful especially for larger projects, where trying to debug mistyped items becomes an actual manhunt to find the bug.\nAnd then we have all the weird legacy conundrums that should've been weeded out since the beginning, like the not-so-great Date object, and the Array.sort() method that for some reason sorts by string and not numerics.")// post("Java is buns.","\"AbstractFactoryPrivateHelperAlternativeMethodsChildHelper.java\" might be the next name of your class. Oh my god bruh the imports at the top of the file could be an entire novel especially on old crappy legacy java projects.")
// post("Test post number 2","This is to test stuff with extremelylongwordsthatdonothaveanyspacestoseperatethem because ineedtoseeifitproperlyworksornotandthisoneisslightlylongerthantheotherones\nbruhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")

// post("Space Test","space                space  space                                                                                                 ")
post("Space Test","twoconsecutivesuperlongwordsssssssssssssssssssssssssssssssssssssssssssss rightnexttoeachotherrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr lorem lorem lorem lorem lorem lorem\nlorem lorem lorem")


// post("test post 1","testing")
// post("test","testing")

// post("Test Post","This is an initial post for testing purposes\nDoes it handle breakpoints?")
post("Lorem","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")