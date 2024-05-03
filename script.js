const tasks = [
  {
    titulo: "Comprar comida para o gato",
    tipo: "Urgente",
  },
  {
    titulo: "Consertar Computador",
    tipo: "Prioritário",
  },
  {
    titulo: "Beber água",
    tipo: "Normal",
  },
];

function createCard(taskInfo) {
  // Criando elementos necessários
  const listItem = document.createElement("li");
  const taskContainer  = document.createElement("div");
  const priorityIndicator  = document.createElement("span");
  const taskTitle = document.createElement("p");

  // Adicionando o titulo da tarefa como texto do paragrafo
  taskTitle.innerText = taskInfo.titulo;

  //chamando a Função que verifica e atribui as determinadas classes ao tipo de prioridade
  priorityIndicator.classList.add(getipuntPriorityClass(taskInfo.tipo))

  // Adicionando span e paragrafo a div
  taskContainer.appendChild(priorityIndicator );
  taskContainer.appendChild(taskTitle);

  // Criando botão para deletar tarefa
  const deleteButton = document.createElement("button");

  // Adicionando icone ao botão
  deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  /// Adicionando a div e o botão de deletar ao list item
  listItem.appendChild(taskContainer);
  listItem.appendChild(deleteButton);

  // deletando quando clica no botão de lixeira
  deleteButton.addEventListener("click", function (e) {
    deleteTask(taskInfo);
  });
  return listItem;
}
// Remove a tarefa do array de tarefas e atualiza a exibição
function deleteTask(taskInfo) {

  // Encontra o índice da tarefa no array
  const taskIndex = tasks.indexOf(taskInfo); 

  // Verifica se a tarefa foi encontrada
  if (taskIndex >= 0) {
    tasks.splice(taskIndex, 1) // Remove a tarefa do array
    renderElements(tasks) // Atualiza a exibição das tarefas no DOM    
  }  
}

function renderElements(taskList) {

  const htmlList = document.querySelector(".tasks");

  htmlList.innerHTML = "";

  for (let i = 0; i < taskList.length; i++) {
    const card = createCard(taskList[i]);
    htmlList.appendChild(card);
  }
}
renderElements(tasks);

//Função que verifica e atribui as classes as determinadas prioridades
function getipuntPriorityClass(priority) {

  if (priority === "Urgente") {
    return "span-urgent";

  } else if (priority === "Prioritário") {
    return "span-priority";

  } else {
    return "span-normal";
  }
}
//Função que Captura os dados dos Intpus de prioridade e de titulo da tarefa
function getinputValues(tasks) {

  let newTasks = {
    titulo: "",
    tipo: "",
  };

  const getIpuntTitle = document.querySelector("#input_title").value;

  const getipuntPriority = document.querySelector("#input_priority").value;

  newTasks.titulo = getIpuntTitle;
  newTasks.tipo = getipuntPriority;
  tasks.push(newTasks);
}

function clearInputFields() { // Função que limpa o valor do input de titulo da tarefa
  document.querySelector("#input_title").value = "";
}

let eventBtn = document.querySelector("#btnSubmit");

eventBtn.addEventListener("click", function () {
  getinputValues(tasks);
  renderElements(tasks);
  clearInputFields();
});
