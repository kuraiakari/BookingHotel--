const validator = (key, value, comparisons) => {
    // Măc định
    
    if (value.toString().trim() === '' ) return 'Trường này bắt buộc phải nhập'
    
    if( key === 'email' ){
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!regex.test(value))  return 'Đây không phải là email'
    }

    if( key === 'password' ){
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/
        if(!regex.test(value))  return 'Minium 6 characters, with upper, lowercase, and number or symbol'
    }

    if( key === 'confirmpassword' ){
        if (value !== comparisons) return 'Khoong giống mật khẩu'
    }
    
    if( key === 'checkIn' ){
        const currentTime = new Date()
        if (value <= currentTime) return 'Thời gian checkIn không đúng'
    }

    if( key === 'checkOut' ){
        if (value <= comparisons) return 'Thời gian checkOut không đúng'
    }

    return undefined
}

export default validator