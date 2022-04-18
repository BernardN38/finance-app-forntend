export default function capitalize(str){
    const result = []
    let previousLetter = ''
    for (let letter of str){
        if (letter != '_'){
            if (previousLetter === ''){
                result.push(letter.toUpperCase())
                previousLetter = letter
            } else {
                result.push(letter)
            }
        } else {
            result.push(' ')
            previousLetter = ''
        }
    }
    return result.join('')
}
