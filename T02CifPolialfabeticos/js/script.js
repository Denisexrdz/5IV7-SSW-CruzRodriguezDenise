function validateShiftAndKey(shift, key) {
    let errors = [];

    if (shift !== undefined) {
        if ((typeof shift !== "number" && !/^\d+$/.test(shift)) || (typeof shift === "number" && (shift < 1 || shift > 25))) {
            errors.push("El desplazamiento debe ser un número entre 1 y 25 o una letra.");
        }
    }

    if (key !== undefined) {
        if (!/^[a-zA-Z]+$/.test(key)) {
            errors.push("La clave Vigenère debe contener solo letras.");
        }
    }

    return errors;
}

document.addEventListener("DOMContentLoaded", function() {
    const textInput = document.getElementById("text");
    const methodSelect = document.getElementById("method");
    const shiftDiv = document.getElementById("shift-div");
    const shiftInput = document.getElementById("shift");
    const keyDiv = document.getElementById("key-div");
    const keyInput = document.getElementById("key");
    const resultTextArea = document.getElementById("result");
    const encryptButton = document.getElementById("encrypt");
    const decryptButton = document.getElementById("decrypt");
    const copyButton = document.getElementById("copy");
    const decryptTextButton = document.getElementById("decrypt-text");

    methodSelect.addEventListener("change", function() {
        if (methodSelect.value === "cesar") {
            shiftDiv.style.display = "block";
            keyDiv.style.display = "none";
        } else if (methodSelect.value === "vigenere") {
            shiftDiv.style.display = "none";
            keyDiv.style.display = "block";
        }
    });

    encryptButton.addEventListener("click", function() {
        const text = textInput.value;
        const method = methodSelect.value;
        const key = keyInput.value;
        let shift = shiftInput.value;

        if (method === "cesar") {
            if (!isNaN(shift)) {
                shift = parseInt(shift, 10);
            } else {
                shift = shift.toUpperCase().charCodeAt(0) - 65 + 1;
            }

            resultTextArea.value = cesarCipher(text, shift);
        } else if (method === "vigenere") {
            resultTextArea.value = vigenereCipher(text, key);
        }
    });

    decryptButton.addEventListener("click", function() {
        const text = textInput.value;
        const method = methodSelect.value;
        const key = keyInput.value;
        let shift = shiftInput.value;

        if (method === "cesar") {
            if (!isNaN(shift)) {
                shift = parseInt(shift, 10);
            } else {
                shift = shift.toUpperCase().charCodeAt(0) - 65 + 1;
            }

            resultTextArea.value = cesarCipher(text, -shift);
        } else if (method === "vigenere") {
            resultTextArea.value = vigenereCipher(text, key);
        }
    });

    copyButton.addEventListener("click", function() {
        resultTextArea.select();
        document.execCommand("copy");
        alert("Texto cifrado copiado al portapapeles");
    });

    decryptTextButton.addEventListener("click", function() {
        const encryptedText = resultTextArea.value;
        const method = methodSelect.value;
        const key = keyInput.value;
        let shift = shiftInput.value;

        if (method === "cesar") {
            if (!isNaN(shift)) {
                shift = parseInt(shift, 10);
            } else {
                shift = shift.toUpperCase().charCodeAt(0) - 65 + 1;
            }

            resultTextArea.value = cesarCipher(encryptedText, -shift);
        } else if (method === "vigenere") {
            resultTextArea.value = vigenereCipher(encryptedText, key);
        }
    });

    function cesarCipher(text, shift) {
        return text.split('').map(char => {
            if (/[a-zA-Z]/.test(char) || /\d/.test(char)) {
                const isUpperCase = /[A-Z]/.test(char);
                let charCode;

                if (/[a-z]/.test(char)) {
                    charCode = char.charCodeAt(0) - 97;
                } else if (/[A-Z]/.test(char)) {
                    charCode = char.charCodeAt(0) - 65;
                } else if (/\d/.test(char)) {
                    charCode = char.charCodeAt(0) - 48 + 26;
                }

                const shiftedCharCode = (charCode + shift) % 36;
                let shiftedChar;

                if (/[a-z]/.test(char)) {
                    shiftedChar = String.fromCharCode(97 + shiftedCharCode);
                } else if (/[A-Z]/.test(char)) {
                    shiftedChar = String.fromCharCode(65 + shiftedCharCode);
                } else if (/\d/.test(char)) {
                    shiftedChar = String.fromCharCode(48 + shiftedCharCode - 26);
                }

                return isUpperCase ? shiftedChar : shiftedChar.toLowerCase();
            }
            return char;
        }).join('');
    }

    function vigenereCipher(text, key) {
        const keyRepeated = key.repeat(Math.ceil(text.length / key.length)).slice(0, text.length);
        return text.split('').map((char, index) => {
            if (/[a-zA-Z]/.test(char) || /\d/.test(char)) {
                const isUpperCase = /[A-Z]/.test(char);
                let charCode;

                if (/[a-z]/.test(char)) {
                    charCode = char.charCodeAt(0) - 97;
                } else if (/[A-Z]/.test(char)) {
                    charCode = char.charCodeAt(0) - 65;
                } else if (/\d/.test(char)) {
                    charCode = char.charCodeAt(0) - 48 + 26;
                }

                const keyCharCode = keyRepeated[index].toUpperCase().charCodeAt(0) - 65;
                const shiftedCharCode = (charCode + keyCharCode) % 36;
                let shiftedChar;

                if (/[a-z]/.test(char)) {
                    shiftedChar = String.fromCharCode(97 + shiftedCharCode);
                } else if (/[A-Z]/.test(char)) {
                    shiftedChar = String.fromCharCode(65 + shiftedCharCode);
                } else if (/\d/.test(char)) {
                    shiftedChar = String.fromCharCode(48 + shiftedCharCode - 26);
                }

                return isUpperCase ? shiftedChar : shiftedChar.toLowerCase();
            }
            return char;
        }).join('');
    }
});
