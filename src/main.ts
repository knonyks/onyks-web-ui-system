const modules = import.meta.glob('./components/*.ts');

for (const path in modules) 
{
    modules[path]().then((mod) => 
    {
        console.log(`Załadowano moduł: ${path}`);
    });
}

let examples = Object.keys(import.meta.glob('./examples/*.html'));
let nav = document.querySelector('.nav')
let content = document.querySelector('.content')

nav.addEventListener('click', async (e) => 
{
    
    if(e.target.classList.contains('nav-element'))
    {
        
        let temp = e.target.dataset.target
        temp = temp.replace('./', '')
        temp = "src/" + temp

        const response = await fetch(temp);
        const html = await response.text();

        content.innerHTML = html;
    }
});

for(let el of examples)
{
    let temp = document.createElement('div')
    temp.classList.add('nav-element')
    temp.dataset.target = el
    temp.innerText = el.replace('./examples/', "").replace('.html', "").toUpperCase()
    nav.appendChild(temp)
}

let logo = document.querySelector('.logo')
logo.addEventListener('click', (e) =>
{
    nav?.classList.toggle('closed')
})