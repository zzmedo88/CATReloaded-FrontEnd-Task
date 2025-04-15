const tasks=[];
            
function display(){
    let html='';
    document.querySelector('.show').innerHTML = '';
    for (let i = 0;i<tasks.length;i++){
        html = `<p>${tasks[i].t} ${tasks[i].d} <button onclick="
            tasks.splice(${i},1);
            display();
            ">clear</button></p>`
        document.querySelector('.show').innerHTML += html;
    }
}
function submit_task() {
    let task=document.querySelector('.task')
    let t=document.querySelector('.task').value;
    let date=document.querySelector('.date')
    let d=document.querySelector('.date').value;
    tasks.push({t,d});
    task.value = '';
    date.value = '';
    display();
}