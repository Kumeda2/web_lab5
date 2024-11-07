const swapBtn = document.getElementById('swaper')
const formBtn = document.getElementById('form-opener')
const formContainer = document.querySelector('.form-container')
const colorPicker = document.getElementById('colorPicker')
const block1 = document.querySelector('.menu')
const block2 = document.querySelector('.header')
const block3 = document.querySelector('.title-section')
const block4 = document.querySelector('.content-section')
const block5 = document.querySelector('.sider')
const block6 = document.querySelector('.footer')
const blocks = [block1, block2, block3, block4, block5, block6]
const yArea = document.querySelector('.footer input')
const cookieNumbers = 'numbers'
let images = []

function swapContent() {
    const header = document.querySelector('.container p')
    const footer = document.querySelector('.contact-info')

    const headerContent = header.innerHTML
    const footerContent = footer.innerHTML 

    header.innerHTML = footerContent
    footer.innerHTML = headerContent    
}

swapBtn.addEventListener('click', () => swapContent())


function squareCounter() {
    const a = 10
    const h = 12
    const s = a*h

    const square = document.getElementById('square')
    square.textContent += s
}

squareCounter()

formBtn.addEventListener('click', () => {
    if (formContainer.querySelector('form')) {
        window.alert("Форма вже існує");
        return;
    }

    const newForm = document.createElement('form')

    const newInput = document.createElement('input')
    newInput.setAttribute('placeholder', 'Введіть 10 чисел');
    newInput.addEventListener('change', () => {
        let content = newInput.value.split(' ').filter(num => num !== '').map(Number);
    
        if (content.length > 10) {
            window.alert('Введено забагато чисел');
            return;
        } else if (content.length < 10) {
            window.alert('Введено замало чисел');
            return; 
        }
    
        content.sort((a, b) => a - b);
    
        const contentString = content.join(' ');
        document.cookie = `numbers=${encodeURIComponent(contentString)}; path=/; max-age=3600`;
    
        window.alert(content)  
    })

    formContainer.appendChild(newForm)

    newForm.appendChild(newInput)
})

function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';')[0];
}

function deleteCookie(name) {
    document.cookie = `${name}=; path=/; max-age=0`;
}

window.onload =() => {
    colorValueSetter()
    onClickSetter()
    const numbersCookie = getCookie(cookieNumbers);
    if (numbersCookie) {
        if (confirm(`${numbersCookie}\nВи хочете видалити cookie?`)) {
            deleteCookie(cookieNumbers)
            alert("Cookie видалено.");
        } 
    }
}

colorPicker.addEventListener('input', () => {
    localStorage.setItem('color', colorPicker.value)
})

function colorValueSetter() {
    let color = localStorage.getItem('color');
    if (color) colorPicker.value = color;
}

function onClickSetter() {
    blocks.forEach(element => {
        element.addEventListener('click', () => {
            blocks.forEach(block => {
                if (block !== element) block.style.border = 'none'
            })
            element.style.border = `1px solid ${colorPicker.value}`
        })
    })
}

yArea.addEventListener('select', () => {
    const audio = document.createElement('audio');
    audio.setAttribute('controls', '');
    audio.setAttribute('autoplay', '');

    const audioLine = document.createElement('source');
    audioLine.src = 'assets/Maroon5_Memories.mp3';
    audioLine.type = 'audio/mpeg';

    audio.appendChild(audioLine);

    block4.appendChild(audio);

    let url = ''

    if (block4.querySelector('#picture')) {
        window.alert("Форма вже існує");
        return;
    }

    const formDiv = document.createElement('div')
    formDiv.setAttribute('id', 'picture')
    formDiv.className = 'container'

    const newForm = document.createElement('form')
    newForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isValid = await isValidImageUrl(url);
        if (!isValid) {
            alert("Неправильний URL");
            return;
        }

        imgDiv = document.createElement('div')
        img = document.createElement('img')
        img.src = url

        images.push(url)    

        imgDiv.appendChild(img)

        block1.appendChild(imgDiv)

        if (block1.scrollHeight > block1.clientHeight) {
            block1.style.justifyContent = 'flex-start';
        } else {
            block1.style.justifyContent = 'center';
        }
    })

    const picInput = document.createElement('input')
    picInput.setAttribute('type', 'text')
    picInput.setAttribute('placeholder', 'url картинки')
    picInput.addEventListener('change', () => url = picInput.value)

    const btn = document.createElement('button')
    btn.innerHTML = 'Зберегти';
    btn.style.width = '30%'
    btn.addEventListener('click', () => {
        localStorage.setItem('images', JSON.stringify(images))

        const divElements = block1.querySelectorAll('div');
        divElements.forEach(div => {
            block1.removeChild(div);
        });

        block1.style.justifyContent = 'center';
    })

    newForm.appendChild(picInput)

    formDiv.appendChild(newForm)
    formDiv.appendChild(btn)

    block4.appendChild(formDiv)
})

function isValidImageUrl(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = url;

        img.onload = () => resolve(true);   
        img.onerror = () => resolve(false);  
    });
}