# Google Firestore
## Motivation
* Want a database in the Cloud so I can use both work and personal laptops
* Preferably free :) 

## Google Firestore
* NoSql document database; serverless and fully managed 
* **NoSql Document Database**
    * Use documents that contains fields and values instead of tabular data in relational databases
    * Groups of data/documents form collections. Documents can have different schemas. 
        * Can add new data with different structure without modifying existing data 
        * Examples: MongoDB, Azure Cosmo DB
        * [My database](https://console.firebase.google.com/u/0/project/meal-plan-1d553/firestore/data~2FRecipe~2F3EXIO7dSHDTrPQrXSde2) 
* Java client library; CRUD support
    * [Create recipe code](https://github.com/ninafli/meal-plan/blob/38870df1cec8fd6c0cc8079a9d8e8aaed68b1842/backend/src/main/java/com/nina/mealplan/service/RecipeService.java#L52)
* Querying support
    * Can fetch documents without getting entire collection 
    * Can chain filtering and sorting expressions (similar to Powershell pipes), [example](https://github.com/ninafli/meal-plan/blob/38870df1cec8fd6c0cc8079a9d8e8aaed68b1842/backend/src/main/java/com/nina/mealplan/service/RecipeService.java#L150) 
* Free tier: 1GB data, 50K reads and writes per day, phone authentication 

## NoSql Foreign Key
* How to link tags and recipes? 