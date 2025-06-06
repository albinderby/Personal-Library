
const MyLibrary=[];

class Book{
    constructor (name,author,year,pages,status,id){
    this.name=name;
    this.author=author;
    this.year=year;
    this.pages=pages;
    this.status=status;
    this.id=id;
    }
}

function createBook(name,author,year,pages,status){
    let id=crypto.randomUUID();
    MyLibrary.push(new Book(name,author,year,pages,status,id));

}
Book.prototype.toggleStatus=function(){
    if(this.status=="Reading")this.status="Not reading";
    else this.status="Reading";
}


createBook("boodk1","author1",1984,29,"Not Read")
createBook("boodk1","author1",1980,34,"Not Read")
createBook("boodk1","author1",1980,90,"Not Read")
createBook("boodk1","author1",1984,911,"Not Read")

//this loop is for display first time allthe book in the library.
for(let i=0;i<MyLibrary.length;i++){
    display(MyLibrary[i]);
}


function display(book){
   let table= document.querySelector(".library>table")
    // let lastRow=table.lastChild;
    let tr=document.createElement("tr");
    for(data in book){
        if(data==="id"){
            //below line set id for the row 
            tr.setAttribute("data-id",book[data])
            continue;}

       
        let td=document.createElement("td");
        if(data === "status"){
            let statusButton=document.createElement("button");
            statusButton.textContent=book[data];
            td.appendChild(statusButton);
            tr.appendChild(td);
            statusButton.addEventListener("click",status);
            continue;
        }
        td.textContent=book[data];
        tr.appendChild(td);
    }
    //this below code is for add delete button
    function deleteButton(){
    let deleteButton=document.createElement("button");
    deleteButton.textContent="Delete";
    deleteButton.addEventListener("click",Delete);
    let buttonColumn=document.createElement("td");
    buttonColumn.appendChild(deleteButton);
    tr.appendChild(buttonColumn);
    }
    deleteButton();
    table.appendChild(tr);

} 
function status(e){
    let td=e.target.parentElement;
    let row=td.parentElement;
    let bookIndex=MyLibrary.findIndex(book =>  book.id===row.dataset.id);
    MyLibrary[bookIndex].toggleStatus();
    if(e.target.textContent==="Not reading"){
        e.target.textContent="Reading";
    }else{
        e.target.textContent="Not reading"
    }

}

function Delete(e){
    let td=e.target.parentElement;
    let row=td.parentElement;
    row.remove();
    // row.remove will remove the row from web page but that doesn't remove from array 
    //below line is for remove object from array.
    
        MyLibrary.splice(MyLibrary.findIndex(book =>  book.id===row.dataset.id) ,1);
        

};


document.querySelector("#AddBookForm").addEventListener("submit",addBook);


function addBook(event){
    event.preventDefault();
const form= new FormData(document.querySelector("#AddBookForm"));
createBook(form.get("name"),form.get("author"),form.get("year"),form.get("pages"),form.get("status"));
display(MyLibrary[MyLibrary.length-1]);
}