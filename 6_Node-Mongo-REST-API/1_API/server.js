const express = require('express');
const bodyParser = require("body-parser");
const { response } = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var ingredients = [
    {
        "id": "232kAk",
        "text": "Eggs"
    },
    {
        "id" : "dsada",
        "text" : "Milk"
    }, 
    {
        "id" : "kdsjald",
        "text" : "Bacon"
    }, 
    {
        "id" : "slas",
        "text" : "Cheese"
    }
];

app.get('/ingredients', function(req, res){
    res.send(ingredients);
});

app.post('/ingredients', (req, res) => {
    var ingredient = req.body;
    if(!ingredient || ingredient.text === ""){
        res.status(500).send({error: "your ingredient must have text!"});
    } else {
        ingredients.push(ingredient);
        res.status(200).status();
    }
});

app.put('/ingredients/:ingredientId', (req, res) => {
    var text = req.body.text;
    if(!text || text === ""){
        res.status(500).send({error: "You must provide ingredient text"});
    }else {
        var found = false;
        for(var i = 0; i < ingredients.length; i++){
            var ing = ingredients[i];
            if(ing.id === req.params.ingredientId){
                ingredients[i].text = text;
                found = true;
                break;
            }
        }
        if(!found){
            res.status(500).send({error: "Ingredient not found"});
        } else {
            res.send(ingredients);
        }
    }
    
 });

 app.delete('/ingredients/:ingredientId', (req, res) => {
    var text = req.body.text;
        var found = false;
        for(var i = 0; i < ingredients.length; i++){
            var ing = ingredients[i];
            if(ing.id === req.params.ingredientId){
                ingredients.splice(i,1);
                found = true;
                break;
            }
        }
        if(!found){
            res.status(500).send({error: "Ingredient not found"});
        } else {
            res.send(ingredients);
        }
    
 });


app.listen(3000, function(){
    console.log("First API running on port 3000");
});