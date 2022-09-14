function rulesObligatory(value) {
    if (!value) return false 
    else return true
}
function rulesEmail(value) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value)
}
function rulesMin(value) {
    if (value.length < 6) return false
    else return true
}
function rulesConfirmPassword(value, password) {
    if (value.length !== password) return false
    else return true
}
export { rulesObligatory, rulesEmail, rulesMin, rulesConfirmPassword}