const validator = (key, value, password) => {
    // Măc định
    if (value.trim() === '' ) return 'Trường này bắt buộc phải nhập'
    
    if( key === 'email' ){
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!regex.test(value))  return 'Đây không phải là email'
    }

    if( key === 'password' ){
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/
        if(!regex.test(value))  return 'Minium 6 characters, with upper, lowercase, and number or symbol'
    }

    if( key === 'confirmpassword' ){
        if (value !== password) return 'Khoong giống mật khẩu'
    }
    
    return undefined
}

export default validator