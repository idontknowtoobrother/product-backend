const eventPromise = (number) => {
    return new Promise((success, fail) => {
        if (number % 2 === 0) {
            success(`${number} is an even number`)
            return
        }
        fail(`${number} is an odd number`)
    })
}



async function run() {

    try {
        const firstProms = eventPromise(5)
        const firstVal = await firstProms
        console.log(firstVal)
    } catch (err) {
        console.log(err)
    }

    try {
        const secondProms = eventPromise(2)
        const secondeVal = await secondProms
        console.log(secondeVal)
    } catch (err) {
        console.log(err)
    }
    

}


run()