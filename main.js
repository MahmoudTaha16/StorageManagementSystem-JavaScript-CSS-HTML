// const { DataAccessLayer } = require("./DataAccessLayer");
// const { BusinessLayer } = require("./Business
// Layer");
// import BusinessLayer from './BusinessLayer.js';






let FunctionsClass={

    //return a random number
    //  getRandomFloat:function (min, max) {
    //     return Math.random() * (max - min) + min;
    //   }

    //Random Numbers
     getRandomFloat:function (max, min) {
        return Math.random() * (max - min) + min;
      },
     getRandomInt:function (max, min) {
        return this.getRandomFloat(max,min);
      },


    //Random Words

     getRandomLoremIpsum:function(wordCount) {
        const loremWords = [
          "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", 
          "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", 
          "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam",
          "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut",
          "aliquip", "ex", "ea", "commodo", "consequat"
        ];
      
        let result = [];
        for (let i = 0; i < wordCount; i++) {
          const randomIndex = Math.floor(Math.random() * loremWords.length);
          result.push(loremWords[randomIndex]);
        }
      
        return result.join(" ");
      },

      getRandomWord:function(){
       return this.getRandomLoremIpsum(1);
      },
    //Random Names

      getRandomNames:function(wordCount) {
        const loremWords = [
         "iPhone 15",
            "Samsung Galaxy S23",
            "MacBook Pro",
            "Dell XPS 13",
            "Sony WH-1000XM5 Headphones",
            "Google Nest Hub",
            "PlayStation 5",
            "Xbox Series X",
            "Fitbit Charge 5",
            "DJI Mini 3 Drone",
            "Dyson V15 Vacuum Cleaner",
            "Instant Pot Duo Plus",
            "Philips Hue Smart Lights",
            "Shark Air Purifier",
            "Ninja Foodi Blender",
            "Keurig K-Elite Coffee Maker",
            "Roomba i7+ Robot Vacuum",
            "Levoit Humidifier",
            "Vitamix 5200 Blender",
            "KitchenAid Stand Mixer",
            "Levi's 501 Jeans",
            "Nike Air Force 1 Sneakers",
            "Ray-Ban Wayfarer Sunglasses",
            "Adidas Ultraboost Running Shoes",
            "Gucci Marmont Bag",
            "North Face Puffer Jacket",
            "Casio G-Shock Watch",
            "Converse Chuck Taylor All-Stars"
        ];
      
        let result = [];
        for (let i = 0; i < wordCount; i++) {
          const randomIndex = Math.floor(Math.random() * loremWords.length);
          result.push(loremWords[randomIndex]);
        }
      
        return result.join(" ");
      },

      getRandomName:function(){
       return this.getRandomNames(1);
      }




}




























let Title=document.getElementById("Title");
let Price=document.getElementById("Price");
let Taxes=document.getElementById("Taxes");
let Ads=document.getElementById("Ads");
let Discount=document.getElementById("Discount");
let Total=document.getElementById("Total");
let Count=document.getElementById("Count");
let Category=document.getElementById("Category");
let Create=document.getElementById("Create");
let Search=document.getElementById("Search");
let SearchByTitleButton=document.getElementById("SearchByTitle");
let SearchByCategoryButton=document.getElementById("SearchByCategory");
let Table=document.getElementById("table");
let Tbody=document.getElementById("tbody");



//ProductObject
class ProductObject {
    constructor(id, title, price, taxes, ads, discount,total, count, category){
       this.Id = id;
       this.Title = title;
       this.Price = price;
       this.Taxes = taxes;
       this.Ads = ads;
       this.Discount = discount;
       this.Count = count;
       this.Total = total;
       this.Category = category;
    }
   Id = 0;
   Title = "Oppo";
   Price = 1000;
   Taxes = 100;
   Ads = 100;
   Discount = 100;
   Count = 100;
   Total = 10077;
   Category = "Phone";
}


//Data Access Layer

class DataAccessLayer {
   
    data = [];
    tempdata = [];
    //update data in the local storage 
     UpdateDataInLocalStorage() {
        for(let i=0; i<this.data.length;i++){
            this.data[i].Id=i;
        }


        localStorage.data =JSON.stringify( this.data);
    };
     GetDataFromStorage() {
        if (localStorage.data != null) {
            this.data =JSON.parse(localStorage.data) ;
        } else {
            this.data = [];
        }
        return this.data;
    };
    //CheckIfRecordAtIdExist
     RecordAtIdIsExist(Id) {
        if (this.ReadRecordAtId(Id) == null) {
            return false;
        } else {
            return true;
        }
    };

     Create(id, title, price, taxes, ads, discount, total, count, category) {
       
        let product = new ProductObject(id, title, price, taxes, ads, discount,total, count, category);
        this.GetDataFromStorage();
        this.data.push(product);
       this.UpdateDataInLocalStorage();

    };

    //Read Data
     ReadRecordAtId(Id) {
        this.GetDataFromStorage();
        if (this.data.length < Id) {
            return null;
        }
        return this.data.at(Id);
    };

     ReadRecordsContaintsTitleSegment(segment) {
       let tempdata=[];
       this.GetDataFromStorage();
        for (let  i = 0; i < this.data.length; i++) {
            

            if (this.data[i].Title.includes(segment)) {
                tempdata.push(this.data[i]);

            }
        }

        return tempdata;
    };

     ReadRecordsContaintsCategorySegment(segment) {
        let tempdata=[];
        this.GetDataFromStorage();
         for (let  i = 0; i < this.data.length; i++) {
             
 
             if (this.data[i].Category.includes(segment)) {
                 tempdata.push(this.data[i]);
 
             }
         }
 
         return tempdata;
    };

    //UpdateData
   

     UpdateRecordAtId(id, title, price, taxes, ads, discount, total, count, category) {
     
      
        let record=this.ReadRecordAtId(id);
        record.Title = title;
        record.Price = price;
        record.Taxes = taxes;
        record.Ads = ads;
        record.Discount = discount;
        record.Total = total;
        record.Count = count;
        record.Category = category;
        this.data[id] = record;
        this.UpdateDataInLocalStorage();
    };


    //delete Record
     DeleteRecordAtId(Id) {
        if (this.RecordAtIdIsExist(Id) == true) {
           let record= this.ReadRecordAtId(Id);
            this.data.splice(Id, 1);
           this.UpdateDataInLocalStorage();
        } else {
        }
    }
}

const dataAccessLayer =new DataAccessLayer();
class BusinessLayer {
     
     constructor(){};
     GetDataFromStorage() {
        return  dataAccessLayer.GetDataFromStorage();
    };
     Create(id, title, price, taxes, ads, discount, total, count, category) {
        
       
        id = dataAccessLayer.GetDataFromStorage().length;
       dataAccessLayer.Create(id, title, price, taxes, ads, discount, total, count, category);
    };

     ReadRecordAtId(Id) {
        return dataAccessLayer.ReadRecordAtId(Id);
    };

     ReadRecordsContaintsTitleSegment(segment) {
        return dataAccessLayer.ReadRecordsContaintsTitleSegment(segment);
    };

     ReadRecordsContaintsCategorySegment(segment) {
        return dataAccessLayer.ReadRecordsContaintsCategorySegment(segment);
    };
     UpdateRecordAtId(id, title, price, taxes, ads, discount, total, count, category) {
        
        dataAccessLayer.UpdateRecordAtId(id, title, price, taxes, ads, discount, total, count, category);
    };

     DeleteRecordAtId(Id) {
        dataAccessLayer.DeleteRecordAtId(Id);
    };

}
const businessLayer=new BusinessLayer;

class PresentationLayer{
    
    AddNewRow(arr){
        let tr=document.createElement('tr');
        for(let i=0;i<arr.length;i++){
            let td=document.createElement('td');
            td.innerText=arr[i];
            tr.append(td);
            
        }
        let updatebtn=document.createElement('button');
        updatebtn.innerText=" Edit ";

        let tdUpdate=document.createElement('td');
        tdUpdate.appendChild(updatebtn);
        tr.appendChild(tdUpdate);





        let deletebtn=document.createElement('button');
        deletebtn.innerText="Delete";
        let tdDelete=document.createElement('td');
        tdDelete.appendChild(deletebtn);
        tr.appendChild(tdDelete);

        Tbody.append(tr);
        updatebtn.style.padding="5px";
        updatebtn.onclick=function(){

            LoadDataToUI(this.parentElement.parentElement.children[0].innerText);
            presentationLayer.DisplayDataToTheUI();

            let IdValue= document.getElementById("IdValue");
            IdValue.innerHTML="";
            let labelId= document.createElement("label");
            IdValue.append(labelId);
            labelId.innerText="ID:";
    
            let labelIdvalue= document.createElement("label");
            IdValue.append(labelIdvalue);
            labelIdvalue.id="labelIdvalue";
            labelIdvalue.innerText=this.parentElement.parentElement.children[0].innerText;
    





        };
        deletebtn.onclick=function(){

       businessLayer.DeleteRecordAtId(this.parentElement.parentElement.children[0].innerText)
       presentationLayer.DisplayDataToTheUI();

        };




       







        deletebtn.style.padding="5px";



    }

    DisplayDataToTheUI(tempDataIfExists=null){
        let data=[];
        if(tempDataIfExists==null){
            data=businessLayer.GetDataFromStorage();
        }else{

            data=tempDataIfExists;
        }
      
      Tbody.innerHTML='';
     
       for(let i=0;i<data.length;i++)
        {
            let tr=document.createElement('tr');
            let td=document.createElement("td");
           let arr=[data[i].Id, data[i].Title, data[i].Price, data[i].Taxes,
            data[i].Ads , data[i].Discount,data[i].Total , data[i].Count, data[i].Category];
            this.AddNewRow(arr);
       }
       if(data.length>0){
       
        let DeleteAlldiv=document.getElementById('DeleteAll');
        let DeleteAllbtn;
        if(DeleteAlldiv.childElementCount==0){

             DeleteAllbtn=document.createElement('button');
            DeleteAllbtn.innerText="Delete All";
            DeleteAllbtn.classList.add("DeleteAll");
           
            DeleteAllbtn.style.width="100%";
            DeleteAlldiv.appendChild(DeleteAllbtn);
            DeleteAllbtn.onclick=function(){
               
                let allLength=businessLayer.GetDataFromStorage().length;
               
                while(businessLayer.GetDataFromStorage().length>0){
                    allLength--;
                    businessLayer.DeleteRecordAtId(allLength);

                }
                
                  
                presentationLayer.DisplayDataToTheUI();
            }
        }
        


       }


    };



     GetDataToCreateNewProduct(){
        businessLayer.Create(0,Title.value,Price.value,Taxes.value
            ,Ads.value,Discount.value,Total.value,Count.value,Category.value );
    };
    ReadRecordsContaintsTitleSegment(segment) {
        return businessLayer.ReadRecordsContaintsTitleSegment(segment);
    };
    ReadRecordsContaintsCategorySegment(segment) {
        return businessLayer.ReadRecordsContaintsCategorySegment(segment);
    };
    UpdateRecordAtId(id) {
        let title= Title.value;
        let price=Price.value;
        let taxes=Taxes.value;
        let ads=Ads.value;
        let discount=Discount.value;
        let total=Total.value;
        let count=Count.value;
        let category= Category.value;
        businessLayer.UpdateRecordAtId(id, title, price, taxes, ads, discount, total, count, category);
    };
    LoadRecordDataAtId(id){
        let dd= businessLayer.ReadRecordAtId(id);
        return dd;

    }

}

let presentationLayer=new PresentationLayer();

function CreateNewProduct(){
   
    presentationLayer.GetDataToCreateNewProduct();
};


function CalculateTotal(){
   Total.value=(+Price.value)+(+Taxes.value)+(+Ads.value)+(+Discount.value);
};
function OnLoadBody(){
     presentationLayer.DisplayDataToTheUI();
};
function SearchByTitle(){
    presentationLayer.data= presentationLayer.ReadRecordsContaintsTitleSegment(Search.value);
    presentationLayer.DisplayDataToTheUI(presentationLayer.data);
};
function SearchByCategory(){
    presentationLayer.data= presentationLayer.ReadRecordsContaintsCategorySegment(Search.value);
    presentationLayer.DisplayDataToTheUI(presentationLayer.data);
};

function SearchInTitleOrCategory(){
    if(SearchByTitleButton.classList.contains("Current")){
        SearchByTitle();
    }else{
        SearchByCategory();
    }
};
function Toggle(ele){
SearchByCategoryButton.classList.toggle("Current")
SearchByTitleButton.classList.toggle("Current");
SearchInTitleOrCategory();
}

function LoadDataToUI(id){
    let row=presentationLayer.LoadRecordDataAtId(id);
    Title.value=row.Title;
    Price.value=row.Price;
    Taxes.value=row.Taxes;
    Ads.value=row.Ads;
    Discount.value=row.Discount;
    Total.value=row.Total;
    Count.value=row.Count;
    Category.value=row.Category;
    Create.innerText="Update";
}
//Update
function Update(id){
  
presentationLayer.UpdateRecordAtId(id);

}
function CreateOrUpdate(ele){

    if(
        Title.value!="" &&
        Price.value!="" &&
        Taxes.value!="" &&
        Ads.value!="" &&
        Discount.value!="" &&
        Total.value!="" &&
        Count.value!="" &&
        Category.value!="" 
    )
    {
        if(ele.innerText==="Create"){
            CreateNewProduct();
            Title.value="";
            Price.value="";
            Taxes.value="";
            Ads.value="";
            Discount.value="";
            Total.value="";
            Count.value="";
            Category.value="";
            Create.innerText="Create";
        }else{
            let labelIdvalue= document.getElementById("labelIdvalue");
           
            Update(+(labelIdvalue.innerText));
            

            Title.value="";
            Price.value="";
            Taxes.value="";
            Ads.value="";
            Discount.value="";
            Total.value="";
            Count.value="";
            Category.value="";
            Create.innerText="Create";
            IdValue.innerHTML="";
        }
    }
   
    presentationLayer.DisplayDataToTheUI();

}



function FillData(){

    for(let i=0;i<20;i++){
        Title.value=FunctionsClass.getRandomName();
        Price.value=parseInt( FunctionsClass.getRandomInt(100,10000));
        Taxes.value=parseInt(FunctionsClass.getRandomInt(10,90));
        Ads.value=parseInt(FunctionsClass.getRandomInt(5,40));
        Discount.value=parseInt(FunctionsClass.getRandomInt(1,30));
        Total.value=(+Price.value)+(+Taxes.value)+(+Ads.value)+(+Discount.value);
        Count.value=parseInt(FunctionsClass.getRandomInt(1,2000));

        Category.value= i%2==0?  "technologyProducts ":"fashionProducts";
        Create.innerText="Create";
        CreateNewProduct();

    }
    presentationLayer.DisplayDataToTheUI();
            Title.value="";
            Price.value="";
            Taxes.value="";
            Ads.value="";
            Discount.value="";
            Total.value="";
            Count.value="";
            Category.value="";
            Create.innerText="Create";
}

