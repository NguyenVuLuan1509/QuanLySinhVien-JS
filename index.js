var readlineSync = require('readline-sync'); //Khai báo readline-sync
var fs = require('fs-js'); // Khai báo fs-js
var shortid = require('shortid');
// Wait for user's response.

var showMenu = function () {
    console.log("               Student Managerment                  ");
    console.log("====================================================");
    console.log(" 1. Show all student ");
    console.log(" 2.Create student and return Menu");
    console.log(" 3.Delete student");
    console.log(" 4.Edit student");
    console.log(" 5.Find student by name");
    console.log(" 6.Sort student by name ascending");
    console.log(" 7.Sort student by age ascending");
    console.log(" 8.Delete all student");
    console.log(" 9. Sum student age");
    console.log(" 10.Exit");
  };

    showMenu();
    var choise = readlineSync.question('Ban muon chon chuc nang gi? ');
    let studentFile= fs.readFileSync("./data.txt", "utf-8");
    let student= JSON.parse(studentFile);

    var sexGlobal= ["male", "female"];
    const createStudent= ()=>{
        let name= readlineSync.question("Hay nhap ten: ");
        let age= readlineSync.question("Hay nhap tuoi: ");
        let sex= readlineSync.keyInSelect(sexGlobal, "Gioi tinh: male/female (1/2)");

        // student.pop();
        student.push({
            id: shortid.generate(),
            name: name,
            age: parseInt(age),
            sex: sexGlobal[sex],
        }
        );
        saveFile();
    }

    const saveFile= () => {
        fs.writeFileSync("./data.txt",JSON.stringify(student>0 ? student : []),"utf-8");
    }

    const deleteStudent= ()=> {
        //delete name
        let nameDel= readlineSync.question("Ban muon xoa sinh vien ten gi: ");
        let indexDel= student.findIndex((item)=>{
            return item.name === nameDel;
        });
        if(indexDel >= 0){
            student.splice(indexDel,1);
            saveFile();
        } 
    }

    const editStudent= () =>{
        let nameEdit= readlineSync.question("Ban muon sua sinh vien ten gi: ");
        let indexEdit= student.findIndex((item)=>{
            return item.name === nameEdit;
        });
        if(indexEdit >= 0){
            let oldName= student[indexEdit].name;
            let oldid= student[indexEdit].id;
            let newAge= readlineSync.question("Hay nhap tuoi: ");
            let sex= readlineSync.keyInSelect(sexGlobal, "Gioi tinh: male/female (1/2)");

            let newStudent= {
                id: oldid,
                name: oldName,
                age: parseInt(newAge),
                sex: sexGlobal[sex],
            };
            student.splice(indexEdit, 1, newStudent);
            saveFile();
        }  
    }

    const filterStudent = () => {
      let filterName= readlineSync.question("Ban muon tim sinh vien ten gi? ").toLowerCase();
      let listFilter= student.filter((item)=>{
        return item.name.toLowerCase() === filterName;
      });

      console.log(listFilter);
    }
    
    const sortByName = () => {
    //   student.sort((a,b)=>{                 //Sắp xếp không dấu
    //       if(a.name < b.name) return -1;
    //       if(a.name > b.name) return 1;
    //       return 0;
    //   });
    //   console.log(student);

      student.sort((a,b)=>{                     //Sắp xếp có dấu
          return a.name.localeCompare(b.name);
      });
      console.log(student);
    }
    
    const sortByAge = () => {
      student.sort((a,b)=>{
         return a.age - b.age;
      });
      console.log(student);
    }
    
    const deleteAllStudent = () => {
      student= [];
      saveFile();
    }
    
    const sumStudentAge = () => {
      let sum= student.reduce((a,b)=>{
          return (a += b.age);
      },0);
      console.log('Tong so tuoi cua hoc sinh la: ',sum);
    }
    

    while(true){
        switch (parseInt(choise)) {
            case 0:
            showMenu();
            choise = readlineSync.question('Ban muon chon chuc nang gi? ');
                break;
            case 1:
                console.log(student);
                choise= 0;
                break;
            case 2:
                createStudent();
                choise= 0;
                break;
            case 3:
                deleteStudent();
                choise= 0;
                break;
            case 4:
                editStudent();
                choise=0;
                break;
            case 5:
                filterStudent();
                choise= 0;
                break;
            case 6:
                sortByName();
                choise=0;
                break;
            case 7:
                sortByAge();
                choise= 0;
                break;
            case 8:
                deleteAllStudent();
                choise=0;
                break;
            case 9:
                sumStudentAge();
                choise=0;
                break;
            case 10:
                process.exit();
                break;
        
            default:
                console.log("Bạn phải chọn số trong menu!");
                choise= 0;
                break;
        }
    }
