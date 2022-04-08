
export const getCurrentDate = () =>{
    let currentDate = new Date()
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    return (day + "/" + month + "/" + year)
}

