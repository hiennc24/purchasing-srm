const fakeData = (new Array(100)).fill(null).map((v, index) =>{
    return {
        nameTodoList: `Checklist ${index}`
    }
})

export default fakeData;