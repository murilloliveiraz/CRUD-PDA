const $form = document.querySelector('.form');

const miniTwitter = {
    posts: [
    ],
    createPost(dados){
        const id = miniTwitter.posts.length + 1;
        miniTwitter.posts.push({
            id: miniTwitter.posts.length + 1,
            content: dados.content
        })
        const $listaDeTarefas = document.querySelector('.listaDeTarefas');
        $listaDeTarefas.insertAdjacentHTML('afterbegin', `<li data-id="${id}">
        <span contenteditable>${dados.content}</span>
        <button class="btn-delete"> <ion-icon name="trash-outline" class="icon"></ion-icon></button>
        </li>`)
        console.log(miniTwitter.posts)
    },
    readPosts(){
        miniTwitter.posts.forEach(({content}) => {
            miniTwitter.createPost({content : content})
        })
    },
    deletePost(id) {
        const postList = miniTwitter.posts.filter((post) => {
            return post.id !== Number(id);
        })
        miniTwitter.posts = postList;
    },
    updateContent(id, editedContent) {
        const postThatWillBeUpdated = miniTwitter.posts.find((post) => {
            return post.id === Number(id);
        });
        postThatWillBeUpdated.content = editedContent;
    }
};

miniTwitter.readPosts();

//CREATE
$form.addEventListener('submit', function criaTarefa(e) {
    e.preventDefault();
    const $criaTarefa = document.querySelector('input[name="criaTarefa"]');
    miniTwitter.createPost({content: `${$criaTarefa.value}`})
    $criaTarefa.value = '';
})

//DELETE
document.querySelector('.listaDeTarefas').addEventListener('click', function (e) {
    const elementoAtual = e.target;
    const botaoDeletar = e.target.classList.contains('btn-delete');
    if(botaoDeletar){
        const id = elementoAtual.parentNode.getAttribute('data-id');
        miniTwitter.deletePost(id);
        elementoAtual.parentNode.remove();
    }
})

//UPDATE
document.querySelector('.listaDeTarefas').addEventListener('input', function (e){
    const elementoAtual = e.target;
    const id = elementoAtual.parentNode.getAttribute('data-id');
    miniTwitter.updateContent(id, elementoAtual.innerText)
})