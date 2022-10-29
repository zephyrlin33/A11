// generate_password.js
function sample(array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
  }

// define generatePassword function
function generateShorten() {
    console.log('This function will generate password')

    // define things user might want
        const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
        const upperCaseLetters = lowerCaseLetters.toUpperCase()
        const numbers = '1234567890'
       
    // dummy data of req.body
    let collection = lowerCaseLetters + upperCaseLetters + numbers
    
    // start generating password
    let password = ''
    for (let i = 0; i < Number(5); i++) {
        password += sample(collection)
    }
    console.log(password)
    //store into database
    
    return password
}
  
  // invoke generatePassword function 
  //export
  module.exports = generateShorten
  