const people=[
    {name: 'gohome'},
    {name: 'opensw'},
    {name: 'David'},
    {name: 'Mr.Bob'},
    {name: 'Bob Jr.'}
];


const list= document.getElementById('list');

function setList(group){
    clearList();
    for(const person of group){
        const item= document.createElement('li');
        item.classList.add('list-group-item');
        const text = document.createTextNode(person.name);
        item.appendChild(text);
        list.appendChild(item);
    }
    if(group.length === 0){
        setNoResult();
    }
}

function clearList(){
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild);
    }
}

function setNoResult(){
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    const text = document.createTextNode('No reults found');
    item.appendChild(text);
    list.appendChild(item);
}

function computeRelevancy(name, searchTerm){
    let value = name.trim().toLowerCase();
    if(value === searchTerm){
        return 2;
    }else if(value.startsWith(searchTerm)){
        return 1;
    }else if(value.includes(searchTerm)){
        return 0;
    }else{
        return -1;
    }
}

const searchInput = document.getElementById('search')
searchInput.addEventListener('input', (event)=>{
    let value = event.target.value;
    if(value && value.trim().length > 0){
        value = value.trim().toLowerCase();
        setList(people.filter(person => {
            return person.name.toLowerCase().includes(value);
        }).sort((person1, person2) => {
            return computeRelevancy(person2.name, value) -computeRelevancy(person1.name, value);
        }));
    }else{
        clearList();
    }
})