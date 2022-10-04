
// Requiring ObjectId from mongoose npm package
const ObjectId = require('mongoose').Types.ObjectId;
 
// Validator function
function isValidObjectId(id){
     
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
}

makeObjValueLowerCase = (obj) => {

    for (const key in obj) {

        if (obj.hasOwnProperty(key)) {
    
            if( typeof obj[key] === "string" )
            obj[key] = obj[key].toLowerCase().trim();
        }
    }
    
    return obj;

}

// exports
module.exports = {
    makeObjValueLowerCase,
    isValidObjectId
}