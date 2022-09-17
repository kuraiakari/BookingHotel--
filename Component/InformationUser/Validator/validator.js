const validator = (key, value) => {
    // Măc định
    if (value.trim() === '' ) return 'Trường này bắt buộc phải nhập'
    
    if( key === 'email' ){
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!regex.test(value))  return 'Đây không phải là email'
    }

    if( key === 'password' ){
        if (value.length > 16 ) return 'Mật khẩu ít hơn 16 kí tự'
        if (value.length < 6 ) return 'Mật khẩu dài hơn 6 kí tự'
    }

    return undefined
}

export default validator