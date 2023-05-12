fetch('http://localhost:3000/monsters')
.then(resp => resp.json())
.then((monsters) => {
    let i = 0
    let end = 51
    for (i; i < end; i++) {
        renderMonster(monsters[i])
    }
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const newMonster = {
          name:  e.target.name.value,
          age:  e.target.age.value,
          description:  e.target.description.value
        }
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newMonster)
        }
        fetch('http://localhost:3000/monsters', request)
        .then(response => response.json())
        .then(monster => renderMonster(monster))
        .catch(error => console.error(error));
    })
    const forwardButton = document.querySelectorAll('button')[2];
    const backwardButton = document.querySelectorAll('button')[1];
    backwardButton.addEventListener('click', () => {
        end -= 50
        document.querySelector('#monster-container').textContent = ''
        for (i; i > end; i--) {
            renderMonster(monsters[i])
        }
        
    })
    forwardButton.addEventListener('click', () => {
        end += 50
        document.querySelector('#monster-container').textContent = ''
        for (i; i < end; i++) {
            renderMonster(monsters[i])
        }
        
    })

})
function renderMonster(monster) {
  const div = document.createElement('div')
  const name = document.createElement('h2')
  name.textContent = monster.name
  const age = document.createElement('h2')
  age.textContent = monster.age
  const description = document.createElement('p')
  description.textContent = monster.description
  div.append(name, age, description)
  document.querySelector('#monster-container').append(div)
}