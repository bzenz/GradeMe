exports.generateSETParameters = (options={}) => 
{
    let setterString = 'SET ';
    const args = [];
    Object.keys(options).forEach((key, index) => {
        if(index > 0) setterString += ', ';
        setterString += `${key} = ?`;
        args.push(options[key]);
    }); 

    return {setterString, args};
};
