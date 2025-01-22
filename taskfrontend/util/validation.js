export const validatePassword = (password) => {
    if (password.length < 8) {
        return 'Password must be at least 8 characters long.';
    }
    return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
    // console.log(confirmPassword)
    // console.log(password)
    if (password !== confirmPassword) {
        return 'Password and Confirm Password do not match.';
    }
    return null;
};
